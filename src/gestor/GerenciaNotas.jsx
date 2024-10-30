import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Box, Button, Modal, TextField, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import { NavBar } from '../common/navbar';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
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

export function GerenciaNotas() {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useContext(AuthContext); // Pegando o status de autenticação e o tipo de usuário

    useEffect(() => {
        // Verifique se o usuário está autenticado e se o tipo de usuário é "gestor"
        if (!isAuthenticated || user.tipo !== 'gestor') {
        navigate('/login'); // Redireciona para a página de login ou outra página de acesso negado
        }
    }, [isAuthenticated, user, navigate]);

    const { matricula } = useParams();
    const [simulados, setSimulados] = useState([]);
    const [simuladoSelecionado, setSimuladoSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    // Função para buscar simulados
    const fetchSimulados = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch(`http://127.0.0.1:5000/gestor/listar_notas/${matricula}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                }
            });
            
            if (!response.ok) {
                throw new Error('Erro ao buscar notas');
            }
            const data = await response.json();
            setSimulados(data['notas']);
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    useEffect(() => {
        fetchSimulados();
    }, []);
    

    // Funções para abrir/fechar modais
    const handleAbrirModal = () => {
        setSimuladoSelecionado(null); // Certifica-se de que não há simulado selecionado
        setNovoSimulado({ nome: '', nota: '' }); // Limpa o estado do novo simulado
        setModalAberto(true);
    };
    
    const handleFecharModal = () => {
        setModalAberto(false);
        setNovoSimulado({ nome: '', nota: '' });
    };

    // Função para adicionar ou editar simulado
    const handleSalvarEdicao = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch(`http://127.0.0.1:5000/gestor/${matricula}/editar-nota/${simuladoSelecionado.id}`, {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nota: simuladoSelecionado.nota,
                    simulado: simuladoSelecionado.simulado
                })
            });
    
            if (response.ok) {
 
                await fetchSimulados();
                handleFecharModal();
                
            } else {
                console.error('Erro ao editar simulado:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    // Função para deletar simulado
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch(`http://127.0.0.1:5000/gestor/${matricula}/deletar-nota/${simuladoSelecionado.id}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                await fetchSimulados();
                handleFecharModal();
            } else {
                console.error('Erro ao deletar nota:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    
    const handleOpenEditModal = (simulado) => {
        setSimuladoSelecionado({ ...simulado }); // Clone para edição
        setModalAberto(true);
    };

    const [novoSimulado, setNovoSimulado] = useState({ nome: '', nota: '' });

    // Função para salvar novo simulado
    const handleSalvarNovoSimulado = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch(`http://127.0.0.1:5000/gestor/notas/${matricula}`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    simulado: novoSimulado.nome,
                    nota: novoSimulado.nota,
                }),
            });
    
            if (response.ok) {
                await fetchSimulados(); // Atualizar a lista de simulados após a criação
                handleFecharModal(); // Fechar o modal após salvar
            } else {
                console.error('Erro ao criar simulado:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    return (
        <Box sx={{ fontFamily: 'Open Sans' }}>
            <NavBar />

            <Button onClick={() => {navigate('/usuarios/alunos')}}>
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
                    <Table sx={{ width: '100%', fontSize: '16px', alignContent: 'center', alignItems: 'center' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Open Sans', fontSize: '18px' }}>Simulado</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Open Sans', fontSize: '18px' }}>Nota</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', fontFamily: 'Open Sans', fontSize: '18px' }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {simulados.map((simulado) => (
                                <TableRow>
                                    <TableCell sx={{ fontFamily: 'Open Sans', fontSize: '16px' }}>{simulado.simulado}</TableCell>
                                    <TableCell sx={{ fontFamily: 'Open Sans', fontSize: '16px' }}>{simulado.nota}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleOpenEditModal(simulado)} sx={{ color: '#015495' }}>
                                            <EditIcon />
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
                    Novo Simulado
                    <AddIcon sx={{ marginLeft: '8px' }} />
                </CustomButton>
            </Box>

            {/* Modal para adicionar/editar simulado */}
            <Modal open={modalAberto} onClose={handleFecharModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: 24 }}>
                    {simuladoSelecionado ? (
                        <div>
                            <Typography variant="h6" component="h2" sx={{ color: 'black', fontFamily: 'Open Sans', fontWeight: 'bold' }}>
                                Editar Simulado
                            </Typography>
                            <TextField label="Simulado" fullWidth margin="normal" value={simuladoSelecionado.simulado} onChange={(e) => setSimuladoSelecionado({ ...simuladoSelecionado, simulado: e.target.value })} />
                            <TextField label="Nota" type='number' slotProps={{ step: "0.01", min: 0 }} fullWidth margin="normal" value={simuladoSelecionado.nota} onChange={(e) => setSimuladoSelecionado({ ...simuladoSelecionado, nota: e.target.value })}/>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                <Button onClick={handleSalvarEdicao} variant="contained" sx={{ backgroundColor: 'green', color: 'white', fontFamily: 'Open Sans' }}>
                                    Salvar
                                </Button>
                                <Button onClick={handleDelete} variant="contained" sx={{ backgroundColor: '#ab2325', color: 'white', fontFamily: 'Open Sans' }}>
                                    Excluir
                                </Button>
                                <Button onClick={handleFecharModal} variant="contained" sx={{ backgroundColor: '#015495', color: 'white', fontFamily: 'Open Sans' }}>
                                    Fechar
                                </Button>
                            </Box>
                        </div>
                    ) : (
                        <div>
                            <Typography variant="h6" component="h2" sx={{ color: 'black', fontFamily: 'Open Sans', fontWeight: 'bold' }}>
                                Novo Simulado
                            </Typography>
                            <TextField label="Simulado" fullWidth margin="normal" value={novoSimulado.nome} onChange={(e) => setNovoSimulado({ ...novoSimulado, nome: e.target.value })} />
                            <TextField label="Nota" type='number' fullWidth margin="normal" slotProps={{ step: "0.01", min: 0 }} value={novoSimulado.nota} onChange={(e) => setNovoSimulado({ ...novoSimulado, nota: e.target.value })} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                <Button onClick={handleSalvarNovoSimulado} variant="contained" sx={{ backgroundColor: 'green', color: 'white', fontFamily: 'Open Sans' }}>
                                    Salvar
                                </Button>
                                <Button onClick={handleFecharModal} variant="contained" sx={{ backgroundColor: '#015495', color: 'white', fontFamily: 'Open Sans' }}>
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
