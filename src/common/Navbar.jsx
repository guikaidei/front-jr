import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, AppBar, Toolbar, IconButton, Box, Menu, MenuList, MenuItem } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
    background: 'rgba(157, 48, 44, 1)', // Cor de fundo
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Pequena sombra
    position: 'fixed', // Mantém a barra no topo da tela
    zIndex: 1100, // Garante que a AppBar fique acima de outros elementos
});

const StyledButton = styled(Button)({
    fontWeight: 'bold', // Negrito
    fontSize: '16px', // Tamanho da fonte
});

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
        localStorage.removeItem('jwtToken');
        navigate('/login');
    };

    return (
        <StyledAppBar position='fixed'> {/* Mudamos para fixed */}
            <Toolbar sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}> {/* Centraliza verticalmente */}
                {/* Ícone e título em telas maiores */}
                <IconButton 
                    size='large' 
                    edge='start' 
                    aria-label='logo' 
                    sx={{display: { xs: 'none', md: 'flex' }}}
                    onClick={() => navigate('/')}
                >
                    <CelebrationIcon sx={{ color: 'white' }} />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, fontWeight: 'bold', fontSize: '24px' }}>
                    Cursinho Insper
                </Typography>

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
                    onClick={() => navigate('/')}
                >
                    <CelebrationIcon sx={{ color: 'white' }} />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, fontWeight: 'bold', fontSize: '24px' }}>
                    Cursinho Insper
                </Typography>
            </Toolbar>
        </StyledAppBar>
    );
}
