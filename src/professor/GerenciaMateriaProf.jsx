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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export function GerenciaMateriaProf() {

    // Dicionário para formatar as matérias
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
        if (!isAuthenticated || user.tipo !== 'professor') {
        navigate('/login'); // Redireciona para a página de login ou outra página de acesso negado
        }
    }, [isAuthenticated, user, navigate]);

    const { materia } = useParams(); // Pegando o parâmetro da rota
    const [avisos, setAvisos] = useState([]);  // Estado para armazenar avisos da API
    const [modalNovoAviso, setModalNovoAviso] = useState(false); // Modal para novo aviso
    const [novoAviso, setNovoAviso] = useState({ titulo: '', conteudo: '' }); // Novo aviso
    const [openEditModal, setOpenEditModal] = useState(false); // Modal para editar aviso
    const [avisoSelecionado, setAvisoSelecionado] = useState(null); // Aviso selecionado

    const [conteudos, setConteudos] = useState([]); // Estado para armazenar conteúdos da API
    const [modalNovoConteudo, setModalNovoConteudo] = useState(false); // Modal para novo conteúdo
    const [conteudoSelecionado, setConteudoSelecionado] = useState(null); // Conteúdo selecionado 
    const [openEditModalConteudo, setOpenEditModalConteudo] = useState(false); // Modal para editar conteúdo
    const [novosArquivos, setNovosArquivos] = useState([]); // Para armazenar novos arquivos
    const [novoConteudo, setNovoConteudo] = useState({ titulo: '', autor: '', descricao: '', arquivos: [] });
    const [arquivosParaDelete, setArquivosParaDelete] = useState([]); // Para armazenar arquivos a serem deletados

    // Função para converter a data no formato brasileiro para o formato ISO
    const parseDate = (dateStr) => {
        const [dia, mes, ano] = dateStr.split('/'); // Divide a string em dia, mês e ano
        return new Date(`${ano}-${mes}-${dia}`); // Retorna um objeto Date no formato ISO
    };

    // Função para buscar avisos da API
    const fetchAvisos = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); 
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
            const token = localStorage.getItem('jwtToken');
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

    // Função para buscar aulas da API
    const fetchAulas = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); 
            const response = await fetch(`http://127.0.0.1:5000/listar-aulas/${materia}`, {
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
            
                // Ordenar as aulas pelo horário de início
                const aulasOrdenadas = data.aulas.sort((a, b) => {
                    const horarioA = new Date(`1970-01-01T${a.horarioInicio}:00`);
                    const horarioB = new Date(`1970-01-01T${b.horarioInicio}:00`);
                    return horarioA - horarioB; // Ordena em ordem crescente
                });

                setAulas(aulasOrdenadas);  // Armazena as aulas ordenadas no estado
            } else {
                console.error('Erro ao buscar aulas:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };



    useEffect(() => {
        fetchAvisos();  // Chamada à função para carregar os avisos
        fetchConteudos();  // Chamada à função para carregar os conteúdos
        fetchAulas();  // Chamada à função para carregar as aulas
    }, []); // Executa apenas uma vez na montagem do componente


    const handleNovoAvisoOpen = () => {
        setModalNovoAviso(true);
    };

    const handleNovoAvisoClose = () => {
        setNovoAviso({ titulo: '', conteudo: '' });
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
    const handleSalvarEdicao = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); 
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

    // Função para criar um novo aviso
    const handleCriarNovoAviso = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); 
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
                    materia: materia,
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

    // Função para deletar um aviso
    const handleDeletarAviso = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); 
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
                fetchAvisos();
                handleCloseEditModal();
            } else {
                console.error('Erro ao deletar aviso:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    // Handlers para modal de novo conteúdo
    const handleNovoConteudoOpen = () => {
        setModalNovoConteudo(true);
    };

    const handleNovoConteudoClose = () => {
        setModalNovoConteudo(false);
        setNovoConteudo({ titulo: '', autor: '', descricao: '', arquivos: [] });
        setNovosArquivos([]); // Limpar novos arquivos ao fechar
    };

    // Handlers para modal de edição de conteúdo
    const handleOpenEditModalConteudo = (conteudo) => {
        setConteudoSelecionado({ ...conteudo });
        setOpenEditModalConteudo(true);
    };

    const handleCloseEditModalConteudo = () => {
        setOpenEditModalConteudo(false);
        setConteudoSelecionado(null);
        setNovosArquivos([]); // Limpar novos arquivos ao fechar
        setArquivosParaDelete([]); // Limpar arquivos para deletar ao fechar
    }; 

    // Função para salvar as edições de conteúdo
    const handleSalvarEdicaoConteudo = async () => {
        try {
            const fd = new FormData();
            
            // Adiciona os campos básicos
            fd.append('titulo', conteudoSelecionado.titulo);
            fd.append('descricao', conteudoSelecionado.descricao);
            
            // Adiciona os novos arquivos, se houver
            if (novosArquivos && novosArquivos.length > 0) {
                for (let i = 0; i < novosArquivos.length; i++) {
                    fd.append('arquivos', novosArquivos[i]);
                }
            }
            
            // Adiciona a lista de arquivos existentes, se houver
            if (conteudoSelecionado.arquivos && conteudoSelecionado.arquivos.length > 0) {
                for (let i = 0; i < conteudoSelecionado.arquivos.length; i++) {
                    fd.append('arquivosExistentes', conteudoSelecionado.arquivos[i].id);
                    console.log(fd);
                }
            }
    
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`http://127.0.0.1:5000/editar-conteudo/${conteudoSelecionado._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: fd
            });
    
            if (response.ok) {
                if (arquivosParaDelete && arquivosParaDelete.length > 0) {
                    for (let i = 0; i < arquivosParaDelete.length; i++) {
                        await handleDeletarArquivo(arquivosParaDelete[i].id);
                    }
                }
                await fetchConteudos();
                handleCloseEditModalConteudo();
            } else {
                const errorData = await response.json();
                console.error('Erro ao editar conteúdo:', errorData.message);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    // Função para criar um novo conteúdo
    const handleCriarNovoConteudo = async () => {
        try {
            const fd = new FormData();
            for (let i = 0; i < novosArquivos.length; i++) {
                fd.append('arquivos', novosArquivos[i]);
            }
    
            fd.append('titulo', novoConteudo.titulo);
            fd.append('autor', novoConteudo.autor);
            fd.append('descricao', novoConteudo.descricao);
            fd.append('materia', materia);
    
            const token = localStorage.getItem('jwtToken'); 
            const response = await fetch('http://127.0.0.1:5000/criar-conteudo', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: fd // Agora o body é o FormData diretamente
            });
    
            if (response.ok) {
                fetchConteudos();
                handleNovoConteudoClose(); // Fecha o modal
            } else {
                console.error('Erro ao criar conteúdo:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };
    
    // Função para deletar um conteúdo
    const handleDeletarConteudo = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); 
            const response = await fetch(`http://127.0.0.1:5000/deletar-conteudo/${conteudoSelecionado._id}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                
                fetchConteudos();
                handleCloseEditModalConteudo();
                
            } else {
                console.error('Erro ao deletar conteudo:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    // Função para deletar um arquivo
    const handleNovoConteudoChange = (field, value) => {
        setNovoConteudo({ ...novoConteudo, [field]: value });
    };

    // Função para deletar um arquivo
    const handleDeletarArquivo = async (id) => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`http://127.0.0.1:5000/deletar-arquivo/${id}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Remover o arquivo da lista localmente
                setConteudoSelecionado({
                    ...conteudoSelecionado,
                    arquivos: conteudoSelecionado.arquivos.filter((arq) => arq.id !== id),
                });
            } else {
                console.error('Erro ao deletar arquivo:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

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

    // Função para manipular o upload de novos arquivos
    const handleNovoArquivoUpload = (e) => {
        const arquivosSelecionados = Array.from(e.target.files); // Converte FileList para Array
        setNovosArquivos((prevArquivos) => [...prevArquivos, ...arquivosSelecionados]);
    };

    const handleRemoverArquivoExistente = (arquivo) => {
        setArquivosParaDelete([...arquivosParaDelete, arquivo]);
        setConteudoSelecionado({
            ...conteudoSelecionado,
            arquivos: conteudoSelecionado.arquivos.filter((arq) => arq !== arquivo),
        });
    };

    return (
        <Box sx={{ paddingTop: '80px', fontFamily: 'Open Sans' }}>
            <NavBar />

            <Button onClick={() => {navigate('/home-professor')}}>
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

            {/* Seção de Conteúdos */}
            <Box sx={{ backgroundColor: '#ab2325', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
                            >
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
                                        {conteudo.titulo}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 300 }}>
                                        Autor: {conteudo.autor}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    onClick={() => handleOpenEditModalConteudo(conteudo)}
                                    sx={{ backgroundColor: '#015495', color: 'white', marginLeft: '10px' }}
                                >
                                    Editar
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                )}

                {/* Botão para adicionar novo conteúdo */}
                <CustomButton variant="contained" color="primary" onClick={handleNovoConteudoOpen}>
                    Adicionar Conteúdo
                    <AddIcon sx={{ marginLeft: '8px' }} />
                </CustomButton>
            </Box>
                

            {/* Modal para editar conteúdo */}
            <Modal
                open={openEditModalConteudo}
                onClose={handleCloseEditModalConteudo}
                aria-labelledby="modal-editar-conteudo-titulo"
                aria-describedby="modal-editar-conteudo"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '20px',
                        boxShadow: 24,
                    }}
                >
                    {conteudoSelecionado && (
                        <div>
                            <Typography id="modal-editar-conteudo-titulo" variant="h6" component="h2" sx={{ color: 'black', fontWeight: 'bold' }}>
                                Editar Conteúdo
                            </Typography>
                            <TextField
                                label="Título"
                                fullWidth
                                margin="normal"
                                value={conteudoSelecionado.titulo}
                                onChange={(e) =>
                                    setConteudoSelecionado({ ...conteudoSelecionado, titulo: e.target.value })
                                }
                            />
                            <TextField
                                label="Autor"
                                fullWidth
                                margin="normal"
                                value={conteudoSelecionado.autor}
                                onChange={(e) =>
                                    setConteudoSelecionado({ ...conteudoSelecionado, autor: e.target.value })
                                }
                            />
                            <TextField
                                label="Descrição"
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                                value={conteudoSelecionado.descricao}
                                onChange={(e) =>
                                    setConteudoSelecionado({ ...conteudoSelecionado, descricao: e.target.value })
                                }
                            />

                            <Typography variant="h6" sx={{ marginTop: '10px', fontWeight: 'bold', fontFamily: 'Open sans', color:'black' }}>
                                Arquivos
                            </Typography>
                            {conteudoSelecionado.arquivos && conteudoSelecionado.arquivos.map((arquivo, index) => (
                                <Grid container key={index} alignItems="center" justifyContent="space-between" marginBottom='10px'>
                                    <Typography sx={{ fontFamily:'open sans', color:'black', flexGrow: 1 }}>{arquivo.filename}</Typography>
                                    <Box sx={{ display: 'flex', gap: '10px' }}>
                                        <Button
                                            sx={{ backgroundColor: 'red', color: 'white'}}
                                            onClick={() => handleRemoverArquivoExistente(arquivo)}
                                        >
                                            Remover
                                        </Button>
                                        <Button
                                            sx={{ backgroundColor: '#015495', color: 'white'}}
                                            onClick={() => handleBaixarArquivo(arquivo.id)}
                                        >
                                            Baixar
                                        </Button>
                                    </Box>
                                </Grid>
                            ))}

                            {/* Upload de novos arquivos */}

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                {/* Input de arquivo personalizado */}
                                <input
                                    type="file"
                                    id="upload-input"
                                    style={{ display: 'none' }} // Oculta o input original
                                    multiple
                                    onChange={(e) => handleNovoArquivoUpload(e)}
                                />
                                
                                <Button
                                    onClick={() => document.getElementById('upload-input').click()}
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#015495', // Azul personalizado
                                        color: 'white',
                                        mt: 3,
                                        width: 150,
                                        height: 40,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 1,
                                    }}
                                    startIcon={<CloudUploadIcon />} // Ícone de upload
                                >
                                    Arquivos
                                </Button>

                                
                            </Box>
                            {/* Exibe os nomes dos arquivos selecionados */}
                            {novosArquivos.length > 0 && (
                                    <Typography sx={{ color: 'black', fontSize: '10px' }}>
                                        {novosArquivos.map((file) => file.name).join(', ')}
                                    </Typography>
                                )}


                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                <Button onClick={handleSalvarEdicaoConteudo} variant="contained" sx={{ backgroundColor: 'green', color: 'white', fontFamily: 'Open Sans' }}>
                                    Salvar
                                </Button>
                                <Button onClick={handleDeletarConteudo} variant="contained" sx={{ backgroundColor: '#ab2325', color: 'white', fontFamily: 'Open Sans' }}>
                                    Excluir
                                </Button>
                                <Button onClick={handleCloseEditModalConteudo} variant="contained" sx={{ backgroundColor: '#015495', color: 'white', fontFamily: 'Open Sans' }}>
                                    Fechar
                                </Button>
                            </Box>
                        </div>
                    )}
                </Box>
            </Modal>


            {/* Modal para adicionar novo conteúdo */}
            <Modal
                open={modalNovoConteudo}
                onClose={handleNovoConteudoClose}
                aria-labelledby="modal-novo-conteudo-titulo"
                aria-describedby="modal-novo-conteudo"
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
                    <Typography id="modal-novo-conteudo-titulo" variant="h6" component="h2" sx={{ color: 'black', fontWeight: 'bold', fontFamily:'Open sans' }}>
                        Adicionar Novo Conteúdo
                    </Typography>
                    <TextField
                        label="Título"
                        fullWidth
                        margin="normal"
                        value={novoConteudo.titulo}
                        onChange={ (e) => handleNovoConteudoChange('titulo', e.target.value)
                        }
                    />
                    <TextField
                        label="Descrição"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        value={novoConteudo.descricao}
                        onChange={(e) =>handleNovoConteudoChange('descricao', e.target.value)}
                    />


                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* Input de arquivo personalizado */}
                        <input
                            type="file"
                            id="upload-input"
                            style={{ display: 'none' }} // Oculta o input original
                            multiple
                            onChange={(e) => setNovosArquivos([...e.target.files])}
                        />
                        
                        <Button
                            onClick={() => document.getElementById('upload-input').click()}
                            variant="contained"
                            sx={{
                                backgroundColor: '#015495', // Azul personalizado
                                color: 'white',
                                mt: 3,
                                width: 150,
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                            }}
                            startIcon={<CloudUploadIcon />} // Ícone de upload
                        >
                            Arquivos
                        </Button>

                        
                    </Box>
                    {/* Exibe os nomes dos arquivos selecionados */}
                    {novosArquivos.length > 0 && (
                            <Typography sx={{ color: 'black', fontSize: '10px' }}>
                                {novosArquivos.map((file) => file.name).join(', ')}
                            </Typography>
                        )}

                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                        <Button
                            onClick={handleCriarNovoConteudo}
                            variant="contained"
                            sx={{ mt: 3, backgroundColor: 'green', color: 'white' }}
                        >
                            Adicionar
                        </Button>
                        <Button
                            onClick={handleNovoConteudoClose}
                            variant="contained"
                            sx={{ mt: 3, backgroundColor: '#015495', color: 'white', marginLeft: '10px' }}
                        >
                            Fechar
                        </Button>  
                    </Box>
                    
                </Box>
            </Modal>

        
        </Box>
    );
}
