import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box 
            sx={{
                background:'linear-gradient(90deg, #2C3333 0%, #395B64 100%)',
                color: '#E7F6F2', 
                padding: { xs: 2, sm: 4 }, 
                textAlign: 'center',
                position: 'relative',
                bottom: 0,
                width: '100%',
                height :'auto', 
                boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)', 
            }}
        >
            <Typography variant="body2" sx={{ fontWeight: '500' }}>
                &copy; {new Date().getFullYear()} Lisan Al Gaib Academy. All rights reserved.
            </Typography>
            <Box sx={{ marginTop: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton 
                    color="inherit" 
                    href="https://www.facebook.com" 
                    target="_blank" 
                    aria-label="Facebook"
                    sx={{
                        '&:hover': {
                            color: '#3b5998', // Facebook blue on hover
                        },
                    }}
                >
                    <Facebook />
                </IconButton>
                <IconButton 
                    color="inherit" 
                    href="https://twitter.com" 
                    target="_blank" 
                    aria-label="Twitter"
                    sx={{
                        '&:hover': {
                            color: '#1DA1F2', // Twitter blue on hover
                        },
                    }}
                >
                    <Twitter />
                </IconButton>
                <IconButton 
                    color="inherit" 
                    href="https://www.instagram.com" 
                    target="_blank" 
                    aria-label="Instagram"
                    sx={{
                        '&:hover': {
                            color: '#E1306C', // Instagram pink on hover
                        },
                    }}
                >
                    <Instagram />
                </IconButton>
                <IconButton 
                    color="inherit" 
                    href="https://www.linkedin.com" 
                    target="_blank" 
                    aria-label="LinkedIn"
                    sx={{
                        '&:hover': {
                            color: '#0077B5', // LinkedIn blue on hover
                        },
                    }}
                >
                    <LinkedIn />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Footer;