import React, { useState } from 'react';
import { List, ListItem, ListItemText, Typography, Box, Grid, Modal, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../common/navbar';

export function HomeAluno() {
    // Hook de navegação para redirecionar
    const navigate = useNavigate();

    // Lista de matérias com rotas associadas
    const materias = [
        { nome: 'Matemática', rota: '/materias/matematica' },
        { nome: 'Português', rota: '/materias/portugues' },
        { nome: 'Biologia', rota: '/materias/biologia' }
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

    // Estado para controlar a exibição do modal
    const [open, setOpen] = useState(false);
    const [avisoSelecionado, setAvisoSelecionado] = useState(null);

    // Função para abrir o modal com o aviso selecionado
    const handleOpenModal = (aviso) => {
        setAvisoSelecionado(aviso);
        setOpen(true);
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setOpen(false);
        setAvisoSelecionado(null);
    };

    // Função para lidar com o clique nas matérias
    const handleMateriaClick = (rota) => {
        navigate(rota); // Redireciona para a rota da matéria
    };

    return (
        <Box sx={{paddingTop: '80px'}}>
            <NavBar/>
            <Box 
                sx={{ 
                    backgroundColor: 'white', 
                    minHeight: '100vh', 
                    padding: '20px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Título da página */}
                <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>
                    Home Aluno
                </Typography>

                {/* Lista de Avisos */}
                <Typography variant="h5" gutterBottom sx={{ color: 'black', marginTop: '40px' }}>
                    Avisos
                </Typography>
                <List sx={{ backgroundColor: '#f0f0f0', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
                    {avisos.map((aviso, index) => (
                        <ListItem 
                            key={index} 
                            button 
                            onClick={() => handleOpenModal(aviso)} // Abre o modal com o conteúdo do aviso
                        >
                            <ListItemText primary={aviso.titulo} sx={{ color: 'black' }} />
                        </ListItem>
                    ))}
                </List>

                {/* Lista de matérias */}
                <Typography variant="h5" gutterBottom sx={{ color: 'black', marginTop: '20px' }}>
                    Notas
                </Typography>
                <List sx={{ backgroundColor: '#f0f0f0', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
                    {materias.map((materia, index) => (
                        <ListItem 
                            key={index} 
                            button 
                            onClick={() => handleMateriaClick(materia.rota)} // Redireciona ao clicar
                        >
                            <ListItemText primary={materia.nome} sx={{ color: 'black' }} />
                        </ListItem>
                    ))}
                </List>

                {/* Grade Horária */}
                <Typography variant="h5" gutterBottom sx={{ color: 'black', marginTop: '40px' }}>
                    Grade Horária
                </Typography>
                <Grid container spacing={2} direction="column" alignItems="center">
                    {horariosMaterias.map((item, index) => (
                        <Grid item key={index} xs={12}>
                            <Box 
                                sx={{ 
                                    backgroundColor: '#f0f0f0', 
                                    borderRadius: '8px', 
                                    padding: '10px', 
                                    textAlign: 'center', 
                                    width: '300px' 
                                }}
                            >
                                <Typography variant="body1" sx={{ color: 'black' }}>
                                    {item.horario} - {item.materia}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                

                

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
                                <Typography id="modal-aviso-titulo" variant="h6" component="h2" sx={{ color: 'black' }}>
                                    {avisoSelecionado.titulo}
                                </Typography>
                                <Typography id="modal-aviso-conteudo" sx={{ mt: 2, color: 'black' }}>
                                    {avisoSelecionado.conteudo}
                                </Typography>
                                <Typography sx={{ mt: 2, color: 'black' }}>
                                    <strong>Matéria:</strong> {avisoSelecionado.materia}
                                </Typography>
                                <Typography sx={{ mt: 2, color: 'black' }}>
                                    <strong>Autor:</strong> {avisoSelecionado.autor}
                                </Typography>

                                {/* Botão para fechar o modal */}
                                <Button 
                                    onClick={handleCloseModal} 
                                    variant="contained" 
                                    sx={{ mt: 3, backgroundColor: 'black', color: 'white' }}
                                >
                                    Fechar
                                </Button>
                            </div>
                        )}
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
}
