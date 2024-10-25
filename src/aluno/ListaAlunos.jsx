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

export function ListaAlunos() {
    const navigate = useNavigate();
    const [openEditModal, setOpenEditModal] = useState(false);
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Filtro por nome
    const [turmaFilter, setTurmaFilter] = useState(''); // Filtro por tipo de turma

    // Lista de alunos
    const alunos = [
        {
            nome: 'João',
            matricula: '123456',
            email: 'joao@email.com',
            telefone: '123456789',
            turma: 'Presencial',
            status: 'Ativo'
        },
        {
            nome: 'Maria',
            matricula: '123457',
            email: 'maria@email.com',
            telefone: '987654321',
            turma: 'Presencial',
            status: 'Ativo'
        },
        {
            nome: 'José',
            matricula: '123458',
            email: 'jose@email.com',
            telefone: '123456780',
            turma: 'Presencial',
            status: 'Ativo'
        },
        {
            nome: 'Jorge',
            matricula: '123459',
            email: 'jorge@email.com',
            telefone: '123456781',
            turma: 'Online',
            status: 'Ativo'
        },
        {
            nome: 'Kleber',
            matricula: '123460',
            email: 'kleber@email.com',
            telefone: '123456782',
            turma: 'Online',
            status: 'Ativo'
        }
    ];

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
    const handleSalvarEdicao = () => {
        // adicionar lógica para salvar as edições
        setOpenEditModal(false);
    };

    const handleDeleteAluno = (aluno) => {
        // adicionar a lógica para deletar o aluno
        console.log('Aluno deletado:', aluno);
        handleCloseEditModal(); // Fechar o modal após a exclusão
    };

    // Função para filtrar os alunos com base nos termos de pesquisa
    const filtrarAlunos = () => {
        return alunos.filter((aluno) => {
            const matchNome = aluno.nome.toLowerCase().includes(searchTerm.toLowerCase());
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
                            <MenuItem value="Presencial">Presencial</MenuItem>
                            <MenuItem value="Online">Online</MenuItem>
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
                        {filtrarAlunos().map((aluno, index) => (
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
                                        {aluno.nome}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 300, fontFamily: 'Open Sans' }}>
                                        Email: {aluno.email}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 300, fontFamily: 'Open Sans' }}>
                                        Turma: {aluno.turma}
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
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '20px',
                        boxShadow: 24,
                    }}
                >
                    {alunoSelecionado && (
                        <div>
                            <Typography id="modal-editar-aluno-titulo" variant="h6" component="h2" sx={{ color: 'black', fontFamily: 'Open Sans', fontWeight: 'bold' }}>
                                Editar Aluno
                            </Typography>
                            {/* Editar Nome */}
                            <TextField
                                label="Nome"
                                fullWidth
                                margin="normal"
                                value={alunoSelecionado.nome}
                                onChange={(e) =>
                                    setAlunoSelecionado({ ...alunoSelecionado, nome: e.target.value })
                                }
                            />
                            {/* Editar Email */}
                            <TextField
                                label="Email"
                                fullWidth
                                margin="normal"
                                value={alunoSelecionado.email}
                                onChange={(e) =>
                                    setAlunoSelecionado({ ...alunoSelecionado, email: e.target.value })
                                }
                            />
                            {/* Editar Telefone */}
                            <TextField
                                label="Telefone"
                                fullWidth
                                margin="normal"
                                value={alunoSelecionado.telefone}
                                onChange={(e) =>
                                    setAlunoSelecionado({ ...alunoSelecionado, telefone: e.target.value })
                                }
                            />
                            {/* Editar Tipo de Turma */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Tipo de Turma</InputLabel>
                                <Select
                                    value={alunoSelecionado.turma}
                                    onChange={(e) =>
                                        setAlunoSelecionado({ ...alunoSelecionado, turma: e.target.value })
                                    }
                                    label="Tipo de Turma"
                                >
                                    <MenuItem value="Presencial">Presencial</MenuItem>
                                    <MenuItem value="Online">Online</MenuItem>
                                </Select>
                            </FormControl>
                            {/* Editar Status */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={alunoSelecionado.status}
                                    onChange={(e) =>
                                        setAlunoSelecionado({ ...alunoSelecionado, status: e.target.value })
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
                                    onClick={() => handleDeleteAluno(alunoSelecionado)} // Função para deletar o aluno
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
