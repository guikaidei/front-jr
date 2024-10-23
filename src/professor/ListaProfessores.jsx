import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Typography, Box, List, ListItem, Button, Modal, TextField, Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText, OutlinedInput } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { NavBar } from '../common/navbar';
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

export function ListaProfessores() {
    const navigate = useNavigate();
    const [modalNovoProfessor, setModalNovoProfessor] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [professorSelecionado, setProfessorSelecionado] = useState(null);
    const [novoProfessor, setNovoProfessor] = useState({ nome: '', email: '', turma: '', status: '', materias: [] });
    const [searchTerm, setSearchTerm] = useState(''); // Filtro por nome
    const [filtroMateria, setFiltroMateria] = useState('');

    const professores = [
        { nome: 'Carlos', email: 'carlos@email.com', telefone: '123456789', materias: ['Matemática', 'Naturais'], status: 'Ativo' },
        { nome: 'Ana', email: 'ana@email.com', telefone: '987654321', materias: ['Português', 'Humanas'], status: 'Inativo' },
        { nome: 'Luiza', email: 'luiza@email.com', telefone: '543216789', materias: ['Naturais'], status: 'Ativo' },
    ];

    const materiasDisponiveis = ['Matemática', 'Português', 'Humanas', 'Naturais'];

    // Função para abrir o modal de novo professor
    const handleNovoProfessorOpen = () => setModalNovoProfessor(true);
    const handleNovoProfessorClose = () => setModalNovoProfessor(false);

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
    const handleSalvarEdicao = () => {
        // adicionar lógica para salvar as edições no backend
        setOpenEditModal(false);
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
                                            Email: {professor.email}
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 300, fontFamily: 'Open Sans'}}>
                                            Matérias: {professor.materias.join(', ')}
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ color: '#015495', fontWeight: 500, fontFamily: 'Open Sans' }}>
                                            Status: {professor.status}
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
                            <TextField label="Email" fullWidth margin="normal" value={professorSelecionado.email} onChange={(e) => setProfessorSelecionado({ ...professorSelecionado, email: e.target.value })} />

                            {/* Select para turma */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Turma</InputLabel>
                                <Select value={professorSelecionado.turma} onChange={(e) => setProfessorSelecionado({ ...professorSelecionado, turma: e.target.value })}>
                                    <MenuItem value="Presencial">Presencial</MenuItem>
                                    <MenuItem value="Online">Online</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Select para status */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Status</InputLabel>
                                <Select value={professorSelecionado.status} onChange={(e) => setProfessorSelecionado({ ...professorSelecionado, status: e.target.value })}>
                                    <MenuItem value="Ativo">Ativo</MenuItem>
                                    <MenuItem value="Inativo">Inativo</MenuItem>
                                </Select>
                            </FormControl>

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

                            <Button onClick={handleSalvarEdicao} variant="contained" sx={{ mt: 3, backgroundColor: 'green', color: 'white', fontFamily: 'Open Sans' }}>
                                Salvar
                            </Button>
                            <Button onClick={handleCloseEditModal} variant="contained" sx={{ mt: 3, backgroundColor: '#015495', color: 'white', fontFamily: 'Open Sans', marginLeft: '10px' }}>
                                Fechar
                            </Button>
                        </div>
                    )}
                </Box>
            </Modal>

            

            {/* Modal para adicionar novo professor */}
            <Modal open={modalNovoProfessor} onClose={handleNovoProfessorClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: 24 }}>
                    <Typography variant="h6" component="h2" sx={{ color: 'black', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                        Adicionar novo professor
                    </Typography>
                    <TextField label="Nome" fullWidth margin="normal" value={novoProfessor.nome} onChange={(e) => setNovoProfessor({ ...novoProfessor, nome: e.target.value })} />
                    <TextField label="Email" fullWidth margin="normal" value={novoProfessor.email} onChange={(e) => setNovoProfessor({ ...novoProfessor, email: e.target.value })} />

                    {/* Select para turma */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Turma</InputLabel>
                        <Select value={novoProfessor.turma} onChange={(e) => setNovoProfessor({ ...novoProfessor, turma: e.target.value })}>
                            <MenuItem value="Presencial">Presencial</MenuItem>
                            <MenuItem value="Online">Online</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Select para status */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Status</InputLabel>
                        <Select value={novoProfessor.status} onChange={(e) => setNovoProfessor({ ...novoProfessor, status: e.target.value })}>
                            <MenuItem value="Ativo">Ativo</MenuItem>
                            <MenuItem value="Inativo">Inativo</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Select múltiplo para matérias */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Matérias</InputLabel>
                        <Select
                            multiple
                            value={novoProfessor.materias}
                            onChange={(e) => setNovoProfessor({ ...novoProfessor, materias: e.target.value })}
                            input={<OutlinedInput label="Matérias" />}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {materiasDisponiveis.map((materia) => (
                                <MenuItem key={materia} value={materia}>
                                    <Checkbox checked={novoProfessor.materias.includes(materia)} />
                                    <ListItemText primary={materia} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button variant="contained" color="primary" sx={{ fontFamily: 'Open Sans', marginTop: '20px' }} onClick={() => setModalNovoProfessor(false)}>
                        Adicionar
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
