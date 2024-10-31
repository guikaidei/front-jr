import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Box, Grid, Button, Paper, List, ListItem, Modal, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '500px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
  };

export function VisualizaMateria() {

    const materiasFormatadas = {
        'matematica': 'Matemática',
        'portugues': 'Português',
        'humanas': 'Humanas',
        'naturais': 'Naturais',
    };

    const navigate = useNavigate();
    const { isAuthenticated, user } = useContext(AuthContext); // Pegando o status de autenticação e o tipo de usuário

    useEffect(() => {
        // Verifique se o usuário está autenticado e se o tipo de usuário é "gestor"
        if (!isAuthenticated || user.tipo !== 'aluno') {
        navigate('/login'); // Redireciona para a página de login ou outra página de acesso negado
        }
    }, [isAuthenticated, user, navigate]);

    const { materia } = useParams();
    const [avisos, setAvisos] = useState([]);
    const [conteudos, setConteudos] = useState([]);
    const [selectedAviso, setSelectedAviso] = useState(null);
    const [selectedConteudo, setSelectedConteudo] = useState(null);
    const [avisoModalOpen, setAvisoModalOpen] = useState(false);
    const [conteudoModalOpen, setConteudoModalOpen] = useState(false);

    const parseDate = (dateStr) => {
        const [dia, mes, ano] = dateStr.split('/'); // Divide a string em dia, mês e ano
        return new Date(`${ano}-${mes}-${dia}`); // Retorna um objeto Date no formato ISO
    };

    // Função para buscar avisos da API
    const fetchAvisos = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch(`http://127.0.0.1:5000/listar-avisos/${materia}`, {
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

    // Função para buscar conteúdos da API
    const fetchConteudos = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch(`http://127.0.0.1:5000/listar-conteudos/${materia}`, {
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
                const conteudosOrdenados = data.conteudos.sort((a, b) => parseDate(b.data) - parseDate(a.data));
            
                setConteudos(conteudosOrdenados);  // Armazena os avisos ordenados no estado
            } else {
                console.error('Erro ao buscar conteudos:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    useEffect(() => {
        fetchAvisos();  // Chamada à função para carregar os avisos
        fetchConteudos();  // Chamada à função para carregar os conteúdos
    }, []); // Executa apenas uma vez na montagem do componente

    const handleOpenAvisoModal = (aviso) => { setSelectedAviso(aviso); setAvisoModalOpen(true); };
    const handleCloseAvisoModal = () => { setAvisoModalOpen(false); setSelectedAviso(null); };
    const handleOpenConteudoModal = (conteudo) => { setSelectedConteudo(conteudo); setConteudoModalOpen(true); };
    const handleCloseConteudoModal = () => { setConteudoModalOpen(false); setSelectedConteudo(null); };


    // Função para baixar um arquivo
    const handleBaixarArquivo = async (fileId) => {
    try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`http://127.0.0.1:5000/baixar-arquivo/${fileId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao baixar o arquivo');
        }

        const data = await response.json();
        const { filename, content } = data;

        // Converte Base64 para Blob e inicia o download
        const byteCharacters = atob(content);
        const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray]);
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Erro ao baixar o arquivo:', error);
    }
};
    return (
        <Box sx={{ paddingTop: '80px', fontFamily: 'Open Sans' }}>
            <NavBar />

            <Button onClick={() => {navigate('/home-gestor')}}>
                <ArrowBackIosNewIcon />
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px' }}>
                <Typography variant="h3" gutterBottom sx={{ color: '#ab2325', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                        {materiasFormatadas[materia]}
                </Typography>
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
                    Avisos
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
                                    onClick={() => handleOpenAvisoModal(aviso)}
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
                                    
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}

                {/* Modal Aviso */}
                <Modal open={avisoModalOpen} onClose={handleCloseAvisoModal}>
                    <Box sx={modalStyle}>
                        {selectedAviso && (
                        <>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: 'black', fontFamily: 'Open sans' }}>
                            {selectedAviso.titulo}
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '10px', color: 'black', fontFamily: 'Open sans' }}>
                            {selectedAviso.conteudo}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ marginBottom: '5px', color: 'black', fontFamily: 'Open sans' }}>
                            Matéria: {materiasFormatadas[selectedAviso.materia]}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ marginBottom: '5px', color: 'black', fontFamily: 'Open sans' }}>
                            Autor: {selectedAviso.autor}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#015495', fontWeight: 'bold', fontFamily: 'Open sans' }}>
                            {selectedAviso.data}
                            </Typography>
                        </>
                        )}

                        {/* Box adicional para centralizar o botão na parte inferior */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#015495', color: 'white', fontFamily: 'Open sans' }}
                            onClick={handleCloseAvisoModal}
                        >
                            Fechar
                        </Button>
                        </Box>
                    </Box> 
                </Modal>

                

                
            </Box>

            
            {/* Seção de Conteúdos */}
            <Box sx={{ backgroundColor: '#ab2325', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Open sans' }}>
                    Conteúdos
                </Typography>

                {conteudos.length === 0 ? (
                    <Typography sx={{ color: 'white', fontFamily: 'Open Sans', fontSize: '18px', marginTop: '20px' }}>
                        Nenhum conteúdo encontrado
                    </Typography>
                ) : (
                    <Box 
                        sx={{
                            width: '100%',
                            maxWidth: '600px',
                            maxHeight: '400px',
                            overflow: 'auto',
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#015495',
                                borderRadius: '4px',
                            },
                        }}
                    >
                    <List sx={{ backgroundColor: '#ffffff', borderRadius: '0px', width: '100%', paddingRight: '10px' }}>
                        {conteudos.map((conteudo, index) => (
                            <ListItem
                                key={index}
                                sx={{ marginBottom: '10px', backgroundColor: 'white', boxShadow: '0px 2px 4px rgba(0,0,0,0.1)', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                onClick={() => handleOpenConteudoModal(conteudo)}
                            >
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
                                        {conteudo.titulo}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 300 }}>
                                        Autor: {conteudo.autor}
                                    </Typography>
                                </Box>
                                
                            </ListItem>
                        ))}
                    </List>
                </Box>
                )}

            </Box>

            {/* Conteudo Modal */}
            <Modal open={conteudoModalOpen} onClose={handleCloseConteudoModal}>
                    <Box sx={modalStyle}>
                        {selectedConteudo && (
                        <>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: 'black', fontFamily: 'Open sans' }}>
                            {selectedConteudo.titulo}
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '10px', color: 'black', fontFamily: 'Open sans' }}>
                            {selectedConteudo.descricao}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ marginBottom: '5px', color: 'black', fontFamily: 'Open sans' }}>
                            Matéria: {materiasFormatadas[selectedConteudo.materia]}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ marginBottom: '5px', color: 'black', fontFamily: 'Open sans' }}>
                            Autor: {selectedConteudo.autor}
                            </Typography>

                            {selectedConteudo.arquivos.map((arquivo) => (
                                    <Button
                                        key={arquivo.fileId}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleBaixarArquivo(arquivo.id)}
                                        sx={{ marginBottom: '10px' }}
                                    >
                                        Baixar {arquivo.filename}
                                    </Button>
                                ))}
                        
                        </>
                        )}

                        {/* Box adicional para centralizar o botão na parte inferior */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#015495', color: 'white', fontFamily: 'Open sans' }}
                            onClick={handleCloseConteudoModal}
                        >
                            Fechar
                        </Button>
                        </Box>
                    </Box> 
                </Modal>
        </Box>
    );
}
