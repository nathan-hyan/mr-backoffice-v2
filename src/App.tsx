import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { enqueueSnackbar } from 'notistack';

import LogoWhite from '~assets/logo-white.svg';
import { auth, googleProvider } from '~config/firebase';
import { GACategories, GATypes } from '~constants/gaTagTypes';
import { useGATag } from '~hooks';

import { styles } from './App.styles';

function App() {
  const navigate = useNavigate();
  const { tagAction, tagError } = useGATag();

  const handleGoogleSignIn = () => {
    tagAction(GACategories.Event, GATypes.Click, 'Logging in with google');

    signInWithPopup(auth, googleProvider)
      .then(({ user }) => {
        tagAction(
          GACategories.Event,
          GATypes.Success,
          'User logged in with google'
        );
        enqueueSnackbar(
          `Bienvenid@${user.displayName ? ` ${user.displayName}` : '!'}`,
          {
            variant: 'success',
          }
        );
        navigate('/products');
      })
      .catch((err) => {
        tagError(
          GATypes.SubmittedForm,
          `Error logging in ${err.message} (google)`
        );
        enqueueSnackbar(`Occurio un error (${err.message})`, {
          variant: 'error',
        });
      });
  };

  return (
    <Box sx={styles.boxContainer}>
      <img src={LogoWhite} alt='Mundo Regalo' height={100} />

      <Button
        startIcon={<GoogleIcon />}
        variant='contained'
        onClick={handleGoogleSignIn}
      >
        Iniciar sesion con Google
      </Button>
    </Box>
  );
}
export default App;
