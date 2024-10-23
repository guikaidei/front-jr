import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Modal, TextField, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import { NavBar } from '../common/navbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
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

export function GerenciaNotas() {
    const navigate = useNavigate();
    const [simulados, setSimulados] = useState([
        { id: 1, nome: 'Simulado 1', nota: 7.5 },
        { id: 2, nome: 'Simulado 2', nota: 8.3 },
        { id: 3, nome: 'Simulado 3', nota: 9.1 },
        { id: 4, nome: 'Simulado 4', nota: 9.0 },
        { id: 5, nome: 'Simulado 5', nota: 7.2 },
        { id: 6, nome: 'Simulado 6', nota: 8.7 },
        { id: 7, nome: 'Simulado 7', nota: 9.4 },
        { id: 8, nome: 'Simulado 8', nota: 8.1 },
        // Adicione mais simulados conforme necessário para testar o scroll
    ]);
    const [modalAberto, setModalAberto] = useState(false);
    const [editandoSimulado, setEditandoSimulado] = useState(null);
    const [novoSimulado, setNovoSimulado] = useState({ nome: '', nota: '' });

    // Funções para abrir/fechar modais
    const handleAbrirModal = () => setModalAberto(true);
    const handleFecharModal = () => {
        setModalAberto(false);
        setEditandoSimulado(null);
        setNovoSimulado({ nome: '', nota: '' });
    };

    // Função para adicionar ou editar simulado
    const handleSalvarSimulado = () => {
        if (editandoSimulado) {
            // Editar simulado existente
            setSimulados((prevSimulados) =>
                prevSimulados.map((simulado) =>
                    simulado.id === editandoSimulado.id ? { ...editandoSimulado, ...novoSimulado } : simulado
                )
            );
        } else {
            // Adicionar novo simulado
            setSimulados((prevSimulados) => [
                ...prevSimulados,
                { id: prevSimulados.length + 1, ...novoSimulado },
            ]);
        }
        handleFecharModal();
    };

    // Função para editar um simulado
    const handleEditarSimulado = (simulado) => {
        setEditandoSimulado(simulado);
        setNovoSimulado(simulado);
        handleAbrirModal();
    };

    // Função para excluir um simulado
    const handleExcluirSimulado = (id) => {
        setSimulados(simulados.filter((simulado) => simulado.id !== id));
    };

    return (
        <Box sx={{ fontFamily: 'Open Sans' }}>
            <NavBar />

            <Button onClick={() => {navigate('/home-gestor')}}>
                <ArrowBackIosNewIcon />
            </Button>

            {/* Seção de Notas */}
            <Box sx={{ backgroundColor: 'white', width: '100%', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#015495', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                    Notas dos Simulados
                </Typography>

                {/* Contêiner com scroll independente para a tabela */}
                <Box sx={{ width: '100%', 
                        maxWidth: '800px', 
                        maxHeight: '400px', 
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
                        marginBottom: '20px' }}>
                    <Table sx={{ width: '100%', fontSize: '16px' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Open Sans', fontSize: '18px' }}>Simulado</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Open Sans', fontSize: '18px' }}>Nota</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontFamily: 'Open Sans', fontSize: '18px' }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {simulados.map((simulado) => (
                                <TableRow key={simulado.id}>
                                    <TableCell sx={{ fontFamily: 'Open Sans', fontSize: '16px' }}>{simulado.nome}</TableCell>
                                    <TableCell sx={{ fontFamily: 'Open Sans', fontSize: '16px' }}>{simulado.nota}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleEditarSimulado(simulado)} sx={{ color: '#015495' }}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleExcluirSimulado(simulado.id)} sx={{ color: 'red' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>

                <CustomButton
                    variant="contained"
                    color="primary"
                    sx={{
                        fontFamily: 'Open Sans',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '20px',
                    }}
                    onClick={handleAbrirModal}
                >
                    Novo gestor
                    <AddIcon sx={{ marginLeft: '8px' }} />
                </CustomButton>
            </Box>

            {/* Modal para adicionar/editar simulado */}
            <Modal open={modalAberto} onClose={handleFecharModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: 24 }}>
                    <Typography variant="h6" component="h2" sx={{ color: 'black', fontFamily: 'Open Sans', fontWeight: 'bold' }}>
                        {editandoSimulado ? 'Editar Simulado' : 'Adicionar Simulado'}
                    </Typography>
                    <TextField
                        label="Nome do Simulado"
                        fullWidth
                        margin="normal"
                        value={novoSimulado.nome}
                        onChange={(e) => setNovoSimulado({ ...novoSimulado, nome: e.target.value })}
                    />
                    <TextField
                        label="Nota"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={novoSimulado.nota}
                        onChange={(e) => setNovoSimulado({ ...novoSimulado, nota: e.target.value })}
                    />
                    <Button onClick={handleSalvarSimulado} variant="contained" sx={{ mt: 3, backgroundColor: 'green', color: 'white', fontFamily: 'Open Sans' }}>
                        {editandoSimulado ? 'Salvar' : 'Adicionar'}
                    </Button>
                    <Button onClick={handleFecharModal} variant="contained" sx={{ mt: 3, backgroundColor: '#015495', color: 'white', fontFamily: 'Open Sans', marginLeft: '10px' }}>
                        Fechar
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
