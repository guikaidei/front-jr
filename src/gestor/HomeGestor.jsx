import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Box, Grid, Button, Paper, List, ListItem, Modal, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { NavBar } from '../common/navbar';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';


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

const CustomButton2 = styled(Button)(({ theme }) => ({
    '&.MuiButton-containedPrimary': {
        backgroundColor: 'white',
        color: 'white',
        '&:hover': {
            backgroundColor: '#ececec',
        },
    },
    width: '250px',
    height: '60px',
    marginTop: '20px',
    fontFamily: 'Open Sans',
    fontWeight: 'light',
    borderRadius: '0px',
}));

export function HomeGestor() {
    const navigate = useNavigate();
    const [modalNovoAviso, setModalNovoAviso] = useState(false); // Modal para novo aviso
    const [novoAviso, setNovoAviso] = useState({ titulo: '', conteudo: '' }); // Novo aviso
    const [openEditModal, setOpenEditModal] = useState(false);
    const [avisoSelecionado, setAvisoSelecionado] = useState(null);

    // Lista de matérias com rotas associadas
    const materias = [
        { nome: 'Matemática', rota: '/materias/matematica' },
        { nome: 'Português', rota: '/materias/portugues' },
        { nome: 'Humanas', rota: '/materias/humanas' },
        { nome: 'Naturais', rota: '/materias/naturais' },
    ];

    // Lista de avisos
    const avisos = [
        {
            titulo: 'Simulado amanhã',
            conteudo: 'O simulado será amanhã às 9:00.',
            data: '2021-10-10',
            materia: 'Geral',
            autor: 'João'
        },
        {
            titulo: 'Notas atualizadas',
            conteudo: 'Notas do último simulado foram atualizadas.',
            data: '2021-10-15',
            materia: 'Geral',
            autor: 'João'
        },
        {
            titulo: 'Notas atualizadas',
            conteudo: 'Notas do último simulado foram atualizadas.',
            data: '2021-10-15',
            materia: 'Geral',
            autor: 'João'
        },
        {
            titulo: 'Notas atualizadas',
            conteudo: 'Notas do último simulado foram atualizadas.',
            data: '2021-10-15',
            materia: 'Geral',
            autor: 'João'
        },
        {
            titulo: 'Notas atualizadas',
            conteudo: 'Notas do último simulado foram atualizadas.',
            data: '2021-10-15',
            materia: 'Geral',
            autor: 'João'
        },
        {
            titulo: 'Notas atualizadas',
            conteudo: 'Notas do último simulado foram atualizadas.',
            data: '2021-10-15',
            materia: 'Geral',
            autor: 'João'
        },
        {
            titulo: 'Notas atualizadas',
            conteudo: 'Notas do último simulado foram atualizadas.',
            data: '2021-10-15',
            materia: 'Geral',
            autor: 'João'
        },
        {
            titulo: 'Notas atualizadas',
            conteudo: 'Notas do último simulado foram atualizadas.',
            data: '2021-10-15',
            materia: 'Geral',
            autor: 'João'
        },
        {
            titulo: 'Notas atualizadas',
            conteudo: 'Notas do último simulado foram atualizadas.',
            data: '2021-10-15',
            materia: 'Geral',
            autor: 'João'
        },
        {
            titulo: 'Notas atualizadas',
            conteudo: 'Notas do último simulado foram atualizadas.',
            data: '2021-10-15',
            materia: 'Geral',
            autor: 'João'
        },
        
    ];

    // Função para navegação ao clicar no botão de matéria
    const handleMateriaClick = (rota) => {
        navigate(rota);
    };

    const handleNovoAvisoOpen = () => {
        setModalNovoAviso(true);
    };

    const handleNovoAvisoClose = () => {
        setModalNovoAviso(false);
    };

    const handleNovoAvisoChange = (field, value) => {
        setNovoAviso({ ...novoAviso, [field]: value });
    };    

    // Função para abrir o modal de edição com o aviso selecionado
    const handleOpenEditModal = (aviso) => {
        setAvisoSelecionado({ ...aviso }); // Clone para edição
        setOpenEditModal(true);
    };

    // Função para fechar o modal de edição
    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setAvisoSelecionado(null);
    };

    // Função para salvar as edições
    const handleSalvarEdicao = () => {
        // Aqui você pode adicionar lógica para salvar as edições, como enviar os dados para um backend
        setOpenEditModal(false);
    };

    return (
        <Box sx={{ paddingTop: '80px', fontFamily: 'Open Sans' }}>
            <NavBar />

            {/* Seção de Usuários */}
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
                <Typography variant="h4" gutterBottom sx={{ color: '#ab2325', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                    Usuários
                </Typography>

                <Grid container spacing={3} direction="column" alignItems="center" sx={{ maxWidth: '400px' }}>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            sx={{
                                width: '300px',
                                height: '80px',
                                backgroundColor: 'white',
                                color: 'black',  // Texto vermelho
                                fontSize: '18px',
                                fontWeight: 'bold',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                },
                                fontFamily: 'Open Sans',
                            }}
                            onClick={() => navigate('/usuarios/alunos')}
                        >
                            Alunos
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            sx={{
                                width: '300px',
                                height: '80px',
                                backgroundColor: 'white',
                                color: 'black',  // Texto vermelho
                                fontSize: '18px',
                                fontWeight: 'bold',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                },
                                fontFamily: 'Open Sans',
                            }}
                            onClick={() => navigate('/usuarios/professores')}
                        >
                            Professores
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            sx={{
                                width: '300px',
                                height: '80px',
                                backgroundColor: 'white',
                                color: 'black',  // Texto vermelho
                                fontSize: '18px',
                                fontWeight: 'bold',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                },
                                fontFamily: 'Open Sans',
                            }}
                            onClick={() => navigate('/usuarios/gestores')}
                        >
                            Gestores
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Seção de Matérias */}
            <Box
                sx={{
                    backgroundColor: '#ab2325',
                    width: '100%',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingBottom: '40px',
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Open Sans' }}>
                    Matérias
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
                                        backgroundColor: '#f5f5f5',
                                    },
                                }}
                                onClick={() => handleMateriaClick(materia.rota)}
                            >
                                <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                                    {materia.nome}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>

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
                    Avisos Gestores
                </Typography>
                
                {/* Container for scrollable list */}
                <Box 
                    sx={{
                        width: '100%',
                        maxWidth: '600px',
                        height: '400px', // Fixed height for scroll
                        overflow: 'auto', // Enable scroll
                        // Custom scrollbar styling
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
                    <List sx={{ 
                        backgroundColor: '#ffffff', 
                        borderRadius: '0px', 
                        width: '100%',
                        paddingRight: '10px', // Add padding to prevent content from touching scrollbar
                    }}>
                        {avisos.map((aviso, index) => (
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
                                        {aviso.titulo}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 300, fontFamily: 'Open Sans' }}>
                                        Matéria: {aviso.materia}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: '#015495', fontWeight: 500, fontFamily: 'Open Sans', marginTop: '5px' }}>
                                        {format(parseISO(aviso.data), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    onClick={() => handleOpenEditModal(aviso)}
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
                    onClick={handleNovoAvisoOpen}
                >
                    Novo aviso
                    <AddIcon sx={{ marginLeft: '8px' }} />
                </CustomButton>
            </Box>

            {/* Modal para editar o aviso */}
            <Modal
                open={openEditModal}
                onClose={handleCloseEditModal}
                aria-labelledby="modal-editar-aviso-titulo"
                aria-describedby="modal-editar-aviso-conteudo"
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
                    {avisoSelecionado && (
                        <div>
                            <Typography id="modal-editar-aviso-titulo" variant="h6" component="h2" sx={{ color: 'black', fontFamily: 'Open Sans', fontWeight: 'bold' }}>
                                Editar Aviso
                            </Typography>
                            <TextField
                                label="Título"
                                fullWidth
                                margin="normal"
                                value={avisoSelecionado.titulo}
                                onChange={(e) =>
                                    setAvisoSelecionado({ ...avisoSelecionado, titulo: e.target.value })
                                }
                            />
                            <TextField
                                label="Conteúdo"
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                                value={avisoSelecionado.conteudo}
                                onChange={(e) =>
                                    setAvisoSelecionado({ ...avisoSelecionado, conteudo: e.target.value })
                                }
                            />
                            <Button
                                onClick={handleSalvarEdicao}
                                variant="contained"
                                sx={{ mt: 3, backgroundColor: 'green', color: 'white', fontFamily: 'Open Sans' }}
                            >
                                Salvar
                            </Button>
                            <Button
                                onClick={handleSalvarEdicao}
                                variant="contained"
                                sx={{ mt: 3, backgroundColor: 'red', color: 'white', fontFamily: 'Open Sans', marginLeft: '10px', marginRight: '10px' }}
                            >
                                Deletar
                            </Button>
                            <Button
                                onClick={handleCloseEditModal}
                                variant="contained"
                                sx={{ mt: 3, backgroundColor: '#015495', color: 'white', fontFamily: 'Open Sans' }}
                            >
                                fechar
                            </Button>
                        </div>
                    )}
                </Box>
            </Modal>

            {/* Modal para criar novo aviso */}
            <Modal
                open={modalNovoAviso}
                onClose={handleNovoAvisoClose}
                aria-labelledby="modal-novo-aviso-titulo"
                aria-describedby="modal-novo-aviso-conteudo"
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
                    <Typography id="modal-novo-aviso-titulo" variant="h6" component="h2" sx={{ color: 'black', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                        Criar novo aviso
                    </Typography>
                    <TextField
                        label="Título"
                        fullWidth
                        margin="normal"
                        value={novoAviso.titulo}
                        onChange={(e) => handleNovoAvisoChange('titulo', e.target.value)}
                    />
                    <TextField
                        label="Conteúdo"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        value={novoAviso.conteudo}
                        onChange={(e) => handleNovoAvisoChange('conteudo', e.target.value)}
                    />
                    <Button
                        onClick={handleNovoAvisoClose}
                        variant="contained"
                        sx={{ mt: 3, backgroundColor: 'green', color: 'white', fontFamily: 'Open Sans', marginRight: '10px' }}
                    >
                        Adicionar
                    </Button>
                    <Button
                        onClick={handleNovoAvisoClose}
                        variant="contained"
                        sx={{ mt: 3, backgroundColor: '#015495', color: 'white', fontFamily: 'Open Sans' }}
                    >
                        fechar
                    </Button>
                </Box>
            </Modal>


        </Box>
    );
}
