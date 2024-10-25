import React, { useState } from 'react';
import { List, ListItem, ListItemText, Typography, Box, Grid, Modal, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../common/navbar';
import { styled } from '@mui/material/styles';
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

export function HomeAluno() {
    const navigate = useNavigate();

    // Lista de matérias com rotas associadas
    const materias = [
        { nome: 'Matemática', rota: '/aluno/matematica' },
        { nome: 'Português', rota: '/aluno/portugues' },
        { nome: 'Humanas', rota: '/aluno/humanas' },
        { nome: 'Naturais', rota: '/aluno/naturais' },
    ];

    // Lista de horários das matérias
    const horariosMaterias = [
        { horario: '10:30', materia: 'Matemática' },
        { horario: '11:00', materia: 'Português' },
        { horario: '12:00', materia: 'Biologia' }
    ];

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
            titulo: 'Leitura obrigatória de Português',
            conteudo: 'Leitura obrigatória do livro "Memórias Póstumas de Brás Cubas".',
            data: '2021-10-15',
            materia: 'Português',
            autor: 'Profª. Maria'
        },
        {
            titulo: 'Aula prática de Biologia',
            conteudo: 'Teremos uma aula prática no laboratório sobre células animais.',
            data: '2021-10-20',
            materia: 'Biologia',
            autor: 'Prof. Carlos'
        },
        {
            titulo: 'Aula prática de Biologia',
            conteudo: 'Teremos uma aula prática no laboratório sobre células animais.',
            data: '2021-10-20',
            materia: 'Biologia',
            autor: 'Prof. Carlos'
        },
        {
            titulo: 'Aula prática de Biologia',
            conteudo: 'Teremos uma aula prática no laboratório sobre células animais.',
            data: '2021-10-20',
            materia: 'Biologia',
            autor: 'Prof. Carlos'
        },
        {
            titulo: 'Aula prática de Biologia',
            conteudo: 'Teremos uma aula prática no laboratório sobre células animais.',
            data: '2021-10-20',
            materia: 'Biologia',
            autor: 'Prof. Carlos'
        },
        {
            titulo: 'Aula prática de Biologia',
            conteudo: 'Teremos uma aula prática no laboratório sobre células animais.',
            data: '2021-10-20',
            materia: 'Biologia',
            autor: 'Prof. Carlos'
        },

    ];

    // Ordenar avisos por data (do mais recente para o mais antigo)
    const avisosOrdenados = [...avisos].sort((a, b) => new Date(b.data) - new Date(a.data));


    const [nomeAluno, setNomeAluno] = useState('Joao');
    const [open, setOpen] = useState(false);
    const [avisoSelecionado, setAvisoSelecionado] = useState(null);

    const handleOpenModal = (aviso) => {
        setAvisoSelecionado(aviso);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setAvisoSelecionado(null);
    };

    const handleMateriaClick = (rota) => {
        navigate(rota);
    };

    return (
        <Box sx={{paddingTop: '80px', fontFamily: 'Open Sans'}}>
            <NavBar/>

            

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
                    Novos avisos
                </Typography>
                <Box sx={{
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
                    <List sx={{ backgroundColor: '#ffffff', borderRadius: '0px', width: '100%', maxWidth: '600px' }}>
                        {avisosOrdenados.map((aviso, index) => (
                            <ListItem 
                                key={index} 
                                button 
                                onClick={() => handleOpenModal(aviso)}
                                sx={{
                                    marginBottom: '10px',
                                    backgroundColor: 'white',
                                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                                    '&:last-child': { marginBottom: 0 },
                                    padding: '15px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                                    {aviso.titulo}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 300, fontFamily: 'Open Sans' }}>
                                    Matéria: {aviso.materia}
                                </Typography>
                                <Typography variant="subtitle2" sx={{ color: '#015495', fontWeight: 500, fontFamily: 'Open Sans', marginTop: '5px' }}>
                                    {format(parseISO(aviso.data), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>

            {/* Modal para exibir o conteúdo do aviso */}
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="modal-aviso-titulo"
                aria-describedby="modal-aviso-conteudo"
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
                        boxShadow: 24
                    }}
                >
                    {avisoSelecionado && (
                        <div>
                            <Typography id="modal-aviso-titulo" variant="h6" component="h2" sx={{ color: 'black', fontFamily: 'Open Sans', fontWeight: 'bold' }}>
                                {avisoSelecionado.titulo}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: '#015495', fontWeight: 500, fontFamily: 'Open Sans', marginTop: '5px' }}>
                                {format(parseISO(avisoSelecionado.data), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            </Typography>
                            <Typography id="modal-aviso-conteudo" sx={{ mt: 2, color: 'black', fontFamily: 'Open Sans' }}>
                                {avisoSelecionado.conteudo}
                            </Typography>
                            <Typography sx={{ mt: 2, color: 'black', fontFamily: 'Open Sans' }}>
                                <strong>Matéria:</strong> {avisoSelecionado.materia}
                            </Typography>
                            <Typography sx={{ mt: 2, color: 'black', fontFamily: 'Open Sans' }}>
                                <strong>Autor:</strong> {avisoSelecionado.autor}
                            </Typography>
                            <Button 
                                onClick={handleCloseModal} 
                                variant="contained" 
                                sx={{ mt: 3, backgroundColor: '#015495', color: 'white', fontFamily: 'Open Sans' }}
                            >
                                Fechar
                            </Button>
                        </div>
                    )}
                </Box>
            </Modal>

            {/* Seção de Materias */}
            <Box 
                sx={{ 
                    backgroundColor: '#ab2325', 
                    width: '100%', 
                    padding: '40px 20px 20px 40px', 
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
                                        backgroundColor: '#f5f5f5'
                                    }
                                }}
                                onClick={() => handleMateriaClick(materia.rota)}
                            >
                                <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold',  fontFamily: 'Open Sans' }}>
                                    {materia.nome}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Seção de Grade Horária */}
            <Box 
                sx={{ 
                    backgroundColor: 'white', 
                    width: '100%', 
                    padding: '40px 20px 20px 40px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: '#015495', fontWeight: 'bold', marginBottom: '20px',  fontFamily: 'Open Sans' }}>
                    Grade Horária
                </Typography>
                <Box sx={{ width: '100%', maxWidth: '400px' }}>
                    {horariosMaterias.map((item, index) => (
                        <Paper 
                            key={index}
                            elevation={3} 
                            sx={{
                                padding: '15px',
                                marginBottom: index === horariosMaterias.length - 1 ? 0 : '-1px', // Remove margin from last item
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
                                }
                            }}
                        >
                            <Typography variant="h6" sx={{ color: '#015495', fontWeight: 'bold',  fontFamily: 'Open Sans' }}>
                                {item.horario}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'black',  fontFamily: 'Open Sans' }}>
                                {item.materia}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Box>

            

            {/* Seção de Notas */}
            <Box sx={{ backgroundColor: '#ab2325', width: '100%', padding: '40px 20px 20px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                    Notas dos Simulados
                </Typography>

                {/* Contêiner com scroll independente para a tabela */}
                <Box sx={{ width: '100%', 
                        maxWidth: '800px', 
                        maxHeight: '400px', 
                        borderRadius: '8px',
                        backgroundColor: 'white',
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {simulados.map((simulado) => (
                                <TableRow key={simulado.id}>
                                    <TableCell sx={{ fontFamily: 'Open Sans', fontSize: '16px' }}>{simulado.nome}</TableCell>
                                    <TableCell sx={{ fontFamily: 'Open Sans', fontSize: '16px' }}>{simulado.nota}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Box>
        </Box>
    );
}
