import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        const token = localStorage.getItem('jwtToken'); // Obtém o token JWT do localStorage
        const userType = localStorage.getItem('userType'); // Obtém o tipo de usuário do localStorage
        
        if (!token) {
            navigate('/login'); // Se não houver token, redireciona para a página de login
        } else if (userType) {
            navigate(`/home-${userType}`); // Se houver tipo de usuário, redireciona para a página específica do tipo de usuário
        }
    }, [navigate]); // Executa o efeito colateral quando o componente é montado

    return (
        <div>
            <h1>Redirecionando...</h1> {/* Mensagem exibida enquanto redireciona */}
        </div>
    );
}
