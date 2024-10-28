import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Box, Grid, Button, Paper, List, ListItem, Modal, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { NavBar } from '../common/navbar';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
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



export function GerenciaMateria() {

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
        if (!isAuthenticated || user.tipo !== 'gestor') {
        navigate('/login'); // Redireciona para a página de login ou outra página de acesso negado
        }
    }, [isAuthenticated, user, navigate]);

    const { materia } = useParams(); // Pegando o parâmetro da rota



    const [avisos, setAvisos] = useState([]);  // Estado para armazenar avisos da API
    const [modalNovoAviso, setModalNovoAviso] = useState(false); // Modal para novo aviso
    const [novoAviso, setNovoAviso] = useState({ titulo: '', conteudo: '' }); // Novo aviso
    const [openEditModal, setOpenEditModal] = useState(false);
    const [avisoSelecionado, setAvisoSelecionado] = useState(null);

    const [conteudos, setConteudos] = useState([]); // Estado para armazenar conteúdos da API
    const [modalNovoConteudo, setModalNovoConteudo] = useState(false);
    const [conteudoSelecionado, setConteudoSelecionado] = useState(null);
    const [openEditModalConteudo, setOpenEditModalConteudo] = useState(false);
    const [arquivoInput, setArquivoInput] = useState(null); // Para novo arquivo
    const [novosArquivos, setNovosArquivos] = useState([]); // Para armazenar novos arquivos
    const [novoConteudo, setNovoConteudo] = useState({ titulo: '', autor: '', descricao: '', arquivos: [] });

    const [aulas, setAulas] = useState([]);
    const [modalNovaAula, setModalNovaAula] = useState(false);
    const [aulaEmEdicao, setAulaEmEdicao] = useState(null);
    const [openEditModalAula, setOpenEditModalAula] = useState(false);
    const [novaAula, setNovaAula] = useState({ horarioInicio: '', horarioFim: '' });

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

    const fetchAulas = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
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
                    const horarioA = new Date(`1970-01-01T${a.horarioInicio}:00`); // Supondo que o horário esteja no formato HH:mm
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
                    materia: materia,
                })
            });
    
            if (response.ok) {
                // Supondo que o aviso é adicionado com sucesso, você pode atualizar a lista de avisos localmente
                fetchAvisos();
                handleNovoAvisoClose(); // Fecha o modal
            } else {
                console.error('Erro ao criar aviso:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

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
    };

    const handleSalvarEdicaoConteudo = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch(`http://127.0.0.1:5000/editar-conteudo/${conteudoSelecionado._id}`, {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo: conteudoSelecionado.titulo,
                    autor: conteudoSelecionado.autor,
                    descricao: conteudoSelecionado.descricao,
                    arquivos: conteudoSelecionado.arquivos
                })
            });
    
            if (response.ok) {
 
                await fetchConteudos();
                handleCloseEditModalConteudo();
                
            } else {
                console.error('Erro ao editar conteúdo:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    const handleCriarNovoConteudo = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch('http://127.0.0.1:5000/criar-conteudo', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo: novoConteudo.titulo,
                    autor: novoConteudo.autor,
                    descricao: novoConteudo.descricao,
                    arquivos: novosArquivos,
                    materia: materia,

                })
            });
    
            if (response.ok) {
                // Supondo que o aviso é adicionado com sucesso, você pode atualizar a lista de avisos localmente
                fetchConteudos();
                handleNovoConteudoClose(); // Fecha o modal
            } else {
                console.error('Erro ao criar conteúdo:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    const handleDeletarConteudo = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch(`http://127.0.0.1:5000/deletar-conteudo/${conteudoSelecionado._id}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                // Remover o aviso da lista localmente
                fetchConteudos();
                handleCloseEditModalConteudo();
            } else {
                console.error('Erro ao deletar conteudo:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    const handleNovoConteudoChange = (field, value) => {
        setNovoConteudo({ ...novoConteudo, [field]: value });
    };


    const handleRemoverArquivo = (arquivo) => {
        setConteudoSelecionado({
            ...conteudoSelecionado,
            arquivos: conteudoSelecionado.arquivos.filter((arq) => arq !== arquivo),
        });
    };

    const handleRemoverNovoArquivo = (arquivo) => {
        setNovosArquivos(novosArquivos.filter((arq) => arq !== arquivo));
    };

    const handleAdicionarNovoArquivo = () => {
        if (arquivoInput) {
            setNovosArquivos([...novosArquivos, arquivoInput]);
            setArquivoInput(null); // Limpar input após adicionar
        }
    };






    // Add new state for classes
    
    // Handlers for class management
    const handleNovaAulaOpen = () => {
        setModalNovaAula(true);
    };

    const handleNovaAulaClose = () => {
        setModalNovaAula(false);
        setAulaEmEdicao(null);
    };

    const handleOpenEditModalAula = (aula) => {
        setAulaEmEdicao({ ...aula });
        setOpenEditModalAula(true);
    };

    const handleCloseEditModalAula = () => {
        setOpenEditModalAula(false);
        setAulaEmEdicao(null);
    };

    const handleSalvarEdicaoAula = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch(`http://127.0.0.1:5000/editar-aula/${aulaEmEdicao._id}`, {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    horarioInicio: aulaEmEdicao.horarioInicio,
                    horarioFim: aulaEmEdicao.horarioFim,

                })
            });
    
            if (response.ok) {
 
                await fetchAulas();
                handleCloseEditModalAula();
                
            } else {
                console.error('Erro ao editar aula:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    const handleCriarNovaAula = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch('http://127.0.0.1:5000/criar-aula', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    horarioInicio: novaAula.horarioInicio,
                    horarioFim: novaAula.horarioFim,
                    materia: materia,

                })
            });
    
            if (response.ok) {
                // Supondo que o aviso é adicionado com sucesso, você pode atualizar a lista de avisos localmente
                fetchAulas();
                handleNovaAulaClose(); // Fecha o modal
            } else {
                console.error('Erro ao criar aula:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
        }
    };

    const handleDeletarAula = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Supondo que o token JWT está armazenado no localStorage
            const response = await fetch(`http://127.0.0.1:5000/deletar-aula/${aulaEmEdicao._id}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                // Remover o aviso da lista localmente
                fetchAulas();
                handleCloseEditModalAula();
            } else {
                console.error('Erro ao deletar conteudo:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
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
                            height: '400px', // Fixed height for scroll
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
                            height: '400px',
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
                            {conteudoSelecionado.arquivos.map((arquivo, index) => (
                                <Grid container key={index} alignItems="center" justifyContent="space-between" marginBottom='10px'>
                                    <Typography sx={{ fontFamily:'open sans', color:'black', flexGrow: 1 }}>{arquivo}</Typography>
                                    <Box sx={{ display: 'flex', gap: '10px' }}>
                                        <Button
                                            sx={{ backgroundColor: 'red', color: 'white'}}
                                            onClick={() => handleRemoverArquivo(arquivo)}
                                        >
                                            Remover
                                        </Button>
                                        <Button
                                            sx={{ backgroundColor: '#015495', color: 'white'}}
                                            onClick={() => window.open(`/caminho/para/o/arquivo/${arquivo}`, '_blank')} // Aqui você deve substituir pelo caminho correto
                                        >
                                            Baixar
                                        </Button>
                                    </Box>
                                </Grid>
                            ))}
                            {/* Adicionar novo arquivo */}

                           
                            {novosArquivos.map((novoArquivo, index) => (
                                <Grid container key={index} alignItems="center" justifyContent="space-between" marginBottom='10px'>
                                    <Typography>{novoArquivo}</Typography>
                                    <Button
                                        sx={{ backgroundColor: 'red', color: 'white' }}
                                        onClick={() => handleRemoverNovoArquivo(novoArquivo)}
                                    >
                                        Remover
                                    </Button>
                                </Grid>
                            ))}
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

                    
                    
                    {novosArquivos.map((novoArquivo, index) => (
                        <Grid container key={index} alignItems="center" justifyContent="space-between" marginBottom='10px'>
                            <Typography>{novoArquivo}</Typography>
                            <Button
                                sx={{ backgroundColor: 'red', color: 'white' }}
                                onClick={() => handleRemoverNovoArquivo(novoArquivo)}
                            >
                                Remover
                            </Button>
                        </Grid>
                    ))}
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
            </Modal>

            {/* Seção de Horários */}
            <Box sx={{ backgroundColor: 'white', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#015495', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                    Horários das Aulas
                </Typography>

                {/* Container de lista rolável */}
                <Box 
                    sx={{
                        width: '100%',
                        maxWidth: '600px',
                        height: '400px',
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
                        {aulas.map((aula) => (
                            <ListItem
                                key={aula.id}
                                sx={{ 
                                    marginBottom: '10px', 
                                    backgroundColor: 'white', 
                                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)', 
                                    padding: '15px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between' 
                                }}
                            >
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
                                        {aula.horarioInicio} - {aula.horarioFim}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    onClick={() => handleOpenEditModalAula(aula)}
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
                    onClick={handleNovaAulaOpen}
                >
                    Adicionar Horário
                    <AddIcon sx={{ marginLeft: '8px' }} />
                </CustomButton>
            </Box>

            {/* Modal para editar aula */}
            <Modal
                open={openEditModalAula}
                onClose={handleCloseEditModalAula}
                aria-labelledby="modal-editar-aula-titulo"
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
                    <Typography id="modal-editar-aula-titulo" variant="h6" component="h2" sx={{ color: 'black', fontWeight: 'bold' }}>
                        Editar Horário
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={6}>
                            <TextField
                                label="Horário de Início"
                                type="time"
                                fullWidth
                                value={aulaEmEdicao?.horarioInicio || ''}
                                onChange={(e) => setAulaEmEdicao({ ...aulaEmEdicao, horarioInicio: e.target.value })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 minutes
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Horário de Término"
                                type="time"
                                fullWidth
                                value={aulaEmEdicao?.horarioFim || ''}
                                onChange={(e) => setAulaEmEdicao({ ...aulaEmEdicao, horarioFim: e.target.value })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 minutes
                                }}
                            />
                        </Grid>
                    </Grid>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                        <Button onClick={handleSalvarEdicaoAula} variant="contained" sx={{ backgroundColor: 'green', color: 'white', fontFamily: 'Open Sans' }}>
                            Salvar
                        </Button>
                        <Button onClick={handleDeletarAula} variant="contained" sx={{ backgroundColor: '#ab2325', color: 'white', fontFamily: 'Open Sans' }}>
                            Excluir
                        </Button>
                        <Button onClick={handleCloseEditModalAula} variant="contained" sx={{ backgroundColor: '#015495', color: 'white', fontFamily: 'Open Sans' }}>
                            Fechar
                        </Button>
                        
                    </Box>
                </Box>
            </Modal>

            {/* Modal para adicionar nova aula */}
            <Modal
                open={modalNovaAula}
                onClose={handleNovaAulaClose}
                aria-labelledby="modal-nova-aula-titulo"
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
                    <Typography id="modal-nova-aula-titulo" variant="h6" component="h2" sx={{ color: 'black', fontWeight: 'bold' }}>
                        Adicionar Novo Horário
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={6}>
                            <TextField
                                label="Horário de Início"
                                type="time"
                                fullWidth
                                value={novaAula.horarioInicio || ''}
                                onChange={(e) => setNovaAula({ ...novaAula, horarioInicio: e.target.value })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 minutes
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Horário de Término"
                                type="time"
                                fullWidth
                                value={novaAula.horarioFim || ''}
                                onChange={(e) => setNovaAula({ ...novaAula, horarioFim: e.target.value })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 minutes
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={handleCriarNovaAula}
                        variant="contained"
                        sx={{ mt: 3, backgroundColor: 'green', color: 'white' }}
                    >
                        Adicionar
                    </Button>
                    <Button
                        onClick={handleNovaAulaClose}
                        variant="contained"
                        sx={{ mt: 3, backgroundColor: '#015495', color: 'white', marginLeft: '10px' }}
                    >
                        Fechar
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
