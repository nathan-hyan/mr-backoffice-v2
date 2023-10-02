import { Box, Button } from '@mui/material';
import LogoBlack from '~assets/logo_black.png';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '~config/firebase';

function App() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/login');
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/products');
            }
        });
    }, []);

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
            <img src={LogoBlack} className={styles.image} />

            <Button variant="contained" onClick={handleNavigate}>
                Inicie sesión para continuar
            </Button>
        </Box>
    );
}
export default App;
