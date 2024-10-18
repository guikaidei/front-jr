import React, { useState } from 'react';
import { List, ListItem, ListItemText, Typography, Box, Grid, Modal, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../common/navbar';

export function HomeAluno() {
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

    // Lista de horários das matérias
    const horariosMaterias = [
        { horario: '10:30', materia: 'Matemática' },
        { horario: '11:00', materia: 'Português' },
        { horario: '12:00', materia: 'Biologia' }
    ];

    // Lista de avisos
    const avisos = [
        {
            titulo: 'Prova de Matemática',
            conteudo: 'A prova de matemática será na próxima segunda-feira.',
            materia: 'Matemática',
            autor: 'Prof. João'
        },
        {
            titulo: 'Leitura obrigatória de Português',
            conteudo: 'Leitura obrigatória do livro "Memórias Póstumas de Brás Cubas".',
            materia: 'Português',
            autor: 'Profª. Maria'
        },
        {
            titulo: 'Aula prática de Biologia',
            conteudo: 'Teremos uma aula prática no laboratório sobre células animais.',
            materia: 'Biologia',
            autor: 'Prof. Carlos'
        }
    ];

    const [nomeAluno, setNomeAluno] = useState('Joao');
    const [open, setOpen] = useState(false);
    const [avisoSelecionado, setAvisoSelecionado] = useState(null);

    const handleOpenModal = (aviso) => {
        setAvisoSelecionado(aviso);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setAvisoSelecionado(null);
    };

    const handleMateriaClick = (rota) => {
        navigate(rota);
    };

    return (
        <Box sx={{paddingTop: '80px', fontFamily: 'Open Sans'}}>
            <NavBar/>

            {/* Seção de Avisos */}
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
                <Typography variant="h4" gutterBottom sx={{ color: '#015495', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                    Avisos
                </Typography>
                <List sx={{ backgroundColor: '#ffffff', borderRadius: '0px', width: '100%', maxWidth: '600px' }}>
                    {avisos.map((aviso, index) => (
                        <ListItem 
                            key={index} 
                            button 
                            onClick={() => handleOpenModal(aviso)}
                            sx={{
                                marginBottom: '10px',
                                backgroundColor: 'white',
                                boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                                '&:last-child': { marginBottom: 0 },
                            }}
                        >
                            <Box sx={{ width: '100%' }}>
                                <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                                    {aviso.titulo}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 300, fontFamily: 'Open Sans' }}>
                                    Matéria: {aviso.materia}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Seção de Notas */}
            <Box 
                sx={{ 
                    backgroundColor: '#ab2325', 
                    width: '100%', 
                    padding: '20px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    marginBottom: '20px', 
                    paddingBottom: '40px',
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Open Sans' }}>
                    Notas
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
                                        backgroundColor: '#f5f5f5'
                                    }
                                }}
                                onClick={() => handleMateriaClick(materia.rota)}
                            >
                                <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold',  fontFamily: 'Open Sans' }}>
                                    {materia.nome}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Seção de Grade Horária */}
            <Box 
                sx={{ 
                    backgroundColor: 'white', 
                    width: '100%', 
                    padding: '20px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    marginBottom: '20px',
                    paddingBottom: '40px',
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: '#015495', fontWeight: 'bold', marginBottom: '20px',  fontFamily: 'Open Sans' }}>
                    Grade Horária
                </Typography>
                <Box sx={{ width: '100%', maxWidth: '400px' }}>
                    {horariosMaterias.map((item, index) => (
                        <Paper 
                            key={index}
                            elevation={3} 
                            sx={{
                                padding: '15px',
                                marginBottom: index === horariosMaterias.length - 1 ? 0 : '-1px', // Remove margin from last item
                                borderRadius: index === 0 ? '8px 8px 0 0' : index === horariosMaterias.length - 1 ? '0 0 8px 8px' : 0,
                                borderTop: index === 0 ? 'none' : '1px solid #e0e0e0',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f5f5f5',
                                transition: 'all 0.3s',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                    transform: 'scale(1.02)',
                                    zIndex: 1,
                                }
                            }}
                        >
                            <Typography variant="h6" sx={{ color: '#015495', fontWeight: 'bold',  fontFamily: 'Open Sans' }}>
                                {item.horario}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'black',  fontFamily: 'Open Sans' }}>
                                {item.materia}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Box>

            {/* Modal para exibir o conteúdo do aviso */}
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="modal-aviso-titulo"
                aria-describedby="modal-aviso-conteudo"
            >
                <Box 
                    sx={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        width: 400, 
                        backgroundColor: 'white', 
                        borderRadius: '8px', 
                        padding: '20px', 
                        boxShadow: 24
                    }}
                >
                    {avisoSelecionado && (
                        <div>
                            <Typography id="modal-aviso-titulo" variant="h6" component="h2" sx={{ color: 'black',  fontFamily: 'Open Sans' }}>
                                {avisoSelecionado.titulo}
                            </Typography>
                            <Typography id="modal-aviso-conteudo" sx={{ mt: 2, color: 'black',  fontFamily: 'Open Sans' }}>
                                {avisoSelecionado.conteudo}
                            </Typography>
                            <Typography sx={{ mt: 2, color: 'black',  fontFamily: 'Open Sans' }}>
                                <strong>Matéria:</strong> {avisoSelecionado.materia}
                            </Typography>
                            <Typography sx={{ mt: 2, color: 'black',  fontFamily: 'Open Sans' }}>
                                <strong>Autor:</strong> {avisoSelecionado.autor}
                            </Typography>
                            <Button 
                                onClick={handleCloseModal} 
                                variant="contained" 
                                sx={{ mt: 3, backgroundColor: 'black', color: 'white',  fontFamily: 'Open Sans' }}
                            >
                                Fechar
                            </Button>
                        </div>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}
