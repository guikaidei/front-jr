import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';

// Função para remover acentos e transformar em minúsculas
const normalizeString = (str) =>
  str
    .normalize('NFD') // Decomposição dos caracteres especiais
    .replace(/[\u0300-\u036f]/g, '') // Remove os diacríticos (acentos)
    .toLowerCase(); // Converte para minúsculo

export function VisualizaConteudos() {
  const { materia } = useParams();
  const navigate = useNavigate();
  const [conteudos, setConteudos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const materiaNormalizada = normalizeString(materia); // Normaliza a string

    axios
      .get(`http://localhost:5000/listar_conteudos/${materiaNormalizada}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setConteudos(response.data || []))
      .catch((error) => console.error('Erro ao buscar conteúdos:', error));
  }, [materia, navigate]);

  return (
    <Box sx={{ paddingTop: '80px', fontFamily: 'Open Sans', maxWidth: '800px', margin: 'auto' }}>
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', marginBottom: '20px', color: '#015495', fontWeight: 'bold' }}
      >
        Conteúdos de {decodeURIComponent(materia)}
      </Typography>

      <List>
        {conteudos.map((conteudo, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              padding: '20px',
              marginBottom: '20px',
              borderRadius: '12px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              {conteudo.titulo}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px', color: '#666' }}>
              {conteudo.descricao}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#666' }}>
              Autor: {conteudo.autor}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: '#015495', fontWeight: 'bold', marginBottom: '10px' }}
            >
              Data: {conteudo.data}
            </Typography>

            {conteudo.arquivos.length > 0 && (
              <Box sx={{ marginTop: '10px' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  Arquivos:
                </Typography>
                <Grid container spacing={2}>
                  {conteudo.arquivos.map((arquivo, index) => (
                    <Grid item key={index}>
                      <Button
                        variant="outlined"
                        onClick={() => alert(`Baixando: ${arquivo}`)}
                        sx={{ textTransform: 'none' }}
                      >
                        {arquivo}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Paper>
        ))}
      </List>

      <Button
        onClick={() => navigate('/home-aluno')}
        variant="contained"
        sx={{ marginTop: '20px', backgroundColor: '#015495', color: 'white' }}
      >
        Voltar
      </Button>
    </Box>
  );
}

export default VisualizaConteudos;
