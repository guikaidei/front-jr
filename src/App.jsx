import './App.css'

import { LoginPage } from './usuario/Login'
import { HomeAluno } from './aluno/HomeAluno'
import { HomeProfessor } from './professor/HomeProfessor'
import { HomeGestor } from './gestor/HomeGestor'
import { ListaAlunos } from './aluno/ListaAlunos'
import { ListaProfessores } from './professor/ListaProfessores'
import { ListaGestores } from './gestor/ListaGestores'
import { GerenciaNotas } from './gestor/GerenciaNotas'
import { GerenciaMatematica } from './gestor/GerenciaMatematica'
import { GerenciaPortugues } from './gestor/GerenciaPortugues'
import { GerenciaHumanas } from './gestor/GerenciaHumanas'
import { GerenciaNaturais } from './gestor/GerenciaNaturais'
import { GerenciaMateria } from './gestor/GerenciaMateria'
import { VisualizaMatematica } from './aluno/VisualizaMatematica'
import { VisualizaHumanas } from './aluno/VisualizaHumanas'
import { VisualizaNaturais } from './aluno/VisualizaNaturais'
import { VisualizaPortugues } from './aluno/VisualizaPortugues'
import { GerenciaHumanasProf } from './professor/GerenciaHumanasProf'
import { GerenciaMatematicaProf } from './professor/GerenciaMatematicaProf'
import { GerenciaNaturaisProf } from './professor/GerenciaNaturaisProf'
import { GerenciaPortuguesProf } from './professor/GerenciaPortuguesProf'
import { GerenciaMateriaProf } from './professor/GerenciaMateriaProf'
import { CadastraAluno } from './gestor/CadastraAluno'
import { CadastraProfessor } from './gestor/CadastraProfessor'
import { CadastraGestor } from './gestor/CadastraGestor'
import { HomePage } from './common/HomePage'
import { VisualizaConteudos } from './aluno/VisualizaConteudos'  // Novo componente

import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/home-aluno' element={<HomeAluno />} />
                <Route path='/home-professor' element={<HomeProfessor />} />
                <Route path='/home-gestor' element={<HomeGestor />} />
                <Route path='/usuarios/alunos' element={<ListaAlunos />} />
                <Route path='/usuarios/professores' element={<ListaProfessores />} />
                <Route path='/usuarios/gestores' element={<ListaGestores />} />
                <Route path='/gestor/gerencia-notas/:matricula' element={<GerenciaNotas />} />
                <Route path='/gestor/gerencia-matematica' element={<GerenciaMatematica />} />
                <Route path='/gestor/gerencia-portugues' element={<GerenciaPortugues />} />
                <Route path='/gestor/gerencia-humanas' element={<GerenciaHumanas />} />
                <Route path='/gestor/gerencia-naturais' element={<GerenciaNaturais />} />
                <Route path='/gestor/gerencia-materia/:materia' element={<GerenciaMateria />} />
                <Route path='/aluno/matematica' element={<VisualizaMatematica />} />
                <Route path='/aluno/humanas' element={<VisualizaHumanas />} />
                <Route path='/aluno/naturais' element={<VisualizaNaturais />} />
                <Route path='/aluno/portugues' element={<VisualizaPortugues />} />
                <Route path='/professor/:materia' element={<GerenciaMateriaProf />} />
                <Route path='/gestor/cadastra-aluno' element={<CadastraAluno />} />
                <Route path='/gestor/cadastra-professor' element={<CadastraProfessor />} />
                <Route path='/gestor/cadastra-gestor' element={<CadastraGestor />} />
                <Route path='/listar-conteudos/:materia' element={<VisualizaConteudos />} />
              </Routes>
            </div>
          </div>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App;
