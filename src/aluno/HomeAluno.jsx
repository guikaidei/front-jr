import React, { useEffect, useState } from 'react';
import '../index.css'; // Importação do CSS global
import {
  Box,
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../common/navbar';

const CustomButton = styled('button')({
  width: '200px',
  height: '50px',
  marginTop: '10px',
  marginRight: '10px',
  fontFamily: 'Open Sans',
  fontWeight: 'light',
  backgroundColor: '#015495',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  '&:hover': { backgroundColor: '#0067b8' },
});

const CustomTable = styled(Table)({
  borderRadius: '12px',
  overflow: 'hidden',
  border: '1px solid #ddd',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
});

export function HomeAluno() {
  const navigate = useNavigate();
  const [nomeAluno, setNomeAluno] = useState('');
  const [gradeHoraria, setGradeHoraria] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [simulados, setSimulados] = useState([]);
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('Token ausente');
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:5000/home-aluno', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const aluno = response.data;
        setNomeAluno(aluno.nome);
        setGradeHoraria(aluno.grade_horaria || []);
        setMaterias(aluno.materias || []);
        setSimulados(aluno.notas || []);
        setAvisos(aluno.avisos || []);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados do aluno:', error);
      });
  }, [navigate]);

  const handleMateriaClick = (materia) => {
    navigate(`/listar-conteudos/${encodeURIComponent(materia)}`);
  };

  return (
    <Box sx={{ paddingTop: '80px', fontFamily: 'Open Sans' }}>
      <NavBar />

      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#015495', fontWeight: 'bold', textAlign: 'center' }}
      >
        Bem-vindo, {nomeAluno}!
      </Typography>

      {/* Grade Horária */}
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '20px',
          marginBottom: '20px',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          maxWidth: '800px',
          margin: 'auto',
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: '#015495', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}
        >
          Grade Horária
        </Typography>
        <CustomTable>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: '#015495', fontWeight: 'bold' }}>
                Matéria
              </TableCell>
              <TableCell align="center" sx={{ color: '#015495', fontWeight: 'bold' }}>
                Início
              </TableCell>
              <TableCell align="center" sx={{ color: '#015495', fontWeight: 'bold' }}>
                Fim
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gradeHoraria.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{item.materia}</TableCell>
                <TableCell align="center">{item.horarioInicio}</TableCell>
                <TableCell align="center">{item.horarioFim}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </CustomTable>
      </Box>

      {/* Matérias */}
      <Box
        sx={{
          backgroundColor: '#ab2325',
          padding: '20px',
          marginBottom: '20px',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: 'white', marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}
        >
          Suas Matérias
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {materias.map((materia, index) => (
            <Grid item key={index}>
              <CustomButton onClick={() => handleMateriaClick(materia)}>
                {materia}
              </CustomButton>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Avisos */}
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '20px',
          marginBottom: '20px',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          maxWidth: '800px',
          margin: 'auto',
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: '#015495', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}
        >
          Avisos
        </Typography>
        <CustomTable>
          <TableBody>
            {avisos.map((aviso, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ color: 'black', fontWeight: 'bold', marginBottom: '5px' }}
                  >
                    {aviso.titulo}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: '#666', marginBottom: '10px' }}
                  >
                    {aviso.conteudo}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#666', marginBottom: '5px' }}>
                    Matéria: {aviso.materia}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#666', marginBottom: '5px' }}>
                    Autor: {aviso.autor}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#015495', fontWeight: 'bold' }}>
                    {aviso.data}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </CustomTable>
      </Box>

      {/* Notas dos Simulados */}
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          maxWidth: '800px',
          margin: 'auto',
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: '#015495', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}
        >
          Notas dos Simulados
        </Typography>
        <CustomTable>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: '#015495', fontWeight: 'bold' }}>
                Simulado
              </TableCell>
              <TableCell align="center" sx={{ color: '#015495', fontWeight: 'bold' }}>
                Nota
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {simulados.map((nota, index) => (
              <TableRow key={index}>
                <TableCell align="center">{nota.simulado}</TableCell>
                <TableCell align="center">{nota.nota}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </CustomTable>
      </Box>
    </Box>
  );
}

export default HomeAluno;
