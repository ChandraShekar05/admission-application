import { useState } from 'react';
import {
  AppBar, Box, CssBaseline, Divider, Drawer, IconButton,
  List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 300;
const navItems = ['Home', 'About', 'Courses', 'Contact'];

function DrawerAppBar({ window, scrollToCourses, scrollToContact, scrollToHome, scrollToAbout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleItemClick = (item) => {
    if (item === 'Courses' && scrollToCourses) {
      scrollToCourses();
    } else if (item === 'Contact' && scrollToContact) {
      scrollToContact();
    } else if (item === 'Home' && scrollToHome) {
      scrollToHome();
    } else if (item === 'About' && scrollToAbout) {
      scrollToAbout();
    }
    handleDrawerToggle();
  };

  const drawer = (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h5" color="#2C3333" sx={{ fontWeight: '700', my: 2 }}>
        Lisan Al Gaib
      </Typography>
      <Divider sx={{ my: 2 }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{
                color: '#395B64',
                textAlign: 'center',
                borderRadius: '8px',
                transition: 'background 0.3s',
                '&:hover': {
                  backgroundColor: '#D6E4E5',
                },
              }}
              onClick={() => handleItemClick(item)}
            >
              <ListItemText primary={item} primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <CssBaseline />
      <AppBar
        elevation={3}
        sx={{
          position: 'sticky',
          top: '0',
          background: 'linear-gradient(90deg, #2C3333 0%, #395B64 100%)', // Gradient background
          zIndex: 1100,
          transition: 'background 0.3s ease-in-out',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        }}
        component="nav"
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h5"
              component="div"
              color="#ffffff"
              sx={{ fontWeight: '700', display: { xs: 'none', sm: 'block' } }}
            >
              Lisan Al Gaib
            </Typography>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: '#ffffff' }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: '600',
                  mx: 1.5,
                  borderRadius: '20px',
                  padding: '10px 20px',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: '#D6E4E5',
                    color: '#2C3333',
                  },
                }}
                onClick={() => {
                  if (item === 'Courses' && scrollToCourses) scrollToCourses();
                  else if (item === 'Contact' && scrollToContact) scrollToContact();
                  else if (item === 'Home' && scrollToHome) scrollToHome();
                  else if (item === 'About' && scrollToAbout) scrollToAbout();
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#F4FAFA',
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

  
    </Box>
  );
}

export default DrawerAppBar;
