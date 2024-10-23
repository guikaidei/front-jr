import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Box, List, ListItem, Modal, TextField, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { NavBar } from '../common/navbar';

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
    const [openEditModal, setOpenEditModal] = useState(false);
    const [gestorSelecionado, setGestorSelecionado] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Filtro por nome

    // Lista de gestores
    const gestores = [
        {
            nome: 'João',
            email: 'joao@email.com',
            telefone: '123456789',
            status: 'Ativo'
        },
        {
            nome: 'Maria',
            email: 'maria@email.com',
            telefone: '987654321',
            status: 'Ativo'
        },
        {
            nome: 'José',
            email: 'jose@email.com',
            telefone: '123456780',
            status: 'Ativo'
        },
        {
            nome: 'Jorge',
            email: 'jorge@email.com',
            telefone: '123456781',
            status: 'Ativo'
        },
        {
            nome: 'Kleber',
            email: 'kleber@email.com',
            telefone: '123456782',
            status: 'Ativo'
        }
    ];

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
    const handleSalvarEdicao = () => {
        // adicionar lógica para salvar as edições
        setOpenEditModal(false);
    };

    const handleDeleteGestor = (gestor) => {
        // adicionar a lógica para deletar o gestor
        console.log('Gestor deletado:', gestor);
        handleCloseEditModal(); // Fechar o modal após a exclusão
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
                                        Email: {gestor.email}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: '#015495', fontWeight: 500, fontFamily: 'Open Sans' }}>
                                        Status: {gestor.status}
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
                            {/* Editar Email */}
                            <TextField
                                label="Email"
                                fullWidth
                                margin="normal"
                                value={gestorSelecionado.email}
                                onChange={(e) =>
                                    setGestorSelecionado({ ...gestorSelecionado, email: e.target.value })
                                }
                            />
                            {/* Editar Telefone */}
                            <TextField
                                label="Telefone"
                                fullWidth
                                margin="normal"
                                value={gestorSelecionado.telefone}
                                onChange={(e) =>
                                    setGestorSelecionado({ ...gestorSelecionado, telefone: e.target.value })
                                }
                            />
                            
                            {/* Editar Status */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={gestorSelecionado.status}
                                    onChange={(e) =>
                                        setGestorSelecionado({ ...gestorSelecionado, status: e.target.value })
                                    }
                                    label="Status"
                                >
                                    <MenuItem value="Ativo">Ativo</MenuItem>
                                    <MenuItem value="Inativo">Inativo</MenuItem>
                                </Select>
                            </FormControl>

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
                                    sx={{ backgroundColor: 'red', color: 'white', fontFamily: 'Open Sans' }}
                                >
                                    Deletar
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
