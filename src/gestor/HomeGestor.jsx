import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Button, Paper, List, ListItem, Modal, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { NavBar } from '../common/navbar';
import { AuthContext } from '../context/AuthContext';

const MateriaBox = styled(Paper)(({ theme }) => ({
    padding: '30px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '250px', // Altura mínima para todas as telas
    [theme.breakpoints.up('md')]: {
        minHeight: '400px', // Altura mínima em telas médias e grandes
        justifyContent: 'center',
    },
}));


// Componente estilizado para as imagens das matérias
const MateriaImage = styled('img')({
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
});



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


const OptionBox = styled(Paper)(({ theme }) => ({
    padding: '30px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '150px',
    [theme.breakpoints.down('sm')]: {
        display: 'none', // Oculta o componente em telas menores
    },
}));

const OptionButton = styled(Button)(({ theme }) => ({
    width: '100%',
    maxWidth: '300px',
    height: '80px',
    backgroundColor: 'white',
    color: 'black',
    fontSize: '18px',
    fontWeight: 'bold',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        backgroundColor: '#f5f5f5',
    },
    fontFamily: 'Open Sans',
    margin: '0 auto', // Centraliza o botão horizontalmente
    [theme.breakpoints.up('md')]: {
        display: 'none', // Oculta o botão em telas maiores
    },
}));

export function HomeGestor() {
    const navigate = useNavigate();
    const [modalNovoAviso, setModalNovoAviso] = useState(false); // Modal para novo aviso
    const [novoAviso, setNovoAviso] = useState({ titulo: '', conteudo: '' }); // Novo aviso
    const [openEditModal, setOpenEditModal] = useState(false);
    const [avisoSelecionado, setAvisoSelecionado] = useState(null);
    const [avisos, setAvisos] = useState([]);  // Estado para armazenar avisos da API
    const { isAuthenticated, user } = useContext(AuthContext); // Pegando o status de autenticação e o tipo de usuário

    useEffect(() => {
        // Verifique se o usuário está autenticado e se o tipo de usuário é "gestor"
        if (!isAuthenticated || user.tipo !== 'gestor') {
        navigate('/login'); // Redireciona para a página de login ou outra página de acesso negado
        }
    }, [isAuthenticated, user, navigate]);

    // Lista de matérias com rotas associadas
    const materias = [
        { nome: 'Matemática', rota: 'matematica' },
        { nome: 'Português', rota: 'portugues' },
        { nome: 'Humanas', rota: 'humanas' },
        { nome: 'Naturais', rota: 'naturais' },
    ];

    // Dicionário para formatar as matérias
    const materiasFormatadas = {
        'matematica': 'Matemática',
        'portugues': 'Português',
        'humanas': 'Humanas',
        'naturais': 'Naturais',
    };

    // Dicionário para associar imagens às matérias
    const imagensMaterias = {
        'matematica': '/assets/foto_matematica.jpg',
        'portugues': '/assets/foto_portugues.jpg',
        'humanas': '/assets/foto_humanas.jpg',
        'naturais': '/assets/foto_biologia.jpg',
    };

    // Lista de matérias do gestor
    const materiasGestor = ['matematica', 'portugues', 'humanas', 'naturais'];

    const options = [
        { label: 'Alunos', path: '/usuarios/alunos' },
        { label: 'Professores', path: '/usuarios/professores' },
        { label: 'Gestores', path: '/usuarios/gestores' },
    ];

    // Função para converter a data no formato brasileiro
    const parseDate = (dateStr) => {
        const [dia, mes, ano] = dateStr.split('/'); // Divide a string em dia, mês e ano
        return new Date(`${ano}-${mes}-${dia}`); // Retorna um objeto Date no formato ISO
    };

    // Função para buscar avisos da API
    const fetchAvisos = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch('http://127.0.0.1:5000/home-gestor', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                    'Aceess-Control-Allow-Credentials': 'true',
                    'Acess-Control-Max-Age': '86400',
                    
                },
            });
            if (response.ok) {
                const data = await response.json();
                const avisosOrdenados = data.avisos.sort((a, b) => parseDate(b.data) - parseDate(a.data));
            
                setAvisos(avisosOrdenados);  // Armazena os avisos ordenados no estado
            } else {
                console.error('Erro ao buscar avisos:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    useEffect(() => {
        fetchAvisos();  // Chamada à função para carregar os avisos
    }, []); // Executa apenas uma vez na montagem do componente

    const handleMateriaClick = (materia) => {
        // Navega para a página de notas com a matrícula como parâmetro na URL
        navigate(`/gestor/gerencia-materia/${materia}`);
    };

    const handleNovoAvisoOpen = () => {
        setModalNovoAviso(true);
    };

    // Função para criar um novo aviso
    const handleCriarNovoAviso = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch('http://127.0.0.1:5000/criar-aviso', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo: novoAviso.titulo,
                    conteudo: novoAviso.conteudo,
                    materia: 'geral'
                })
            });
    
            if (response.ok) {
                fetchAvisos();
                handleNovoAvisoClose(); // Fecha o modal
            } else {
                console.error('Erro ao criar aviso:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    const handleNovoAvisoClose = () => {
        setModalNovoAviso(false);
        setNovoAviso({ titulo: '', conteudo: '' }); // Limpa os campos de novo aviso
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
    const handleSalvarEdicao = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch(`http://127.0.0.1:5000/editar-aviso/${avisoSelecionado._id}`, {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo: avisoSelecionado.titulo,
                    conteudo: avisoSelecionado.conteudo
                })
            });
    
            if (response.ok) {
 
                await fetchAvisos();
                handleCloseEditModal();
                
            } else {
                console.error('Erro ao editar aviso:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    // Função para deletar um aviso
    const handleDeletarAviso = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch(`http://127.0.0.1:5000/deletar-aviso/${avisoSelecionado._id}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                // Remover o aviso da lista localmente
                setAvisos(avisos.filter((aviso) => aviso._id !== avisoSelecionado._id));
                handleCloseEditModal();
            } else {
                console.error('Erro ao deletar aviso:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };
    

    return (

        isAuthenticated && user.tipo === 'gestor' && (
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
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: '#ab2325', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                    Usuários
                </Typography>

                <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: '1200px' }}>
                    {options.map((option, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} sx={{ textAlign: 'center' }}>
                            {/* Caixas em telas maiores */}
                            <OptionBox onClick={() => navigate(option.path)}>
                                <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold', fontFamily: 'Open Sans', marginTop: '15px' }}>
                                    {option.label}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666', fontFamily: 'Open Sans', marginTop: '10px' }}>
                                    Clique para acessar a seção de {option.label}.
                                </Typography>
                            </OptionBox>

                            {/* Botões em telas menores */}
                            <OptionButton onClick={() => navigate(option.path)}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {option.label}
                            </OptionButton>
                        </Grid>
                    ))}
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

                <Typography 
                    variant="h4" 
                    gutterBottom 
                    sx={{ 
                        color: 'white', 
                        fontWeight: 'bold', 
                        marginBottom: '30px', 
                        fontFamily: 'Open Sans',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                    }}
                >
                    Matérias
                </Typography>

                <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: '1200px' }}>
                    {materiasGestor.map((materia, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <MateriaBox onClick={() => handleMateriaClick(materia)}>
                                <MateriaImage src={imagensMaterias[materia]} alt={materiasFormatadas[materia]} />
                                <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold', fontFamily: 'Open Sans', marginTop: '15px' }}>
                                    {materiasFormatadas[materia]}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666', fontFamily: 'Open Sans', marginTop: '10px' }}>
                                    Clique para acessar o conteúdo de {materiasFormatadas[materia]}.
                                </Typography>
                            </MateriaBox>
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
                
                {/* Verificação se a lista de avisos está vazia */}
                {avisos.length === 0 ? (
                    <Typography sx={{ color: '#666', fontFamily: 'Open Sans', fontSize: '18px', marginTop: '20px' }}>
                        Nenhum aviso encontrado
                    </Typography>
                ) : (
                    <Box 
                        sx={{
                            width: '100%',
                            maxWidth: '600px',
                            maxHeight: '400px', // Fixed height for scroll
                            overflow: 'auto', // Enable scroll
                            '&::-webkit-scrollbar': { width: '8px' },
                            '&::-webkit-scrollbar-track': { background: '#f1f1f1', borderRadius: '4px' },
                            '&::-webkit-scrollbar-thumb': { background: '#015495', borderRadius: '4px' },
                            '&::-webkit-scrollbar-thumb:hover': { background: '#013d6b' },
                        }}
                    >
                        <List sx={{ backgroundColor: '#ffffff', borderRadius: '0px', width: '100%', paddingRight: '10px' }}>
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
                                            Matéria: {aviso.materia.charAt(0).toUpperCase() + aviso.materia.slice(1)}
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 300, fontFamily: 'Open Sans' }}>
                                            Autor: {aviso.autor}
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ color: '#015495', fontWeight: 500, fontFamily: 'Open Sans', marginTop: '5px' }}>
                                            {aviso.data}
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
                )}

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
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                <Button onClick={handleSalvarEdicao} variant="contained" sx={{ backgroundColor: 'green', color: 'white', fontFamily: 'Open Sans' }}>
                                    Salvar
                                </Button>
                                <Button onClick={handleDeletarAviso} variant="contained" sx={{ backgroundColor: '#ab2325', color: 'white', fontFamily: 'Open Sans' }}>
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
                        onClick={handleCriarNovoAviso}
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
          )

    );
}
