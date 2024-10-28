import React, { useEffect, useState, useContext } from 'react';
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

export function ListaAlunos() {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useContext(AuthContext); // Pegando o status de autenticação e o tipo de usuário

    useEffect(() => {
        // Verifique se o usuário está autenticado e se o tipo de usuário é "gestor"
        if (!isAuthenticated || user.tipo !== 'gestor') {
        navigate('/login'); // Redireciona para a página de login ou outra página de acesso negado
        }
    }, [isAuthenticated, user, navigate]);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Filtro por nome
    const [turmaFilter, setTurmaFilter] = useState(''); // Filtro por tipo de turma
    const [alunos, setAlunos] = useState([]); // Lista de alunos

    // Função para buscar alunos da API
    const fetchAlunos = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch('http://127.0.0.1:5000/gestor/lista-alunos', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                }
            });
            
            if (!response.ok) {
                throw new Error('Erro ao buscar a lista de alunos');
            }
            const data = await response.json();
            setAlunos(data['alunos']);
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    useEffect(() => {
        fetchAlunos(); // Chamada à função para carregar os alunos
    }, []); // Executa apenas uma vez na montagem do componente


    const handleVerNotas = (matricula) => {
        // Navega para a página de notas com a matrícula como parâmetro na URL
        navigate(`/gestor/gerencia-notas/${matricula}`);
    };

    // Função para abrir o modal de edição com o aluno selecionado
    const handleOpenEditModal = (aluno) => {
        setAlunoSelecionado({ ...aluno }); // Clone para edição
        setOpenEditModal(true);
    };

    // Função para fechar o modal de edição
    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setAlunoSelecionado(null);
    };

    // Função para salvar as edições
    const handleSalvarEdicao = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch(`http://127.0.0.1:5000/gestor/editar-aluno/${alunoSelecionado.matricula}`, {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: alunoSelecionado.nome,
                    matricula: alunoSelecionado.matricula,
                    trilha: alunoSelecionado.trilha,
                    turma: alunoSelecionado.turma
                })
            });
    
            if (response.ok) {
 
                await fetchAlunos();
                handleCloseEditModal();
                
            } else {
                console.error('Erro ao editar aluno:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    const handleDeleteAluno = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch(`http://127.0.0.1:5000/gestor/deletar-aluno/${alunoSelecionado.matricula}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                await fetchAlunos();
                handleCloseEditModal();
            } else {
                console.error('Erro ao deletar aluno:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    // Função para filtrar os alunos com base nos termos de pesquisa
    const filtrarAlunos = () => {
        
        if (!Array.isArray(alunos)) {
            console.log('Alunos não é um array');
            return [];
        }
        return alunos.filter((aluno) => {
            const matchNome = aluno.nome && aluno.nome.toLowerCase().includes(searchTerm.toLowerCase());
            const matchTurma = turmaFilter === '' || aluno.turma === turmaFilter;
            return matchNome && matchTurma;
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
                    Alunos
                </Typography>

                {/* Filtros */}
                <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, fontFamily: 'Open Sans' }}>
                    <TextField
                        label="Pesquisar por nome"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        variant="outlined"
                    />
                    <FormControl variant="outlined" sx={{ minWidth: 150, fontFamily: 'Open Sans' }}>
                        <InputLabel>Tipo de Turma</InputLabel>
                        <Select
                            value={turmaFilter}
                            onChange={(e) => setTurmaFilter(e.target.value)}
                            label="Tipo de Turma"
                        >
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="presencial">Presencial</MenuItem>
                            <MenuItem value="online">Online</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Lista de Alunos */}
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
                        {filtrarAlunos().map((aluno) => (
                            <ListItem
                                key={aluno.matricula}
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
                                        {aluno.nome.charAt(0).toUpperCase() + aluno.nome.slice(1)}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 300, fontFamily: 'Open Sans' }}>
                                        Matricula: {aluno.matricula}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 300, fontFamily: 'Open Sans' }}>
                                        Turma: {aluno.turma.charAt(0).toUpperCase() + aluno.turma.slice(1)}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 300, fontFamily: 'Open Sans' }}>
                                        Trilha: {aluno.trilha.charAt(0).toUpperCase() + aluno.trilha.slice(1)}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    onClick={() => handleOpenEditModal(aluno)}
                                    sx={{ backgroundColor: '#015495', color: 'white', marginLeft: '10px', fontFamily: 'Open Sans' }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: '#ab2325', color: 'white', marginLeft: '10px', fontFamily: 'Open Sans' }}
                                    onClick={() => handleVerNotas(aluno.matricula)}
                                >
                                    Notas
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
                    onClick={() => navigate('/gestor/cadastra-aluno')}
                >
                    Novo aluno
                    <AddIcon sx={{ marginLeft: '8px' }} />
                </CustomButton>
            </Box>

            {/* Modal para editar as informações do aluno */}
            <Modal
                open={openEditModal}
                onClose={handleCloseEditModal}
                aria-labelledby="modal-editar-aluno-titulo"
                aria-describedby="modal-editar-aluno-conteudo"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        fontFamily: 'Open Sans',
                    }}
                >
                    <Typography id="modal-editar-aluno-titulo" variant="h6" component="h2" sx={{fontWeight: 'bold', color:'black', fontFamily:'Open sans'}}>
                        Editar Aluno
                    </Typography>

                    {alunoSelecionado && (
                        <>
                            <TextField
                                label="Nome"
                                value={alunoSelecionado.nome}
                                onChange={(e) => setAlunoSelecionado({ ...alunoSelecionado, nome: e.target.value })}
                            />
                            <TextField
                                label="Matricula"
                                value={alunoSelecionado.matricula}
                                disabled // matrícula não deve ser editável
                            />
                            <FormControl>
                                <InputLabel>Trilha</InputLabel>
                                <Select
                                    value={alunoSelecionado.trilha}
                                    onChange={(e) => setAlunoSelecionado({ ...alunoSelecionado, trilha: e.target.value })}
                                >
                                    <MenuItem value="humanas">Humanas</MenuItem>
                                    <MenuItem value="naturais">Naturais</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel>Tipo de Turma</InputLabel>
                                <Select
                                    value={alunoSelecionado.turma}
                                    onChange={(e) => setAlunoSelecionado({ ...alunoSelecionado, turma: e.target.value })}
                                >
                                    <MenuItem value="presencial">Presencial</MenuItem>
                                    <MenuItem value="online">Online</MenuItem>
                                </Select>
                            </FormControl>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                <Button onClick={handleSalvarEdicao} variant="contained" sx={{ backgroundColor: 'green', color: 'white', fontFamily: 'Open Sans' }}>
                                    Salvar
                                </Button>
                                <Button onClick={() => handleDeleteAluno(alunoSelecionado)} variant="contained" sx={{ backgroundColor: '#ab2325', color: 'white', fontFamily: 'Open Sans' }}>
                                    Excluir
                                </Button>
                                <Button onClick={handleCloseEditModal} variant="contained" sx={{ backgroundColor: '#015495', color: 'white', fontFamily: 'Open Sans' }}>
                                    Fechar
                                </Button>
                                
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}
