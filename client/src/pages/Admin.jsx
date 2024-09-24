import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Paper, IconButton, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Navbar from '../components/admin/Navbar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import { getApplicants } from '../services/applicantsApi';
import { sendMail } from '../services/mailApi';
import { getAllCourses } from '../services/coursesApi';

const Admin = () => {
    const [applicants, setApplicants] = useState([]);
    const [selectedApplicants, setSelectedApplicants] = useState([]);
    const [courses, setCourses] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        getApplicants()
            .then((applicants) => {
                setApplicants(applicants);
            })
            .catch((error) => console.error('Error fetching applicants:', error));

        getAllCourses()
            .then((courses) => {
                setCourses(courses);
            })
            .catch((error) => console.error('Error fetching courses:', error));
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'open':
                return 'primary';
            case 'followup':
            case 'mail sent':
                return 'warning';
            case 'accepted':
                return 'success';
            case 'rejected':
                return 'error';
            default:
                return 'default';
        }
    };

    const handleSendMail = async () => {
        try {
            const emails = selectedApplicants.map((id) => {
                const applicant = applicants.find((applicant) => applicant.id === id);
                return { email: applicant.contactInformation.emailAddress, fullName: applicant.fullName, status: applicant.status };
            });
            await sendMail(emails);
            setShowSuccessAlert(true);  
        } catch (error) {
            console.error('Error sending emails:', error);
            alert('Failed to send emails');
        }
    };

    const columns = [
        { field: 'fullName', headerName: 'Full Name', width: 200, resizable: false, fontWeight: 'bold', headerClassName: 'header-cell' },
        { field: 'email', headerName: 'Email', width: 200, resizable: false, fontWeight: 'bold', headerClassName: 'header-cell' },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 150, resizable: false, fontWeight: 'bold', headerClassName: 'header-cell' },
        { field: 'course', headerName: 'Preferred Course', width: 180, cellClassName: 'preferred-course-column', resizable: false, fontWeight: 'bold', headerClassName: 'header-cell' },
        { field: 'status', headerName: 'Status', width: 150, resizable: false, fontWeight: 'bold', headerClassName: 'header-cell',
            renderCell: (params) => (
                <Chip label={params.value} sx={{ width: '15ch', fontWeight: 'bold' }} color={getStatusColor(params.value)} />
            )
        },
        { field: 'lastUpdatedBy', headerName: 'Last Updated By', width: 150, resizable: false, fontWeight: 'bold', headerClassName: 'header-cell' },
        { field: 'view', headerName: 'View', width: 100,resizable: false, headerClassName: 'header-cell', renderCell: (params) => (
                <IconButton component={Link} to={`/admin/applicants/${params.row.id}`} sx={{'&:hover': {backgroundColor: 'white'}}} >
                    <ChevronRightIcon />
                </IconButton>
            )
        }
    ];


    const rows = applicants.map((applicant) => {
        return {
            id: applicant.id,
            fullName: applicant.fullName,
            email: applicant.contactInformation.emailAddress,
            phoneNumber: applicant.contactInformation.phoneNumber,
            course: applicant.preferredCourse.course.name,
            status: applicant.status,
            lastUpdatedBy: applicant.lastUpdatedBy,
        };
    });

    const coursesData = courses.map((course) => {
        return {
            id: course.id,
            courseName: course.name,
            duration: course.duration,
            amount: course.amount,
        };
    });

    return (
        <Box>
            <Navbar />
            <Box sx={{ width: '90vw', mx: 8, p: 0, justifyItems: 'center' }}>
                {showSuccessAlert && (
                        <Alert severity="success">Mail sent successfully.</Alert>
                )}
                <Box id="applications" sx={{ my: 4, p: 0, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                        Applications
                    </Typography>
                    {selectedApplicants.length > 0 && (
                        <Button variant="contained" sx={{width: '10ch', height: '50px'}} color="secondary" onClick={handleSendMail}>
                            send mail
                        </Button>
                    )}
                    <Paper sx={{ height: 600, width: '100%', overflowX: 'auto' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowId={(row) => row.id}
                            pageSize={10}
                            rowsPerPageOptions={[5, 10, 20]}
                            checkboxSelection
                            disableSelectionOnClick
                            resizable={false}
                            getRowClassName={() => 'row-cell'}
                            // isRowSelectable={(params) => params.row.status !== 'Accepted' && params.row.status !== 'Rejected' }  
                            onRowSelectionModelChange={(newRowSelectionModel) => {
                                setSelectedApplicants(newRowSelectionModel);
                            }}
                            sx={{
                                '& .MuiDataGrid-columnHeader': {
                                    backgroundColor: 'purple',
                                },
                                '& .header-cell': {
                                    backgroundColor: 'purple',
                                    color: 'white',
                                    fontWeight: 'bold',
                                }
                            }}
                        />
                    </Paper>
                </Box>
                <Box id="courses" sx={{width: 'auto', mx: 35, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                        Courses
                    </Typography>
                    <Paper sx={{ height: 300, width: 'auto' }}>
                        <DataGrid
                            rows={coursesData}
                            columns={[
                                { field: 'courseName', headerName: 'Course Name', width: 200, resizable: false, headerClassName: 'header-cell' },
                                { field: 'duration', headerName: 'Duration', width: 150, resizable: false, headerClassName: 'header-cell' },
                                { field: 'amount', headerName: 'Amount', width: 150, resizable: false, headerClassName: 'header-cell' },
                            ]}
                            getRowId={(row) => row.id}
                            pageSize={10}
                            rowsPerPageOptions={[5, 10, 20]}
                            checkboxSelection
                            disableSelectionOnClick
                            resizable={false}
                            getRowClassName={() => 'row-cell'}
                            sx={{
                                'width': '85%',
                                '& .MuiDataGrid-columnHeader': {
                                    backgroundColor: 'purple',
                                },
                                '& .header-cell': {
                                    backgroundColor: 'purple',
                                    color: 'white',
                                    fontWeight: 'bold',
                                }
                            }}
                        />
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default Admin;