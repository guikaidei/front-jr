import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, List, ListItem, Button, Modal, TextField, Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText, OutlinedInput } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { NavBar } from '../common/navbar';
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

export function ListaProfessores() {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useContext(AuthContext); // Pegando o status de autenticação e o tipo de usuário

    useEffect(() => {
        // Verifique se o usuário está autenticado e se o tipo de usuário é "gestor"
        if (!isAuthenticated || user.tipo !== 'gestor') {
        navigate('/login'); // Redireciona para a página de login ou outra página de acesso negado
        }
    }, [isAuthenticated, user, navigate]);
    
    const [openEditModal, setOpenEditModal] = useState(false);
    const [professorSelecionado, setProfessorSelecionado] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Filtro por nome
    const [filtroMateria, setFiltroMateria] = useState('');
    const [professores, setProfessores] = useState([]); // Lista de professores

    const materiasDisponiveis = ['Matemática', 'Português', 'Humanas', 'Naturais'];

    // Função para buscar professores da API
    const fetchProfesores = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); 
            const response = await fetch('http://127.0.0.1:5000/gestor/lista-professores', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                }
            });
            
            if (!response.ok) {
                throw new Error('Erro ao buscar a lista de professores');
            }
            const data = await response.json();
            setProfessores(data['professores']);
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    useEffect(() => {
        fetchProfesores();
    }, []); 


    // Função para abrir o modal de edição
    const handleOpenEditModal = (professor) => {
        setProfessorSelecionado({ ...professor });
        setOpenEditModal(true);
    };

    // Função para fechar o modal de edição
    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setProfessorSelecionado(null);
    };

    // Função para salvar edições no professor
    const handleSalvarEdicao = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`http://127.0.0.1:5000/gestor/editar-professor/${professorSelecionado.matricula}`, {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: professorSelecionado.nome,
                    matricula: professorSelecionado.matricula,
                    materias: professorSelecionado.materias
                })
            });
    
            if (response.ok) {
 
                await fetchProfesores();
                handleCloseEditModal();
                
            } else {
                console.error('Erro ao editar professor:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    // Função para deletar um professor
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); 
            const response = await fetch(`http://127.0.0.1:5000/gestor/deletar-professor/${professorSelecionado.matricula}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                await fetchProfesores();
                handleCloseEditModal();
            } else {
                console.error('Erro ao deletar professor:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    // Função para aplicar os filtros
    const professoresFiltrados = professores.filter((professor) => {
        const matchNome = professor.nome.toLowerCase().includes(searchTerm.toLowerCase());
        const filtroMateriaMatch = filtroMateria ? professor.materias.includes(filtroMateria) : true;
        return matchNome && filtroMateriaMatch;
    });

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
                        Professores
                    </Typography>

                    {/* Filtros */}
                    <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                        <TextField
                            label="Pesquisar por nome"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            variant="outlined"
                            sx={{ minWidth: 250, fontFamily: 'Open Sans', }} 
                        />
                        <FormControl sx={{ minWidth: 200, fontFamily: 'Open Sans' }} variant="outlined">  {/* Ajustado para mostrar todo o título */}
                            <InputLabel>Matéria</InputLabel>
                            <Select
                                value={filtroMateria}
                                onChange={(e) => setFiltroMateria(e.target.value)}
                                label="Filtrar por matéria"
                            >
                                <MenuItem value="">Todas</MenuItem>
                                {materiasDisponiveis.map((materia, index) => (
                                    <MenuItem key={index} value={materia}>{materia}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>


                    <Box sx={{
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
                    }}>
                        <List sx={{ backgroundColor: '#ffffff', width: '100%', paddingRight: '10px' }}>
                            {professoresFiltrados.map((professor, index) => (
                                <ListItem key={index} sx={{ marginBottom: '10px', backgroundColor: 'white', boxShadow: '0px 2px 4px rgba(0,0,0,0.1)', padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                                            {professor.nome}
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 300, fontFamily: 'Open Sans' }}>
                                            Matrícula: {professor.matricula}
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 300, fontFamily: 'Open Sans'}}>
                                            Matérias: {professor.materias.join(', ')}
                                        </Typography>

                                    </Box>
                                    <Button
                                        variant="contained"
                                        startIcon={<EditIcon />}
                                        onClick={() => handleOpenEditModal(professor)}
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
                            onClick={() => navigate('/gestor/cadastra-professor')}
                        >
                            Novo professor
                            <AddIcon sx={{ marginLeft: '8px' }} />
                        </CustomButton>

                </Box>

            {/* Modal para editar o professor */}
            <Modal open={openEditModal} onClose={handleCloseEditModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: 24 }}>
                    {professorSelecionado && (
                        <div>
                            <Typography variant="h6" component="h2" sx={{ color: 'black', fontFamily: 'Open Sans', fontWeight: 'bold' }}>
                                Editar Professor
                            </Typography>
                            <TextField label="Nome" fullWidth margin="normal" value={professorSelecionado.nome} onChange={(e) => setProfessorSelecionado({ ...professorSelecionado, nome: e.target.value })} />
                            <TextField disabled label="Matrícula" fullWidth margin="normal" value={professorSelecionado.matricula} onChange={(e) => setProfessorSelecionado({ ...professorSelecionado, matricula: e.target.value })} />

                            {/* Select múltiplo para matérias */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Matérias</InputLabel>
                                <Select
                                    multiple
                                    value={professorSelecionado.materias}
                                    onChange={(e) => setProfessorSelecionado({ ...professorSelecionado, materias: e.target.value })}
                                    input={<OutlinedInput label="Matérias" />}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {materiasDisponiveis.map((materia) => (
                                        <MenuItem key={materia} value={materia}>
                                            <Checkbox checked={professorSelecionado.materias.includes(materia)} />
                                            <ListItemText primary={materia} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                <Button onClick={handleSalvarEdicao} variant="contained" sx={{ backgroundColor: 'green', color: 'white', fontFamily: 'Open Sans' }}>
                                    Salvar
                                </Button>
                                <Button onClick={() => handleDelete(professorSelecionado)} variant="contained" sx={{ backgroundColor: '#ab2325', color: 'white', fontFamily: 'Open Sans' }}>
                                    Excluir
                                </Button>
                                <Button onClick={handleCloseEditModal} variant="contained" sx={{ backgroundColor: '#015495', color: 'white', fontFamily: 'Open Sans' }}>
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
