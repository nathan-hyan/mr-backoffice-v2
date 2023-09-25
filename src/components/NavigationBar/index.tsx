import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';

import SideDrawer from './components/SideDrawer';
import UserMenu from './components/UserMenu';

import { auth } from '~config/firebase';

function NavigationBar() {
    const [drawer, setDrawer] = useState(false);
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
                <Toolbar>
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
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        StockOS
                    </Typography>
                    {auth.currentUser ? (
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
