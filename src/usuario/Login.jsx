import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Paper, Typography, TextField, Button, IconButton, Snackbar, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { AuthContext } from '../context/AuthContext'; // Importando o contexto

const Container = styled('div')({
    minHeight: '100vh',
    background: 'white',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 0,
});

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: '30px 20px',
    width: '100%',
    height: '100%', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0, 
}));

const CustomButton = styled(Button)(({ theme }) => ({
    '&.MuiButton-containedPrimary': {
        backgroundColor: '#ab2325',
        color: 'white',
        '&:hover': {
            backgroundColor: '#cb6062',
        },
    },
    width: '250px',
    height: '60px',
    marginTop: '20px',
    fontFamily: 'Open Sans',
    fontWeight: 'light',
}));

const CustomTextField = styled(TextField)({
    margin: '10px',
    backgroundColor: 'white',
    borderRadius: '5px',
    width: '100%'
});

const ImageContainer = styled(Box)({
    width: '100%',
    height: '100%',
    overflow: 'hidden',
});

const API_URL = 'http://127.0.0.1:5000/login';

export function LoginPage() {
    const navigate = useNavigate();
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [matriculaError, setMatriculaError] = useState(false);
    const [senhaError, setSenhaError] = useState(false);

    const { login } = useContext(AuthContext); 

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const userType = localStorage.getItem('userType');
        
        if (!token) {
            navigate('/login');
        } else if (userType) {
            navigate(`/home-${userType}`);
        }
    }, [navigate]); 

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Reset errors
        setMatriculaError(false);
        setSenhaError(false);

        // Input validation
        if (!matricula) {
            setMessage('Por favor, preencha a matrícula');
            setMatriculaError(true);
            setOpen(true);
            setLoading(false);
            return;
        }

        if (!senha) {
            setMessage('Por favor, preencha a senha');
            setSenhaError(true);
            setOpen(true);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({ matricula, senha }),
                credentials: 'include', // Manter as credenciais incluídas
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer login');
            }

            setMessage(data.message || 'Login realizado com sucesso!');
            setOpen(true);

            if (data.token && data.tipo) {
                login(data.token, data.tipo); // Chama o login do contexto
            }
        } catch (err) {
            setMessage(err.message || 'Erro ao conectar com o servidor');
            setOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const action = (
        <Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                ✕
            </IconButton>
        </Fragment>
    );

    return (
        <Container>
            <Grid container spacing={0} style={{ height: '100vh', width: '100%' }}>
                <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }} style={{ height: '100%' }}>
                    <ImageContainer>
                        <img 
                            src="/assets/foto_login_page.png" 
                            alt="Login" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                    </ImageContainer>
                </Grid>
                <Grid item xs={12} md={6} style={{ height: '100%' }}>
                    <FormContainer elevation={0}>
                        <Typography 
                            variant="h4" 
                            align="center" 
                            style={{ 
                                margin: '20px', 
                                color: '#ab2325', 
                                fontWeight: 'bold', 
                                fontFamily: 'Open Sans' 
                            }}
                        >
                            Login
                        </Typography>
                        <form 
                            onSubmit={handleSubmit}
                            style={{ 
                                display: "flex", 
                                alignItems: "center", 
                                flexDirection: 'column', 
                                width: '100%', 
                                maxWidth: '400px' 
                            }}
                        >
                            <CustomTextField
                                fullWidth
                                label='Matrícula'
                                value={matricula}
                                onChange={(event) => setMatricula(event.target.value)}
                                disabled={loading}
                                error={matriculaError}
                            />
                            <CustomTextField
                                fullWidth
                                label='Senha'
                                type='password'
                                value={senha}
                                onChange={(event) => setSenha(event.target.value)}
                                disabled={loading}
                                error={senhaError}
                            />
                            <CustomButton
                                variant='contained'
                                color='primary'
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Carregando...' : 'Login'}
                            </CustomButton>
                        </form>
                    </FormContainer>
                </Grid>
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            />
        </Container>
    );
}
