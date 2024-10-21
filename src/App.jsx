import './App.css'

import { LoginPage } from './usuario/Login'
import { HomeAluno } from './aluno/HomeAluno'
import { HomeProfessor } from './professor/HomeProfessor'

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
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
