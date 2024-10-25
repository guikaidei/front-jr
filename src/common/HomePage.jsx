import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const userType = localStorage.getItem('userType');
        
        if (!token) {
            navigate('/login');
        } else if (userType) {
            navigate(`/home-${userType}`);
        }
    }, [navigate]); 

    return (
        <div>
            <h1>Redirecionando...</h1>
        </div>
    );
}
