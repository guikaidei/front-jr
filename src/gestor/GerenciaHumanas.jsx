import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Button, Paper, List, ListItem, Modal, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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



export function GerenciaHumanas() {

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

    // Lista de conteúdos
    const [conteudos, setConteudos] = useState([
        {
            titulo: 'Introdução ao Cálculo',
            autor: 'Professor Silva',
            descricao: 'Esse é o conteúdo inicial sobre limites e derivadas...',
            arquivos: ['arquivo1.pdf', 'arquivo2.pdf'],
        },
        {
            titulo: 'Introdução ao Cálculo',
            autor: 'Professor Silva',
            descricao: 'Esse é o conteúdo inicial sobre limites e derivadas...',
            arquivos: ['arquivo1.pdf', 'arquivo2.pdf'],
        },
        {
            titulo: 'Introdução ao Cálculo',
            autor: 'Professor Silva',
            descricao: 'Esse é o conteúdo inicial sobre limites e derivadas...',
            arquivos: ['arquivo1.pdf', 'arquivo2.pdf'],
        },
        {
            titulo: 'Introdução ao Cálculo',
            autor: 'Professor Silva',
            descricao: 'Esse é o conteúdo inicial sobre limites e derivadas...',
            arquivos: ['arquivo1.pdf', 'arquivo2.pdf'],
        },

        {
            titulo: 'Equações Diferenciais',
            autor: 'Professor Lima',
            descricao: 'Nesse módulo estudaremos as equações diferenciais ordinárias...',
            arquivos: [],
        },
    ]);

    const navigate = useNavigate();
    const [modalNovoAviso, setModalNovoAviso] = useState(false); // Modal para novo aviso
    const [novoAviso, setNovoAviso] = useState({ titulo: '', conteudo: '' }); // Novo aviso
    const [openEditModal, setOpenEditModal] = useState(false);
    const [avisoSelecionado, setAvisoSelecionado] = useState(null);
    const [modalNovoConteudo, setModalNovoConteudo] = useState(false);
    const [conteudoSelecionado, setConteudoSelecionado] = useState(null);
    const [openEditModalConteudo, setOpenEditModalConteudo] = useState(false);
    const [arquivoInput, setArquivoInput] = useState(null); // Para novo arquivo
    const [novosArquivos, setNovosArquivos] = useState([]); // Para armazenar novos arquivos


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

    // Handlers para modal de novo conteúdo
    const handleNovoConteudoOpen = () => {
        setModalNovoConteudo(true);
    };

    const handleNovoConteudoClose = () => {
        setModalNovoConteudo(false);
        setNovosArquivos([]); // Limpar arquivos ao fechar
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

    const handleSalvarEdicaoConteudo = () => {
        const novosConteudos = conteudos.map((conteudo) =>
            conteudo.titulo === conteudoSelecionado.titulo
                ? { ...conteudoSelecionado, arquivos: [...conteudoSelecionado.arquivos, ...novosArquivos] }
                : conteudo
        );
        setConteudos(novosConteudos);
        handleCloseEditModal();
    };

    const handleAdicionarConteudo = () => {
        setConteudos([...conteudos, { ...conteudoSelecionado, arquivos: [...novosArquivos] }]);
        handleNovoConteudoClose();
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
    const [aulas, setAulas] = useState([
        { id: 1, horarioInicio: "08:00", horarioFim: "09:30" },
        { id: 2, horarioInicio: "10:00", horarioFim: "11:30" },
        { id: 3, horarioInicio: "14:00", horarioFim: "15:30" },
        { id: 4, horarioInicio: "16:00", horarioFim: "17:30" },
    ]);
    const [modalNovaAula, setModalNovaAula] = useState(false);
    const [aulaEmEdicao, setAulaEmEdicao] = useState(null);
    const [openEditModalAula, setOpenEditModalAula] = useState(false);
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

    const handleSalvarEdicaoAula = () => {
        const novasAulas = aulas.map((aula) =>
            aula.id === aulaEmEdicao.id ? aulaEmEdicao : aula
        );
        setAulas(novasAulas);
        handleCloseEditModalAula();
    };

    const handleAdicionarAula = () => {
        if (aulaEmEdicao?.horarioInicio && aulaEmEdicao?.horarioFim) {
            const novaAula = {
                id: aulas.length + 1,
                horarioInicio: aulaEmEdicao.horarioInicio,
                horarioFim: aulaEmEdicao.horarioFim,
            };
            setAulas([...aulas, novaAula]);
            handleNovaAulaClose();
        }
    };

    const handleDeletarAula = (aulaId) => {
        setAulas(aulas.filter(aula => aula.id !== aulaId));
        handleCloseEditModalAula();
    };

    return (
        <Box sx={{ paddingTop: '80px', fontFamily: 'Open Sans' }}>
            <NavBar />

            <Button onClick={() => {navigate('/home-gestor')}}>
                <ArrowBackIosNewIcon />
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px' }}>
                <Typography variant="h3" gutterBottom sx={{ color: '#ab2325', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                        Humanas
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

            {/* Seção de Conteúdos */}
            <Box sx={{ backgroundColor: '#ab2325', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Open sans' }}>
                    Conteúdos
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
                            <Button
                                variant="contained"
                                sx={{ mt: 3, backgroundColor: 'green', color: 'white' }}
                                onClick={handleSalvarEdicao}
                            >
                                Salvar
                            </Button>
                            <Button
                                onClick={handleCloseEditModalConteudo}
                                variant="contained"
                                sx={{ mt: 3, backgroundColor: '#015495', color: 'white', marginLeft: '10px' }}
                            >
                                Fechar
                            </Button>
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
                    <Typography id="modal-novo-conteudo-titulo" variant="h6" component="h2" sx={{ color: 'black', fontWeight: 'bold' }}>
                        Adicionar Novo Conteúdo
                    </Typography>
                    <TextField
                        label="Título"
                        fullWidth
                        margin="normal"
                        value={conteudoSelecionado?.titulo || ''}
                        onChange={(e) =>
                            setConteudoSelecionado({ ...conteudoSelecionado, titulo: e.target.value })
                        }
                    />
                    <TextField
                        label="Autor"
                        fullWidth
                        margin="normal"
                        value={conteudoSelecionado?.autor || ''}
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
                        value={conteudoSelecionado?.descricao || ''}
                        onChange={(e) =>
                            setConteudoSelecionado({ ...conteudoSelecionado, descricao: e.target.value })
                        }
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
                        onClick={handleAdicionarConteudo}
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

            {/* Seção de horarios */}
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
                    <Button
                        onClick={handleSalvarEdicaoAula}
                        variant="contained"
                        sx={{ mt: 3, backgroundColor: 'green', color: 'white' }}
                    >
                        Salvar
                    </Button>
                    <Button
                        onClick={() => handleDeletarAula(aulaEmEdicao.id)}
                        variant="contained"
                        sx={{ mt: 3, backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
                    >
                        Deletar
                    </Button>
                    <Button
                        onClick={handleCloseEditModalAula}
                        variant="contained"
                        sx={{ mt: 3, backgroundColor: '#015495', color: 'white', marginLeft: '10px' }}
                    >
                        Fechar
                    </Button>
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
                    <Button
                        onClick={handleAdicionarAula}
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
