import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, List, ListItem, Modal, Button, Paper } from '@mui/material';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { NavBar } from '../common/navbar';
import axios from 'axios';

export function VisualizaHumanas() {
    const navigate = useNavigate();
    const [avisos, setAvisos] = useState([]);
    const [conteudos, setConteudos] = useState([]);
    const [openAvisoModal, setOpenAvisoModal] = useState(false);
    const [openConteudoModal, setOpenConteudoModal] = useState(false);
    const [avisoSelecionado, setAvisoSelecionado] = useState(null);
    const [conteudoSelecionado, setConteudoSelecionado] = useState(null);

    // Função para buscar avisos e conteúdos via API
    const fetchData = async () => {
        const token = localStorage.getItem('jwtToken');
        try {
            const avisosResponse = await axios.get('http://127.0.0.1:5000/listar-avisos/humanas', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAvisos(avisosResponse.data.avisos);

            const conteudosResponse = await axios.get('http://127.0.0.1:5000/listar-conteudos/humanas', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setConteudos(conteudosResponse.data.conteudos);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Carregar avisos e conteúdos ao montar o componente
    }, []);

    const handleOpenAvisoModal = (aviso) => {
        setAvisoSelecionado(aviso);
        setOpenAvisoModal(true);
    };

    const handleCloseAvisoModal = () => {
        setOpenAvisoModal(false);
        setAvisoSelecionado(null);
    };

    const handleOpenConteudoModal = (conteudo) => {
        setConteudoSelecionado(conteudo);
        setOpenConteudoModal(true);
    };

    const handleCloseConteudoModal = () => {
        setOpenConteudoModal(false);
        setConteudoSelecionado(null);
    };

    return (
        <Box sx={{ paddingTop: '80px', fontFamily: 'Open Sans' }}>
            <NavBar />
            <Button onClick={() => navigate('/home-aluno')}>
                <ArrowBackIosNewIcon />
            </Button>

            <Typography variant="h3" sx={{ color: '#ab2325', fontWeight: 'bold', textAlign: 'center' }}>
                Humanas
            </Typography>

            {/* Seção de Avisos */}
            <Box sx={{ padding: '20px' }}>
                <Typography variant="h4" sx={{ color: '#015495', fontWeight: 'bold' }}>Avisos</Typography>
                <List>
                    {avisos.map((aviso, index) => (
                        <ListItem key={index} button onClick={() => handleOpenAvisoModal(aviso)}>
                            <Typography variant="h6">{aviso.titulo}</Typography>
                            <Typography variant="subtitle2">
                                {format(parseISO(aviso.data), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Modal open={openAvisoModal} onClose={handleCloseAvisoModal}>
                <Box sx={{ padding: '20px' }}>
                    {avisoSelecionado && (
                        <>
                            <Typography variant="h6">{avisoSelecionado.titulo}</Typography>
                            <Typography>{avisoSelecionado.conteudo}</Typography>
                        </>
                    )}
                    <Button onClick={handleCloseAvisoModal}>Fechar</Button>
                </Box>
            </Modal>

            {/* Seção de Conteúdos */}
            <Box sx={{ padding: '20px', backgroundColor: '#ab2325' }}>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>Conteúdos</Typography>
                <List>
                    {conteudos.map((conteudo, index) => (
                        <ListItem key={index} button onClick={() => handleOpenConteudoModal(conteudo)}>
                            <Typography variant="h6">{conteudo.titulo}</Typography>
                            <Typography>{conteudo.descricao}</Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Modal open={openConteudoModal} onClose={handleCloseConteudoModal}>
                <Box sx={{ padding: '20px' }}>
                    {conteudoSelecionado && (
                        <>
                            <Typography variant="h6">{conteudoSelecionado.titulo}</Typography>
                            <Typography>{conteudoSelecionado.descricao}</Typography>
                        </>
                    )}
                    <Button onClick={handleCloseConteudoModal}>Fechar</Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default VisualizaHumanas;
