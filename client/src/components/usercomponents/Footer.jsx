// import React from 'react';
// import { Box, Typography, IconButton } from '@mui/material';
// import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

// const Footer = () => {
//     return (
//         <Box 
//             sx={{
//                 background:'linear-gradient(90deg, #2C3333 0%, #395B64 100%)',
//                 color: '#E7F6F2', 
//                 padding: { xs: 2, sm: 4 }, 
//                 textAlign: 'center',
//                 position: 'relative',
//                 bottom: 0,
//                 width: '100%',
//                 height :'auto', 
//                 boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)', 
//             }}
//         >
//             <Typography variant="body2" sx={{ fontWeight: '500' }}>
//                 &copy; {new Date().getFullYear()} Lisan Al Gaib Academy. All rights reserved.
//             </Typography>
//             <Box sx={{ marginTop: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
//                 <IconButton 
//                     color="inherit" 
//                     href="https://www.facebook.com" 
//                     target="_blank" 
//                     aria-label="Facebook"
//                     sx={{
//                         '&:hover': {
//                             color: '#3b5998', // Facebook blue on hover
//                         },
//                     }}
//                 >
//                     <Facebook />
//                 </IconButton>
//                 <IconButton 
//                     color="inherit" 
//                     href="https://twitter.com" 
//                     target="_blank" 
//                     aria-label="Twitter"
//                     sx={{
//                         '&:hover': {
//                             color: '#1DA1F2', // Twitter blue on hover
//                         },
//                     }}
//                 >
//                     <Twitter />
//                 </IconButton>
//                 <IconButton 
//                     color="inherit" 
//                     href="https://www.instagram.com" 
//                     target="_blank" 
//                     aria-label="Instagram"
//                     sx={{
//                         '&:hover': {
//                             color: '#E1306C', // Instagram pink on hover
//                         },
//                     }}
//                 >
//                     <Instagram />
//                 </IconButton>
//                 <IconButton 
//                     color="inherit" 
//                     href="https://www.linkedin.com" 
//                     target="_blank" 
//                     aria-label="LinkedIn"
//                     sx={{
//                         '&:hover': {
//                             color: '#0077B5', // LinkedIn blue on hover
//                         },
//                     }}
//                 >
//                     <LinkedIn />
//                 </IconButton>
//             </Box>
//         </Box>
//     );
// };

// export default Footer;






import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, LinkedIn, Instagram } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box 
            sx={{
                background: '#2C3333', 
                color: '#FFFFFF', 
                padding: { xs: 3, sm: 5 }, 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                height: 'auto', 
                boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)', 
            }}
        >
            <Box sx={{ flex: 1, marginRight: { md: 2 }, marginBottom: { xs: 2, md: 0 }, paddingLeft: { xs: 3, md: 5 } }}>
                <img 
                    src="https://gradious.com/wp-content/uploads/2021/09/Final-Logo-2.svg" 
                    alt="Gradious Logo" 
                    style={{ height: '50px', filter: 'invert(1)' }} 
                />
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                    At Gradious, we strive to work with passionate learners on their journey to become excellent technocrats.
                </Typography>
                {/* Social Media Icons */}
                <Box sx={{ marginTop: 1, display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
                    <IconButton 
                        color="inherit" 
                        href="https://www.facebook.com" 
                        target="_blank" 
                        aria-label="Facebook"
                        sx={{
                            '&:hover': {
                                color: '#3b5998', 
                            },
                        }}
                    >
                        <Facebook />
                    </IconButton>
                    <IconButton 
                        color="inherit" 
                        href="https://www.linkedin.com" 
                        target="_blank" 
                        aria-label="LinkedIn"
                        sx={{
                            '&:hover': {
                                color: '#0077B5', 
                            },
                        }}
                    >
                        <LinkedIn />
                    </IconButton>
                    <IconButton 
                    color="inherit" 
                    href="https://www.instagram.com" 
                    target="_blank" 
                    aria-label="Instagram"
                    sx={{
                        '&:hover': {
                            color: '#E1306C', 
                        },
                    }}
                >
                    <Instagram />
                </IconButton>
                </Box>
                <Typography variant="body2" sx={{ marginTop: 2, fontWeight: 'normal', lineHeight: 1.5 }}>
                    &copy; {new Date().getFullYear()} Gradious Technologies (P) Ltd. All rights reserved.
                </Typography>
            </Box>

            <Box sx={{ flex: 1, textAlign: 'left', paddingRight: { xs: 3, md: 5 }, paddingLeft: { xs: 3, md: 5 } }}>
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'normal', lineHeight: 1.5 }}>
                        Call us between 10 am to 8 pm: <strong>+91-9000120995</strong>
                    </Typography><br/>
                    <Typography variant="body2" sx={{ fontWeight: 'normal', lineHeight: 1.5 }}>
                        Have questions? Drop us a line at: <strong>hr@gradious.com</strong>
                    </Typography><br/>
                    <Typography variant="body2" sx={{ fontWeight: 'normal', lineHeight: 1.5 }}>
                        Meet us at: <strong>Level 1, Lotus Heights, Near Dmart,<br /> Kavuri Hills, Madhapur, Hyderabad 500033</strong>
                    </Typography>
                </Box>
                
            </Box>
        </Box>
    );
};

export default Footer;
