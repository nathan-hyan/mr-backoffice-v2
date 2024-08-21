import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import LogoWhite from '~assets/logo-white.svg';
import { GACategories, GATypes } from '~constants/gaTagTypes';
import useGATag from '~hooks/useGATag';

import styles from './styles.module.scss';

function App() {
  const navigate = useNavigate();
  const { tagAction } = useGATag();
  const handleNavigate = () => {
    tagAction(GACategories.Redirect, GATypes.Click, 'Redirected to login');
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
      <img src={LogoWhite} alt='Mundo Regalo' className={styles.image} />

      <Button variant='contained' onClick={handleNavigate}>
        Inicie sesión para continuar
      </Button>
    </Box>
  );
}
export default App;
