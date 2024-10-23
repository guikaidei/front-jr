import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Paper, List, ListItem, Modal, TextField, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

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

export function HomeMateria() {
    const [modalNovoConteudo, setModalNovoConteudo] = useState(false);
    const [conteudoSelecionado, setConteudoSelecionado] = useState(null);
    const [openEditModalConteudo, setOpenEditModalConteudo] = useState(false);

    // Lista de conteúdos
    const [conteudos, setConteudos] = useState([
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

    // Handlers para modal de novo conteúdo
    const handleNovoConteudoOpen = () => {
        setModalNovoConteudo(true);
    };

    const handleNovoConteudoClose = () => {
        setModalNovoConteudo(false);
    };

    // Handlers para modal de edição de conteúdo
    const handleOpenEditModalConteudo = (conteudo) => {
        setConteudoSelecionado({ ...conteudo });
        setOpenEditModalConteudo(true);
    };

    const handleCloseEditModalConteudo = () => {
        setOpenEditModalConteudo(false);
        setConteudoSelecionado(null);
    };

    const handleSalvarEdicaoConteudo = () => {
        const novosConteudos = conteudos.map((conteudo) => 
            conteudo.titulo === conteudoSelecionado.titulo ? conteudoSelecionado : conteudo
        );
        setConteudos(novosConteudos);
        handleCloseEditModalConteudo();
    };

    const handleAdicionarConteudo = () => {
        setConteudos([...conteudos, conteudoSelecionado]);
        handleNovoConteudoClose();
    };

    const handleRemoverArquivo = (arquivo) => {
        setConteudoSelecionado({
            ...conteudoSelecionado,
            arquivos: conteudoSelecionado.arquivos.filter((arq) => arq !== arquivo),
        });
    };

    return (
        <Box sx={{ paddingTop: '80px', fontFamily: 'Open Sans' }}>
            {/* Seção de Conteúdos */}
            <Box sx={{ backgroundColor: 'white', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#015495', fontWeight: 'bold' }}>
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
                            {/* Exibir e gerenciar arquivos */}
                            <Typography variant="h6" sx={{ marginTop: '10px', fontWeight: 'bold' }}>
                                Arquivos
                            </Typography>
                            {conteudoSelecionado.arquivos.map((arquivo, index) => (
                                <Grid container key={index} alignItems="center" justifyContent="space-between">
                                    <Typography>{arquivo}</Typography>
                                    <Button
                                        color="secondary"
                                        onClick={() => handleRemoverArquivo(arquivo)}
                                    >
                                        Remover
                                    </Button>
                                </Grid>
                            ))}
                            <Button
                                variant="contained"
                                sx={{ mt: 3, backgroundColor: 'green', color: 'white' }}
                                onClick={handleSalvarEdicaoConteudo}
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
                        width: 500,
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
        </Box>
    );
}
