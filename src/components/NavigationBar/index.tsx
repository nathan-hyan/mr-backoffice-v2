import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material';

import SideDrawer from './components/SideDrawer';
import UserMenu from './components/UserMenu';

import styles from './styles.module.scss';

import LogoWhite from '~assets/logo-inline-stockos-white.svg';
import useUserContext from '~contexts/User';

function NavigationBar() {
    const [drawer, setDrawer] = useState(false);
    const { user } = useUserContext();
    const navigate = useNavigate();

    const handleDrawer = () => {
        setDrawer((prevState) => !prevState);
    };

    const handleRedirect = () => {
        navigate('/login');
    };

    return (
        <>
            <SideDrawer drawer={drawer} handleDrawer={handleDrawer} />
            <AppBar
                position="static"
                sx={{
                    mb: 3,
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={handleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                        <img
                            src={LogoWhite}
                            alt="StockOS Logo"
                            className={styles.logo}
                        />
                    </Box>
                    {user ? (
                        <UserMenu />
                    ) : (
                        <Button
                            variant="text"
                            color="inherit"
                            onClick={handleRedirect}
                        >
                            Iniciar sesion
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
}
export default NavigationBar;
