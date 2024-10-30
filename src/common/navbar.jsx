import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, AppBar, Toolbar, IconButton, Box, Menu, MenuList, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
    background: '#ab2325',
    position: 'fixed',
    zIndex: 1100,
});

const StyledButton = styled(Button)({
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    fontSize: '16px',
});

const logo = '/assets/logo_navbar_transparent.png';

export function NavBar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path) => {
        navigate(path);
        handleClose();
    };

    const logout = () => {
        localStorage.removeItem('jwtToken'); // Remove o token JWT do localStorage
        localStorage.removeItem('userType'); // Remove o tipo de usuário do localStorage
        navigate('/login'); // Redireciona para a página de login
    };

    const handleLogoClick = () => {
        const userType = localStorage.getItem('userType'); // Pega o tipo de usuário do localStorage
        if (userType) {
            navigate(`/home-${userType}`); // Redireciona para a rota do tipo de usuário
        } else {
            navigate('/'); // Caso não haja tipo de usuário, redireciona para a página inicial genérica
        }
    };

    return (
        <StyledAppBar position='fixed'>
            <Toolbar sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                {/* Ícone e título em telas maiores */}
                <IconButton 
                    size='large' 
                    edge='start' 
                    aria-label='logo' 
                    sx={{ display: { xs: 'none', md: 'flex' } }}
                    onClick={handleLogoClick}  // Chama a função handleLogoClick ao clicar no logo
                >
                    <img src={logo} alt='Logo' style={{ height: '40px', display: { xs: 'flex', md: 'none' } }} />
                </IconButton>
                
                {/* Botões em telas maiores */}
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <StyledButton color='inherit' onClick={() => navigate('/')}>Home</StyledButton>
                    <StyledButton color='inherit' onClick={logout}>Logout</StyledButton>
                </Box>

                {/* Menu para telas menores */}
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton size='large' edge='start' color='inherit' aria-label='menu' onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id='menu-appbar'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuList>
                            <MenuItem onClick={() => handleNavigation('/')}>Home</MenuItem>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>

                {/* Ícone e título em telas menores */}
                <IconButton 
                    size='large' 
                    edge='start' 
                    aria-label='logo' 
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                    onClick={handleLogoClick}  // Também chama a função handleLogoClick em telas menores
                >
                    <img src={logo} alt='Logo' style={{ height: '40px', display: { xs: 'flex', md: 'none' } }} />
                </IconButton>
            </Toolbar>
        </StyledAppBar>
    );
}
