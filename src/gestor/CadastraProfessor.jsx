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
    Checkbox,
    ListItemText,
    OutlinedInput,
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

const materiasOptions = ['Português', 'Matemática', 'Naturais', 'Humanas'];

export function CadastraProfessor() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        matricula: '',
        senha: '',
        materias: [],
        tipo: 'professor', 
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleMateriasChange = (event) => {
        const { value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            materias: typeof value === 'string' ? value.split(',') : value
        }));
    };

    const normalizeMaterias = (materias) => {
        return materias.map((materia) =>
            materia
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const token = localStorage.getItem('jwtToken');
        const normalizedMaterias = normalizeMaterias(formData.materias);

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
                    materias: normalizedMaterias, // Matérias normalizadas
                    avisos: [],
                    conteudos: []
                })
            });
            
            if (response.ok) {
                alert('Cadastro de professor realizado com sucesso!');
                setFormData({
                    nome: '',
                    matricula: '',
                    senha: '',
                    materias: [],
                    tipo: 'professor'
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
            
            <Button sx={{marginBottom: '20px'}} onClick={() => {navigate('/usuarios/professores')}}>
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
                    Cadastro de Professor
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
                    <InputLabel>Matérias</InputLabel>
                    <Select
                        multiple
                        name="materias"
                        value={formData.materias}
                        onChange={handleMateriasChange}
                        input={<OutlinedInput label="Matérias" />}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {materiasOptions.map((materia) => (
                            <MenuItem key={materia} value={materia}>
                                <Checkbox checked={formData.materias.indexOf(materia) > -1} />
                                <ListItemText primary={materia} />
                            </MenuItem>
                        ))}
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
