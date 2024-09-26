import React from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Toolbar, Button} from '@mui/material';

const Navbar = () => {
    return (
            <div className="app">
                <AppBar position="static" sx={{backgroundColor: '#3C3D37'}}>
                    <Toolbar className="nav-bar">
                        <Button color="inherit" component="a" href="#applications">Applications</Button>
                        <Button color="inherit" component={Link} to="/admin/courses">Courses</Button>
                    </Toolbar>
                </AppBar>
            </div>
    );
};

export default Navbar;