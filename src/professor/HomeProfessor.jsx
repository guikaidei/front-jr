import React, { useState, useContext, useEffect } from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../common/navbar';
import { styled } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext';

// Componente estilizado para o Paper das matérias
const MateriaBox = styled(Paper)(({ theme }) => ({
    padding: '30px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '250px', // Altura mínima para todas as telas
    [theme.breakpoints.up('md')]: {
        minHeight: '400px', // Altura mínima em telas médias e grandes
        justifyContent: 'center',
    },
}));

const BoxGeral = styled(Box)(({ theme }) => ({
    paddingTop: '80px', 
    fontFamily: 'Open Sans', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    backgroundColor: 'white',
    minHeight: '100vh',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
        paddingTop: '0px',
    },
}));



// Componente estilizado para as imagens das matérias
const MateriaImage = styled('img')({
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
});

export function HomeProfessor() {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated || user.tipo !== 'professor') {
            navigate('/login'); 
        }
    }, [isAuthenticated, user, navigate]);

    const materiasFormatadas = {
        'matematica': 'Matemática',
        'portugues': 'Português',
        'humanas': 'Humanas',
        'naturais': 'Naturais',
    };

    const imagensMaterias = {
        'matematica': '/assets/foto_matematica.jpg',
        'portugues': '/assets/foto_portugues.jpg',
        'humanas': '/assets/foto_humanas.jpg',
        'naturais': '/assets/foto_biologia.jpg',
    };

    const [materiasProfessor, setMateriasProfessor] = useState([]);

    // Função para buscar as matérias do professor
    const fetchMaterias = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch('http://127.0.0.1:5000/professor/listar-materias', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setMateriasProfessor(data.materias);
            } else {
                console.error('Erro ao buscar materias:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    useEffect(() => {
        fetchMaterias();
    }, []);

    const handleMateriaClick = (materia) => {
        navigate('/professor/' + materia);
    };

    return (
        <Box 
            sx={{
                
            }}
        >
            <NavBar />

            <BoxGeral >
                <Typography 
                    variant="h4" 
                    gutterBottom 
                    sx={{ 
                        color: '#ab2325', 
                        fontWeight: 'bold', 
                        marginBottom: '30px', 
                        fontFamily: 'Open Sans',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                    }}
                >
                    Matérias
                </Typography>

                <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: '1200px' }}>
                    {materiasProfessor.map((materia, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <MateriaBox onClick={() => handleMateriaClick(materia)}>
                                <MateriaImage src={imagensMaterias[materia]} alt={materiasFormatadas[materia]} />
                                <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold', fontFamily: 'Open Sans', marginTop: '15px' }}>
                                    {materiasFormatadas[materia]}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666', fontFamily: 'Open Sans', marginTop: '10px' }}>
                                    Clique para acessar o conteúdo de {materiasFormatadas[materia]}.
                                </Typography>
                            </MateriaBox>
                        </Grid>
                    ))}
                </Grid>
            </BoxGeral>
        </Box>
    );
}
