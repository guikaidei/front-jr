import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavBar } from '../common/navbar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const CustomButton = styled(Button)(({ theme }) => ({
    '&.MuiButton-containedPrimary': {
        backgroundColor: '#015495',
        color: 'white',
        '&:hover': {
            backgroundColor: '#0067b8',
        },
    },
    width: '250px',
    height: '60px',
    marginTop: '20px',
    fontFamily: 'Open Sans',
    fontWeight: 'light',
}));

export function CadastraGestor() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        matricula: '',
        senha: '',
        tipo: 'gestor', 
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const token = localStorage.getItem('jwtToken');

        try {
            const response = await fetch('http://127.0.0.1:5000/gestor/criar-usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    nome: formData.nome,
                    matricula: formData.matricula,
                    senha: formData.senha,
                    tipo: formData.tipo,
                    avisos: []
                })
            });
            
            if (response.ok) {
                alert('Cadastro de gestor realizado com sucesso!');
                setFormData({
                    nome: '',
                    matricula: '',
                    senha: '',
                    tipo: 'gestor'
                });
            } else {
                alert('Erro ao realizar cadastro');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao realizar cadastro');
        }
    };

    return (
        <Box sx={{ paddingTop: '80px', fontFamily: 'Open Sans', height: '100vh', marginBottom: '20px'}}>
            <NavBar />
            
            <Button sx={{marginBottom: '20px'}} onClick={() => {navigate('/usuarios/gestores')}}>
                <ArrowBackIosNewIcon />
            </Button>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    backgroundColor: 'white',
                    width: '100%',
                    maxWidth: '600px',
                    margin: '0 auto',
                    padding: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.15)',
                    borderRadius: '8px',
                    paddingBottom: '80px',
                }}
            >
                <Typography 
                    variant="h4" 
                    gutterBottom 
                    sx={{ 
                        color: '#ab2325', 
                        fontWeight: 'bold', 
                        fontFamily: 'Open Sans',
                        textAlign: 'center',
                        marginBottom: '30px'
                    }}
                >
                    Cadastro de Gestor
                </Typography>

                <TextField
                    required
                    fullWidth
                    label="Nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                />

                <TextField
                    required
                    fullWidth
                    label="Matrícula"
                    name="matricula"
                    value={formData.matricula}
                    onChange={handleChange}
                />

                <TextField
                    required
                    fullWidth
                    label="Senha"
                    name="senha"
                    type="password"
                    value={formData.senha}
                    onChange={handleChange}
                />

                <CustomButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                        margin: '30px auto 0',
                    }}
                    onClick={handleSubmit}
                >
                    Cadastrar
                </CustomButton>
            </Box>
        </Box>
    );
}
