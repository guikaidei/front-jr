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


export function VisualizaNaturais() {

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
    const avisosOrdenados = [...avisos].sort((a, b) => new Date(b.data) - new Date(a.data));
    const [open, setOpen] = useState(false);
    const [avisoSelecionado, setAvisoSelecionado] = useState(null);
    const [openAvisoModal, setOpenAvisoModal] = useState(false);
    const [openConteudoModal, setOpenConteudoModal] = useState(false);
    const [conteudoSelecionado, setConteudoSelecionado] = useState(null);

    const handleOpenModal = (aviso) => {
        setAvisoSelecionado(aviso);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
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

            <Button onClick={() => {navigate('/home-aluno')}}>
                <ArrowBackIosNewIcon />
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px' }}>
                <Typography variant="h3" gutterBottom sx={{ color: '#ab2325', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                        Naturais
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

            {/* Seção de Conteúdos */}
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
                <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Open Sans' }}>
                    Conteúdos
                </Typography>
                <Box sx={{
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
                }}>
                    <List sx={{ backgroundColor: '#ffffff', borderRadius: '0px', width: '100%', maxWidth: '600px' }}>
                        {conteudos.map((conteudo, index) => (
                            <ListItem 
                                key={index} 
                                button 
                                onClick={() => handleOpenConteudoModal(conteudo)}
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
                                    {conteudo.titulo}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 300, fontFamily: 'Open Sans' }}>
                                    Autor: {conteudo.autor}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666', fontWeight: 300, fontFamily: 'Open Sans', marginTop: '5px' }}>
                                    {conteudo.descricao.substring(0, 100)}...
                                </Typography>
                                <Typography variant="subtitle2" sx={{ color: '#015495', fontWeight: 500, fontFamily: 'Open Sans', marginTop: '5px' }}>
                                    {conteudo.arquivos.length} arquivo(s) disponível(is)
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>

            {/* Modal para conteúdos */}
            <Modal
                open={openConteudoModal}
                onClose={handleCloseConteudoModal}
                aria-labelledby="modal-conteudo-titulo"
                aria-describedby="modal-conteudo-descricao"
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
                    {conteudoSelecionado && (
                        <div>
                            <Typography id="modal-conteudo-titulo" variant="h6" component="h2" sx={{ color: 'black', fontFamily: 'Open Sans', fontWeight: 'bold' }}>
                                {conteudoSelecionado.titulo}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: '#666', fontFamily: 'Open Sans', marginTop: '5px' }}>
                                <strong>Autor:</strong> {conteudoSelecionado.autor}
                            </Typography>
                            <Typography id="modal-conteudo-descricao" sx={{ mt: 2, color: 'black', fontFamily: 'Open Sans' }}>
                                {conteudoSelecionado.descricao}
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 2, color: 'black', fontFamily: 'Open Sans', fontWeight: 'bold' }}>
                                Arquivos disponíveis:
                            </Typography>
                            <List>
                                {conteudoSelecionado.arquivos.map((arquivo, index) => (
                                    <ListItem key={index}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<CloudUploadIcon />}
                                            sx={{ color: '#015495', borderColor: '#015495' }}
                                        >
                                            {arquivo}
                                        </Button>
                                    </ListItem>
                                ))}
                            </List>
                            <Button 
                                onClick={handleCloseConteudoModal} 
                                variant="contained" 
                                sx={{ mt: 3, backgroundColor: '#015495', color: 'white', fontFamily: 'Open Sans' }}
                            >
                                Fechar
                            </Button>
                        </div>
                    )}
                </Box>
            </Modal>

            

        </Box>
    );
}
