function stringToColor(string?: string | null) {
    if (!string || string.length === 0) {
        return '#333';
    }

    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export default function getInitials(name?: string | null) {
    if (name?.length === 0 || !name) {
        return 'S';
    }

    const array = name.split(' ');
    const initials: string[] = [];

    array.forEach((word, index) => {
        if (index === 0 || index === array.length - 1) initials.push(word[0]);
    });

    return initials.join('').toUpperCase();
}

export function stringAvatar(name?: string | null) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: getInitials(name),
    };
}
