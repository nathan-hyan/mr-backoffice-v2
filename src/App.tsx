import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import LogoWhite from '~assets/logo-white.svg';
import { GACategories, GATypes } from '~constants/gaTagTypes';
import { useGATag } from '~hooks';

import { styles } from './App.styles';

function App() {
  const navigate = useNavigate();
  const { tagAction } = useGATag();

  const handleNavigate = () => {
    tagAction(GACategories.Redirect, GATypes.Click, 'Redirected to login');
    navigate('/login');
  };

  return (
    <Box sx={styles.boxContainer}>
      <img src={LogoWhite} alt='Mundo Regalo' height={100} />

      <Button variant='contained' onClick={handleNavigate}>
        Inicie sesión para continuar
      </Button>
    </Box>
  );
}
export default App;
