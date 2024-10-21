import React from 'react';
import { Typography, Box, Grid, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../common/navbar';

export function HomeGestor() {
    const navigate = useNavigate();

    // Lista de matérias com rotas associadas
    const materias = [
        { nome: 'Matemática', rota: '/materias/matematica' },
        { nome: 'Português', rota: '/materias/portugues' },
        { nome: 'Biologia', rota: '/materias/biologia' },
        { nome: 'Física', rota: '/materias/fisica' },
        { nome: 'Química', rota: '/materias/quimica' },
        { nome: 'História', rota: '/materias/historia' },
        { nome: 'Geografia', rota: '/materias/geografia' },
        { nome: 'Inglês', rota: '/materias/ingles' },
        { nome: 'Espanhol', rota: '/materias/espanhol' },
    ];

    // Função para navegação ao clicar no botão de matéria
    const handleMateriaClick = (rota) => {
        navigate(rota);
    };

    return (
        <Box sx={{ paddingTop: '80px', fontFamily: 'Open Sans' }}>
            <NavBar />

            {/* Seção de Usuários */}
            <Box
                sx={{
                    backgroundColor: 'white',
                    width: '100%',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: '#ab2325', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                    Usuários
                </Typography>

                <Grid container spacing={3} direction="column" alignItems="center" sx={{ maxWidth: '400px' }}>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            sx={{
                                width: '300px',
                                height: '80px',
                                backgroundColor: 'white',
                                color: 'black',  // Texto vermelho
                                fontSize: '18px',
                                fontWeight: 'bold',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                },
                                fontFamily: 'Open Sans',
                            }}
                            onClick={() => navigate('/usuarios/alunos')}
                        >
                            Alunos
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            sx={{
                                width: '300px',
                                height: '80px',
                                backgroundColor: 'white',
                                color: 'black',  // Texto vermelho
                                fontSize: '18px',
                                fontWeight: 'bold',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                },
                                fontFamily: 'Open Sans',
                            }}
                            onClick={() => navigate('/usuarios/professores')}
                        >
                            Professores
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            sx={{
                                width: '300px',
                                height: '80px',
                                backgroundColor: 'white',
                                color: 'black',  // Texto vermelho
                                fontSize: '18px',
                                fontWeight: 'bold',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                },
                                fontFamily: 'Open Sans',
                            }}
                            onClick={() => navigate('/usuarios/gestores')}
                        >
                            Gestores
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Seção de Matérias */}
            <Box
                sx={{
                    backgroundColor: '#ab2325',
                    width: '100%',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingBottom: '40px',
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Open Sans' }}>
                    Matérias
                </Typography>
                <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: '800px' }}>
                    {materias.map((materia, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Paper
                                elevation={3}
                                sx={{
                                    padding: '20px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        backgroundColor: '#f5f5f5',
                                    },
                                }}
                                onClick={() => handleMateriaClick(materia.rota)}
                            >
                                <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                                    {materia.nome}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
