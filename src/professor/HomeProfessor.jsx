import React, { useState } from 'react';
import { List, ListItem, ListItemText, Typography, Box, Grid, Modal, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../common/navbar';
import { styled } from '@mui/material/styles';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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

export function HomeProfessor() {
    const navigate = useNavigate();

    // Lista de matérias com rotas associadas
    const materias = [
        { nome: 'Matemática', rota: '/professor/matematica' },
        { nome: 'Português', rota: '/professor/portugues' },
        { nome: 'Humanas', rota: '/professor/humanas' },
        { nome: 'Naturais', rota: '/professor/naturais' },
    ];

    const materiasProfessor = [
        'Matemática',
        'Naturais',
        'Português',
        'Humanas',
    ];

    // Filter materias to only show the ones in materiasProfessor
    const materiasFiltradas = materias.filter(materia => 
        materiasProfessor.includes(materia.nome)
    );

    const handleMateriaClick = (rota) => {
        navigate(rota);
    };

    return (
        <Box sx={{ paddingTop: '80px', fontFamily: 'Open Sans', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <NavBar/>

            {/* Seção de Materias */}
            <Box 
                sx={{ 
                    backgroundColor: 'white', 
                    width: '100%', 
                    padding: '20px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    paddingBottom: '40px',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: '#ab2325', fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Open Sans' }}>
                    Matérias
                </Typography>
                <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: '800px' }}>
                    {materiasFiltradas.map((materia, index) => (
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
                                        backgroundColor: '#f5f5f5'
                                    }
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