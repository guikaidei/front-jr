import React, { useEffect, useState, useContext } from 'react';
import '../index.css';
import {
  Box,
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  Button,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../common/navbar';
import { AuthContext } from '../context/AuthContext';

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

const BoxGeral = styled(Box)(({ theme }) => ({
  fontFamily: 'Open Sans', 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '40px',
  paddingBottom: '40px',
  backgroundColor: '#ab2325',
  paddingTop: '40px',
}));

// Componente estilizado para as imagens das matérias
const MateriaImage = styled('img')({
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '8px',
  marginBottom: '15px',
});


export function HomeAluno() {
  const navigate = useNavigate();
  const [nomeAluno, setNomeAluno] = useState('');
  const [gradeHoraria, setGradeHoraria] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [simulados, setSimulados] = useState([]);
  const [avisos, setAvisos] = useState([]);
  const [openModal, setOpenModal] = useState(false); // Controla a abertura do modal
  const [selectedAviso, setSelectedAviso] = useState(null); // Armazena o aviso selecionado
  const { isAuthenticated, user } = useContext(AuthContext);

  const parseDate = (dateStr) => {
    const [dia, mes, ano] = dateStr.split('/');
    return new Date(`${ano}-${mes}-${dia}`);
  };

  useEffect(() => {
    if (!isAuthenticated || user.tipo !== 'aluno') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  const materiasFormatadas = {
    'matematica': 'Matemática',
    'portugues': 'Português',
    'humanas': 'Humanas',
    'naturais': 'Naturais',
    'geral': 'Geral',
  };

  const imagensMaterias = {
    'matematica': '/assets/foto_matematica.jpg',
    'portugues': '/assets/foto_portugues.jpg',
    'humanas': '/assets/foto_humanas.jpg',
    'naturais': '/assets/foto_biologia.jpg',
};


  const fetchHomeAluno = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch('http://127.0.0.1:5000/home-aluno', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        },
      });
      if (response.ok) {
        const data = await response.json();
        const avisosOrdenados = data.avisos.sort((a, b) => parseDate(b.data) - parseDate(a.data));
        setAvisos(avisosOrdenados);
        setNomeAluno(data.nome);
        setGradeHoraria(data.grade_horaria);
        setMaterias(data.materias);
        setSimulados(data.notas);
      } else {
        console.error('Erro ao buscar avisos:', response.statusText);
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    }
  };

  useEffect(() => {
    fetchHomeAluno();
  }, []);

  const handleMateriaClick = (materia) => {
    navigate(`/visualizar-materia/${materia}`);
  };

  // Função para abrir o modal com o aviso selecionado
  const handleAvisoClick = (aviso) => {
    setSelectedAviso(aviso);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAviso(null);
  };


  return (
    <Box sx={{ paddingTop: '80px', fontFamily: 'Open Sans' }}>
      <NavBar />

      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#015495', fontWeight: 'bold', fontFamily: 'Open sans', textAlign: 'center' }}
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
          sx={{ color: '#015495', fontWeight: 'bold', fontFamily: 'Open sans', textAlign: 'center', marginBottom: '20px' }}
        >
          Grade Horária
        </Typography>
        <CustomTable>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: '#015495', fontWeight: 'bold', fontFamily: 'Open sans',}}>
                Matéria
              </TableCell>
              <TableCell align="center" sx={{ color: '#015495', fontWeight: 'bold', fontFamily: 'Open sans', }}>
                Início
              </TableCell>
              <TableCell align="center" sx={{ color: '#015495', fontWeight: 'bold', fontFamily: 'Open sans', }}>
                Fim
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gradeHoraria.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center" sx={{ fontFamily: 'Open sans',}}>{materiasFormatadas[item.materia]}</TableCell>
                <TableCell align="center" sx={{ fontFamily: 'Open sans',}}>{item.horarioInicio}</TableCell>
                <TableCell align="center" sx={{ fontFamily: 'Open sans',}}>{item.horarioFim}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </CustomTable>
      </Box>

      {/* Matérias */}
      <BoxGeral >
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
              {materias.map((materia, index) => (
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
      </BoxGeral>

      {/* Avisos */}
      {/* Avisos */}
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '20px',
          marginBottom: '40px', // Adiciona margem inferior de 40px
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 'auto',  // Centraliza horizontalmente
          marginRight: 'auto', // Centraliza horizontalmente
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
              <TableRow key={index} onClick={() => handleAvisoClick(aviso)} sx={{ cursor: 'pointer' }}>
                <TableCell>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    {aviso.titulo}
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

      {/* Modal para mostrar detalhes do aviso */}
      <Modal open={openModal} onClose={handleCloseModal}>
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
            onClick={handleCloseModal}
          >
            Fechar
          </Button>
        </Box>
      </Box>

        
       
        
      </Modal>

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
          sx={{ color: '#015495', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', fontFamily: 'Open sans' }}
        >
          Notas dos Simulados
        </Typography>
        <CustomTable>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: '#015495', fontWeight: 'bold', fontFamily: 'Open sans' }}>
                Simulado
              </TableCell>
              <TableCell align="center" sx={{ color: '#015495', fontWeight: 'bold', fontFamily: 'Open sans' }}>
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
