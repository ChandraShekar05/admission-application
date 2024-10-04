import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { tokenValidation } from '../../services/login';
import { adminTokenValidation } from '../../services/superAdminApi';
import NoAccess from '../../assets/NoAccess.svg'
import { Box, Typography } from '@mui/material';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // State to hold authentication status
    
    useEffect(() => {
        // Extract the role from the superAdminAuth cookie
        let role = "AdminCounceller";
        role = Cookies.get('userRole');

        // Conditionally call the validation function based on the role
        if (role === 'Admin') {
            adminTokenValidation()
                .then(response => {
                    if (response.success) {
                        setIsAuthenticated(true); // Admin token is valid
                    } else {
                        setIsAuthenticated(false); // Admin token is invalid
                    }
                })
                .catch(() => setIsAuthenticated(false)); // Handle network errors for admin token validation
        } else {
            tokenValidation()
                .then(response => {
                    if (response.success) {
                        setIsAuthenticated(true); // Token is valid
                    } else {
                        setIsAuthenticated(false); // Token is invalid
                    }
                })
                .catch(() => setIsAuthenticated(false)); // Handle network errors for user token validation
        }
    }, []);


    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Optional: Show a loading state
    }

    if (!isAuthenticated) {
        return (
            <Box sx={{my:5,p:5, display:'flex',justifyContent:'center', alignItems: 'center',flexDirection:'column'}}>
                <img width={'30%'} src={NoAccess}/>
                <Typography variant='h4' sx={{pt:2}}>Please Login to Access this Page</Typography>
            </Box>
        );
    }

    return children; // Render the child components if the user is authenticated
};

export default ProtectedRoute;
