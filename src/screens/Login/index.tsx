import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Paper, TextField } from '@mui/material';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useSnackbar } from 'notistack';

import SEO from '~components/SEO';
import { auth, googleProvider } from '~config/firebase';

interface IFormInputs {
    email: string;
    password: string;
}

function Login() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    const handleSignIn = (data: IFormInputs) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(({ user }) => {
                enqueueSnackbar(
                    `Bienvenid@${
                        user.displayName ? ` ${user.displayName}` : '!'
                    }`,
                    {
                        variant: 'success',
                    }
                );
                navigate('/products');
            })
            .catch((err) => {
                enqueueSnackbar(`Occurio un error (${err.message})`, {
                    variant: 'error',
                });
            });
    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(({ user }) => {
                enqueueSnackbar(
                    `Bienvenid@${
                        user.displayName ? ` ${user.displayName}` : '!'
                    }`,
                    {
                        variant: 'success',
                    }
                );
                navigate('/products');
            })
            .catch((err) => {
                enqueueSnackbar(`Occurio un error (${err.message})`, {
                    variant: 'error',
                });
            });
    };

    return (
        <>
            <SEO title="Login" description="Login to enter the site" />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-stretch',
                }}
            >
                <form onSubmit={handleSubmit(handleSignIn)}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Por favor, ingrese su email',
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message:
                                        'Por favor, ingrese un email válido',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    label="E-mail"
                                    variant="outlined"
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Por favor, ingrese su contraseña',
                                },
                                minLength: {
                                    value: 3,
                                    message:
                                        'La contraseña tiene que tener mas de 3 caracteres',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />
                        <Button type="submit" variant="contained">
                            Iniciar Sesión
                        </Button>
                    </Paper>
                </form>
                <Button
                    startIcon={<GoogleIcon />}
                    variant="outlined"
                    onClick={handleGoogleSignIn}
                    fullWidth
                    sx={{
                        mt: 3,
                    }}
                >
                    Iniciar sesion con Google
                </Button>
            </Box>
        </>
    );
}
export default Login;
