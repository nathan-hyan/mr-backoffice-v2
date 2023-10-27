import { ReactNode } from 'react';
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

interface Props {
    handleNavigate: () => void;
    title: string;
    icon: ReactNode;
}

function Option({ handleNavigate, title, icon }: Props) {
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={handleNavigate}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
            </ListItemButton>
        </ListItem>
    );
}
export default Option;
