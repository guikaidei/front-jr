import React, { useState } from 'react';
import { List, ListItem, ListItemText, Typography, Box, Grid, Modal, Button, Paper, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
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

export function HomeProfessor() {
    const navigate = useNavigate();

    // Lista de matérias com rotas associadas
    const materias = [
        { nome: 'Matemática', rota: '/materias/matematica' },
        { nome: 'Português', rota: '/materias/portugues' },
        { nome: 'Biologia', rota: '/materias/biologia' },
        { nome: 'Física', rota: '/materias/fisica' },
        { nome: 'Química', rota: '/materias/quimica' },
        { nome: 'História', rota: '/materias/historia' },
        { nome: 'Geografia', rota: '/materias/geografia' },
        { nome: 'Inglês', rota: '/materias/ingles' },
        { nome: 'Espanhol', rota: '/materias/espanhol' },
    ];

    // Lista de horários das matérias
    const horariosMaterias = [
        { horario: '10:30', materia: 'Matemática' },
    ];

    // Lista de avisos
    const avisos = [
        {
            titulo: 'Prova de Matemática',
            conteudo: 'A prova de matemática será na próxima segunda-feira.',
            data: '2021-10-10',
            materia: 'Matemática',
            autor: 'Prof. João'
        },
        {
            titulo: 'Lição de casa',
            conteudo: 'Atividades 1, 2 e 3',
            data: '2021-10-15',
            materia: 'Matemática',
            autor: 'Prof. João'
        },
    ];

    // Ordenar avisos por data (do mais recente para o mais antigo)
    const avisosOrdenados = [...avisos].sort((a, b) => new Date(b.data) - new Date(a.data));

    const [open, setOpen] = useState(false);
    const [modalNovoAviso, setModalNovoAviso] = useState(false); // Modal para novo aviso
    const [novoAviso, setNovoAviso] = useState({ titulo: '', conteudo: '' }); // Novo aviso
    const [openEditModal, setOpenEditModal] = useState(false);
    const [avisoSelecionado, setAvisoSelecionado] = useState(null);

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
                    Meus avisos
                </Typography>
                <List sx={{ backgroundColor: '#ffffff', borderRadius: '0px', width: '100%', maxWidth: '600px' }}>
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
                                onClick={() => handleOpenEditModal(aviso)} // Abrir o modal de edição ao clicar
                                sx={{ backgroundColor: '#015495', color: 'white', marginLeft: '10px' }}
                            >
                                Editar
                            </Button>
                        </ListItem>
                    ))}
                </List>
                <CustomButton
                    variant="contained"
                    color="primary"
                    sx={{
                        fontFamily: 'Open Sans',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={handleNovoAvisoOpen} // Abre o modal de novo aviso
                >
                    Novo aviso
                    <AddIcon sx={{ marginLeft: '8px' }} />
                </CustomButton>
            </Box>

            {/* Seção de Alunos */}
            <Box
                sx={{
                    backgroundColor: '#ab2325',
                    width: '100%',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '20px',
                    paddingBottom: '40px',
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Open Sans' }}>
                    Notas e alunos
                </Typography>
                
                <Grid sx={{ maxWidth: '800px', display:'flex', flexDirection:'column', alignItems: 'center' }}>
                    <img src="/assets/foto_generica_sala.jpg" alt="Foto da sala de aula" style={{ width: '100%', maxWidth: '300px' }} />
                    <CustomButton2
                        variant="contained"
                        color="primary"
                        sx={{
                            width: '100%', // Mesma largura que a imagem
                            maxWidth: '300px', // Limitar largura a 300px
                            fontFamily: 'Open Sans',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '0px', // Remover o espaço entre a imagem e o botão
                        }}
                    >
                        <Typography variant="h6" sx={{ color: 'black', fontWeight:'bold', fontFamily: 'Open Sans' }}>
                            Ver alunos
                        </Typography>
                        <ArrowRightAltIcon sx={{ marginLeft: '8px', color:'black' }} />
                    </CustomButton2>
                </Grid>
            </Box>


            {/* Seção de Grade Horária */}
            <Box
                sx={{
                    backgroundColor: 'white',
                    width: '100%',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '20px',
                    paddingBottom: '40px',
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: '#015495', fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Open Sans' }}>
                    Grade Horária
                </Typography>
                <Box sx={{ width: '100%', maxWidth: '400px' }}>
                    {horariosMaterias.map((item, index) => (
                        <Paper
                            key={index}
                            elevation={3}
                            sx={{
                                padding: '15px',
                                marginBottom: index === horariosMaterias.length - 1 ? 0 : '-1px',
                                borderRadius: index === 0 ? '8px 8px 0 0' : index === horariosMaterias.length - 1 ? '0 0 8px 8px' : 0,
                                borderTop: index === 0 ? 'none' : '1px solid #e0e0e0',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#f5f5f5',
                                transition: 'all 0.3s',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                    transform: 'scale(1.02)',
                                    zIndex: 1,
                                },
                            }}
                        >
                            <Typography variant="h6" sx={{ color: '#015495', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                                {item.horario}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Open Sans' }}>
                                {item.materia}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
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
