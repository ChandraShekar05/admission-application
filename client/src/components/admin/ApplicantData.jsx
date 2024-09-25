import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { getApplicantById } from '../../services/applicantsApi'; 
import SpanningTable from './SpanningTable'; // Adjust the import path as needed

const ApplicantData = () => {
    const { id } = useParams();
    const [applicant, setApplicant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        { label: 'Gender', value: applicant.gender},
        { label: 'Phone Number', value: applicant.contactInformation.phoneNumber },
        { label: 'Qualification', value: applicant.highestQualification.qualification },
        { label: 'Year of Passing', value: applicant.highestQualification.yearOfPassing },
        { label: 'CGPA', value: applicant.highestQualification.percentageCGPA },
        { label: 'Preferred Course', value: applicant.preferredCourse.course.name },
        { label: 'Reason for Interest', value: applicant.preferredCourse.reason },
        { label: 'Status', value: applicant.status },
        { label: 'How did you hear about us?', value: applicant.howDidYouHearAboutUs.source },
        { label: 'Last Updated By', value: applicant.lastUpdatedBy },
        { label: 'Last Updated At', value: applicant.updatedAt },
        { label: 'Created At', value: applicant.createdAt },
    ];

    return (
        <Container >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', // Full viewport height
                }}
            >
                <Box sx={{userSelect:'none', my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{fontWeight: 'bold'}}>
                        Applicant Details
                    </Typography>
                    <SpanningTable rows={rows} applicantId={id} onUpdate={fetchApplicantData} />
                </Box>
            </Box>
        </Container>
    );
};

export default ApplicantData;