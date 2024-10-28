import React, { useState, useContext, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Box, Grid, Modal, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../common/navbar';
import { styled } from '@mui/material/styles';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { AuthContext } from '../context/AuthContext';


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
    const { isAuthenticated, user } = useContext(AuthContext); // Pegando o status de autenticação e o tipo de usuário

    useEffect(() => {
        // Verifique se o usuário está autenticado e se o tipo de usuário é "gestor"
        if (!isAuthenticated || user.tipo !== 'professor') {
        navigate('/login'); // Redireciona para a página de login ou outra página de acesso negado
        }
    }, [isAuthenticated, user, navigate]);


    // Lista de matérias com rotas associadas
    const materias = [
        { nome: 'Matemática', rota: '/professor/matematica' },
        { nome: 'Português', rota: '/professor/portugues' },
        { nome: 'Humanas', rota: '/professor/humanas' },
        { nome: 'Naturais', rota: '/professor/naturais' },
    ];

    const materiasFormatadas = {
        'matematica': 'Matemática',
        'portugues': 'Português',
        'humanas': 'Humanas',
        'naturais': 'Naturais',
    }


    const [materiasProfessor, setMateriasProfessor] = useState([]);  // Estado para armazenar os avisos

    // Função para buscar avisos da API
    const fetchMaterias = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch('http://127.0.0.1:5000/professor/listar-materias', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                    'Aceess-Control-Allow-Credentials': 'true',
                    'Acess-Control-Max-Age': '86400',
                    
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
        fetchMaterias();  // Chamada à função para carregar os avisos
    }, []); // Executa apenas uma vez na montagem do componente

    // Filter materias to only show the ones in materiasProfessor
    const materiasFiltradas = materias.filter(materia => 
        materiasProfessor.includes(materia.nome)
    );

    const handleMateriaClick = (materia) => {
        navigate('/professor/' + materia);
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
                    {materiasProfessor.map((materia, index) => (
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
                                onClick={() => handleMateriaClick(materia)}
                            >
                                <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                                    {materiasFormatadas[materia]}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}