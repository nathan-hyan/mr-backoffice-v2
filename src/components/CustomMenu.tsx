import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Menu } from '@mui/material';

import useMenu from '~hooks/useMenu';

interface Props {
    children: React.ReactNode;
}

function CustomMenu({ children }: Props) {
    const { open, close, anchorElement } = useMenu();

    return (
        <>
            <Menu
                anchorEl={anchorElement}
                open={Boolean(anchorElement)}
                onClose={close}
            >
                <Box onClick={close}>{children}</Box>
            </Menu>
            <IconButton onClick={open}>
                <MoreVert />
            </IconButton>
        </>
    );
}
export default CustomMenu;
