import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
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

export function CadastraAluno() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        matricula: '',
        senha: '',
        turma: '',
        trilha: '',
        tipo: 'aluno' 
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
    
        // Pegue o token do localStorage ou onde ele está armazenado
        const token = localStorage.getItem('jwtToken');

        console.log(token);
    
        try {
            const response = await fetch('http://127.0.0.1:5000/gestor/criar-usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Inclui o token JWT
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                setFormData({
                    nome: '',
                    matricula: '',
                    senha: '',
                    turma: '',
                    trilha: ''
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
            

            <Button sx={{marginBottom: '20px'}} onClick={() => {navigate('/usuarios/alunos')}}>
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
                    paddingBottom: '80px', // Added padding to the bottom
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
                    Cadastro de Aluno
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

                <FormControl fullWidth required>
                    <InputLabel>Turma</InputLabel>
                    <Select
                        name="turma"
                        value={formData.turma}
                        label="Turma"
                        onChange={handleChange}
                    >
                        <MenuItem value="online">Online</MenuItem>
                        <MenuItem value="presencial">Presencial</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth required>
                    <InputLabel>Trilha</InputLabel>
                    <Select
                        name="trilha"
                        value={formData.trilha}
                        label="Trilha"
                        onChange={handleChange}
                    >
                        <MenuItem value="humanas">Humanas</MenuItem>
                        <MenuItem value="naturais">Naturais</MenuItem>
                    </Select>
                </FormControl>

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
