import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Box, List, ListItem, Modal, TextField, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { NavBar } from '../common/navbar';
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

export function ListaGestores() {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useContext(AuthContext); // Pegando o status de autenticação e o tipo de usuário

    useEffect(() => {
        // Verifique se o usuário está autenticado e se o tipo de usuário é "gestor"
        if (!isAuthenticated || user.tipo !== 'gestor') {
        navigate('/login'); // Redireciona para a página de login ou outra página de acesso negado
        }
    }, [isAuthenticated, user, navigate]);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [gestorSelecionado, setGestorSelecionado] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Filtro por nome
    const [gestores, setGestores] = useState([]);


    // Função para buscar alunos da API
    const fetchGestores = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch('http://127.0.0.1:5000/gestor/lista-gestores', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                }
            });
            
            if (!response.ok) {
                throw new Error('Erro ao buscar a lista de gestor');
            }
            const data = await response.json();
            setGestores(data['gestores']);
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    useEffect(() => {
        fetchGestores();
    }, []); 


    // Função para abrir o modal de edição com o gestor selecionado
    const handleOpenEditModal = (gestor) => {
        setGestorSelecionado({ ...gestor }); // Clone para edição
        setOpenEditModal(true);
    };

    // Função para fechar o modal de edição
    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setGestorSelecionado(null);
    };

    // Função para salvar as edições
    const handleSalvarEdicao = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch(`http://127.0.0.1:5000/gestor/editar-gestor/${gestorSelecionado.matricula}`, {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: gestorSelecionado.nome,
                    matricula: gestorSelecionado.matricula,
                })
            });
    
            if (response.ok) {
 
                await fetchGestores();
                handleCloseEditModal();
                
            } else {
                console.error('Erro ao editar gestor:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    const handleDeleteGestor = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch(`http://127.0.0.1:5000/gestor/deletar-gestor/${gestorSelecionado.matricula}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                await fetchGestores();
                handleCloseEditModal();
            } else {
                console.error('Erro ao deletar gestor:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    // Função para filtrar os gestores com base nos termos de pesquisa
    const filtrarGestores = () => {
        return gestores.filter((gestor) => {
            const matchNome = gestor.nome.toLowerCase().includes(searchTerm.toLowerCase());
            return matchNome;
        });
    };

    return (
        <Box sx={{ fontFamily: 'Open Sans' }}>
            <NavBar />

            <Button onClick={() => {navigate('/home-gestor')}}>
                <ArrowBackIosNewIcon />
            </Button>
            
            <Box
                sx={{
                    backgroundColor: 'white',
                    width: '100%',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: '#015495', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                    Gestores
                </Typography>

                {/* Filtros */}
                <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                    <TextField
                        label="Pesquisar por nome"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        variant="outlined"
                    />
                </Box>

                {/* Lista de Gestores */}
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '600px',
                        height: '400px',
                        overflow: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#015495',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#013d6b',
                        },
                    }}
                >
                    <List sx={{ backgroundColor: '#ffffff', borderRadius: '0px', width: '100%' }}>
                        {filtrarGestores().map((gestor, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    marginBottom: '10px',
                                    backgroundColor: 'white',
                                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                                    padding: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                                        {gestor.nome}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 300, fontFamily: 'Open Sans' }}>
                                        Matrícula: {gestor.matricula}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    onClick={() => handleOpenEditModal(gestor)}
                                    sx={{ backgroundColor: '#015495', color: 'white', marginLeft: '10px' }}
                                >
                                    Editar
                                </Button>

                            </ListItem>
                        ))}
                    </List>
                </Box>
                <CustomButton
                    variant="contained"
                    color="primary"
                    sx={{
                        fontFamily: 'Open Sans',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '20px', // Added margin to separate from scroll container
                    }}
                    onClick={() => navigate('/gestor/cadastra-gestor')}
                >
                    Novo gestor
                    <AddIcon sx={{ marginLeft: '8px' }} />
                </CustomButton>
            </Box>

            {/* Modal para editar as informações do gestor */}
            <Modal
                open={openEditModal}
                onClose={handleCloseEditModal}
                aria-labelledby="modal-editar-gestor-titulo"
                aria-describedby="modal-editar-gestor-conteudo"
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
                        boxShadow: 24,
                    }}
                >
                    {gestorSelecionado && (
                        <div>
                            <Typography id="modal-editar-gestor-titulo" variant="h6" component="h2" sx={{ color: 'black', fontFamily: 'Open Sans', fontWeight: 'bold' }}>
                                Editar gestor
                            </Typography>
                            {/* Editar Nome */}
                            <TextField
                                label="Nome"
                                fullWidth
                                margin="normal"
                                value={gestorSelecionado.nome}
                                onChange={(e) =>
                                    setGestorSelecionado({ ...gestorSelecionado, nome: e.target.value })
                                }
                            />
                            {/* Editar Matricula */}
                            <TextField
                                label="Matrícula"
                                fullWidth
                                margin="normal"
                                value={gestorSelecionado.matricula}
                                onChange={(e) =>
                                    setGestorSelecionado({ ...gestorSelecionado, matricula: e.target.value })
                                }
                                disabled
                            />
                            

                            {/* Botões para Salvar, Deletar e Fechar */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                {/* Botão Salvar */}
                                <Button
                                    onClick={handleSalvarEdicao}
                                    variant="contained"
                                    sx={{ backgroundColor: 'green', color: 'white', fontFamily: 'Open Sans' }}
                                >
                                    Salvar
                                </Button>

                                {/* Botão Deletar (vermelho) */}
                                <Button
                                    onClick={() => handleDeleteGestor(gestorSelecionado)} // Função para deletar o gestor
                                    variant="contained"
                                    sx={{ backgroundColor: '#ab2325', color: 'white', fontFamily: 'Open Sans' }}
                                >
                                    Excluir
                                </Button>

                                {/* Botão Fechar */}
                                <Button
                                    onClick={handleCloseEditModal}
                                    variant="contained"
                                    sx={{ backgroundColor: '#015495', color: 'white', fontFamily: 'Open Sans' }}
                                >
                                    Fechar
                                </Button>
                            </Box>
                        </div>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}
