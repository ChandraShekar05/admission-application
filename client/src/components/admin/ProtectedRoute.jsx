import { useEffect, useState } from 'react';

import { tokenValidation } from '../../services/login';

import NoAccess from '../../assets/NoAccess.svg'
import { Box, Typography } from '@mui/material';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // State to hold authentication status

    useEffect(() => {

        // Example of server-side validation (you may need to adjust the API endpoint)
        tokenValidation()
        .then(response => {
            if (response.success) {
                setIsAuthenticated(true); // Token is valid
            } else {
                setIsAuthenticated(false); // Token is invalid
            }
        })
        .catch(() => setIsAuthenticated(false)); // Handle network errors
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
