import React, { Fragment, useState } from 'react';
import { Paper, Typography, TextField, Button, IconButton, Snackbar, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

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
        backgroundColor: 'rgba(157, 48, 44, 1)',
        color: 'white',
        '&:hover': {
            backgroundColor: 'rgba(127, 39, 36, 1)',
        },
    },
    width: '250px',
    height: '60px',
    marginTop: '20px',
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

export function LoginPage() {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const saveToken = (token) => {
        localStorage.setItem('jwtToken', token);
    };

    const click = () => {
        let data = {
            matricula: matricula,
            senha: senha
        };

        fetch('localhost:5000', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.text();
        }).then(data => {
            setOpen(true);
            setMessage("Login feito com sucesso!");
            navigate('/');
            saveToken(data);
        }).catch(() => {
            setOpen(true);
            setMessage('Erro no login!');
        });
    };

    const action = (
        <Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} />
        </Fragment>
    );

    return (
        <Container>
            <Grid container spacing={0} style={{ height: '100vh', width: '100%' }}>
                {/* O Grid com a imagem será ocultado em telas menores que md */}
                <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }} style={{ height: '100%' }}>
                    <ImageContainer>
                        <img src="/assets/image.png" alt="Login" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </ImageContainer>
                </Grid>
                <Grid item xs={12} md={6} style={{ height: '100%' }}>
                    <FormContainer elevation={0}>
                        <Typography variant="h4" align="center" style={{ margin: '20px', color: 'rgba(157, 48, 44, 1)', fontWeight: 'bold' }}>Login</Typography>
                        <form style={{ display: "flex", alignItems: "center", flexDirection: 'column', width: '100%', maxWidth: '400px' }}>
                            <CustomTextField fullWidth label='Matrícula' value={matricula} onChange={(event) => setMatricula(event.target.value)} />
                            <CustomTextField fullWidth label='Senha' type='password' value={senha} onChange={(event) => setSenha(event.target.value)} />
                            <CustomButton variant='contained' color='primary' onClick={click}>Login</CustomButton>
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
            />
        </Container>
    );
}
