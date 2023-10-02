import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from '@mui/material';
import { signOut } from 'firebase/auth';
import { enqueueSnackbar } from 'notistack';

import { auth } from '~config/firebase';
import { stringAvatar } from '~utils/getInitials';
import useUserContext from '~contexts/User';

function UserMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { user } = useUserContext();
    const navigate = useNavigate();

    const handleMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                enqueueSnackbar('Sesión cerrada correctamente', {
                    variant: 'success',
                });
                navigate('/');
            })
            .catch((err) => {
                enqueueSnackbar(`Ocurrio un error: ${err.message}`, {
                    variant: 'error',
                });
            });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleMenu}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={anchorEl ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={anchorEl ? 'true' : undefined}
                >
                    <Avatar
                        src={user?.photoURL ?? undefined}
                        {...stringAvatar(user?.displayName ?? user?.email)}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Typography fontWeight="bold">
                        {user?.displayName ?? user?.email}
                    </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => navigate('/profile')}>
                    Ver mi cuenta
                </MenuItem>
                <MenuItem onClick={handleLogOut}>Cerrar sesión</MenuItem>
            </Menu>
        </Box>
    );
}
export default UserMenu;
