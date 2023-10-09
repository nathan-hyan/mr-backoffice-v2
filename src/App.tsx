import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import styles from './styles.module.scss';

import LogoBlack from '~assets/logo_black.png';

function App() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/login');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '3rem',
                height: 'calc(100dvh - 10rem)',
                minHeight: '30rem',
            }}
        >
            <img
                src={LogoBlack}
                className={styles.image}
                alt="Mundo Regalo Logo"
            />

            <Button variant="contained" onClick={handleNavigate}>
                Inicie sesión para continuar
            </Button>
        </Box>
    );
}
export default App;
