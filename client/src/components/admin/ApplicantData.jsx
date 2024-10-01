import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, TextField, Button } from '@mui/material';
import { getApplicantById, updateApplicantStatus } from '../../services/applicantsApi';
import SpanningTable from './SpanningTable'; // Adjust the import path as needed

const ApplicantData = () => {
    const { id } = useParams();
    const [applicant, setApplicant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newRemark, setNewRemark] = useState('');
    const [showNewRemarkInput, setShowNewRemarkInput] = useState(false);

    const handleAddRemark = async () => {
        const status = applicant.status;
        if (newRemark.trim() !== '') {
            const newRemarkEntry = `${newRemark}`;
            try {
                await updateApplicantStatus(id, status, newRemarkEntry, applicant.lastUpdatedBy);
                setNewRemark('');
                setShowNewRemarkInput(false);
                fetchApplicantData(); // Fetch updated applicant data
            } catch (error) {
                console.error('Error adding remark:', error);
                setError(error);
            }
        }
    };

    const fetchApplicantData = () => {
        getApplicantById(id)
            .then((data) => setApplicant(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchApplicantData();
    }, [id]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error loading applicant details: {error.message}</Typography>;
    }

    const rows = [
        { label: 'Full Name', value: applicant.fullName },
        { label: 'Date of Birth', value: applicant.dateOfBirth },
        { label: 'Email', value: applicant.contactInformation.emailAddress },
        { label: 'Gender', value: applicant.gender },
        { label: 'Phone Number', value: applicant.contactInformation.phoneNumber },
        { label: 'Qualification', value: applicant.highestQualification.qualification },
        { label: 'Year of Passing', value: applicant.highestQualification.yearOfPassing },
        { label: 'CGPA', value: applicant.highestQualification.percentageCGPA },
        { label: 'Preferred Course', value: applicant.preferredCourse.course.name },
        { label: 'Reason for Interest', value: applicant.preferredCourse.reason },
        { label: 'Status', value: applicant.status },
        { label: 'Remarks', value: applicant.remarks.slice(-1)[0] || '' },
        { label: 'How did you hear about us?', value: applicant.howDidYouHearAboutUs.source },
        { label: 'Last Updated By', value: applicant.lastUpdatedBy },
        { label: 'Last Updated At', value: applicant.updatedAt },
        { label: 'Created At', value: applicant.createdAt },
    ];

    return (
        <Container >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 4,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '100%', // Full viewport height
                }}
            >
                <Box sx={{ userSelect: 'none', my: 4, mx: "0", maxWidth: '50vw', }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Applicant Details
                    </Typography>
                    <SpanningTable rows={rows} applicantId={id} onUpdate={fetchApplicantData} />
                </Box>
                <Box sx={{ margin: 0, height: '100%', marginTop: '100px', borderRadius: '10px' }}>
                        <Paper sx={{ p: 2, height: '50%', marginTop: '30px',position: 'fixed' }}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Remarks
                            </Typography>
                            <Box
                                sx={{
                                    mb: 2,
                                    height: '50%',
                                    maxHeight: '250px',
                                    overflow: 'auto',
                                    border: '1px solid rgba(0, 0, 0, 0.23)',
                                    borderRadius: '4px',
                                    padding: '16.5px 14px',
                                    backgroundColor: '#f5f5f5',
                                }}
                            >
                                {applicant.remarks.map((remark, index) => (
                                    <Typography key={index} variant="body2" component="p">
                                        {index + 1}. {remark}
                                    </Typography>
                                ))}
                            </Box>
                            {showNewRemarkInput && (
                                <TextField
                                    label="Enter new remark"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    value={newRemark}
                                    onChange={(e) => setNewRemark(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setShowNewRemarkInput(true)}
                                sx={{ mt: 2 }}
                            >
                                Add Remark
                            </Button>
                            {showNewRemarkInput && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleAddRemark}
                                    sx={{ mt: 2, ml: 2 }}
                                >
                                    Save Remark
                                </Button>
                            )}
                        </Paper>
                    </Box>
            </Box>
        </Container>
    );
};

export default ApplicantData;