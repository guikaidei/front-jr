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
import { VisualizaMatematica } from './aluno/VisualizaMatematica'
import { VisualizaHumanas } from './aluno/VisualizaHumanas'
import { VisualizaNaturais } from './aluno/VisualizaNaturais'
import { VisualizaPortugues } from './aluno/VisualizaPortugues'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
      {/* Envolvendo a aplicação no componente Router para habilitar o roteamento */}
      <Router>
        {/* Definindo um layout flexível com altura de 100vh */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Definindo a área principal com overflow automático */}
          <div style={{ flex: 1, overflow: 'auto'}}>
            {/* Definindo as rotas da aplicação */}
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/home-aluno' element={<HomeAluno />} />
              <Route path='/home-professor' element={<HomeProfessor />} />
              <Route path='/home-gestor' element={<HomeGestor />} />
              <Route path='/usuarios/alunos' element={<ListaAlunos />} />
              <Route path='/usuarios/professores' element={<ListaProfessores />} />
              <Route path='/usuarios/gestores' element={<ListaGestores />} />
              <Route path='/gestor/gerencia-notas' element={<GerenciaNotas />} />
              <Route path='/gestor/gerencia-matematica' element={<GerenciaMatematica />} />
              <Route path='/gestor/gerencia-portugues' element={<GerenciaPortugues />} />
              <Route path='/gestor/gerencia-humanas' element={<GerenciaHumanas />} />
              <Route path='/gestor/gerencia-naturais' element={<GerenciaNaturais />} />
              <Route path='/aluno/matematica' element={<VisualizaMatematica />} />
              <Route path='/aluno/humanas' element={<VisualizaHumanas />} />
              <Route path='/aluno/naturais' element={<VisualizaNaturais />} />
              <Route path='/aluno/portugues' element={<VisualizaPortugues />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
