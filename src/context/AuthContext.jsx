import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Checar se o token e o tipo de usuário estão armazenados no localStorage
        const token = localStorage.getItem('jwtToken');
        const userType = localStorage.getItem('userType');
        
        if (token && userType) {
            setIsAuthenticated(true);
            setUser({ token, tipo: userType });
        }
    }, []);

    const login = (token, tipo) => {
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userType', tipo);
        setIsAuthenticated(true);
        setUser({ token, tipo });
        navigate(`/home-${tipo}`);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userType');
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
