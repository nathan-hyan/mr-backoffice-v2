import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import styles from './styles.module.scss';

import LogoWhite from '~assets/logo-white.svg';

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
            <img src={LogoWhite} alt="Mundo Regalo" className={styles.image} />

            <Button variant="contained" onClick={handleNavigate}>
                Inicie sesión para continuar
            </Button>
        </Box>
    );
}
export default App;
