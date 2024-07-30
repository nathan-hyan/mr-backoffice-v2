import { CircularProgress, Container, Paper, Typography } from '@mui/material';
import { styles } from './LoadingScreen.styles';

function LoadingScreen() {
  return (
    <Container sx={styles.container}>
      <Paper elevation={3} sx={styles.box}>
        <CircularProgress />
        <Typography>Cargando datos del usuario</Typography>
      </Paper>
    </Container>
  );
}
export default LoadingScreen;
