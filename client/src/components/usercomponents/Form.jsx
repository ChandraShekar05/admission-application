import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import {TextField,Button,MenuItem,Select,InputLabel,FormControl,Container,Box,Paper} from '@mui/material';
import Thankyou from './Thankyou';

const inputProps = {
    sx: {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2C3333',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2C3333',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2C3333',
        },
    },
};

export default function Form({ courses }) {
    // Personal Information
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');

    // Educational Qualifications
    const [highestQualification, setHighestQualification] = useState('');
    const [yearOfPassing, setYearOfPassing] = useState('');
    const [percentageCGPA, setPercentageCGPA] = useState('');

    // Course Preferences
    const [preferredCourse, setPreferredCourse] = useState('');
    const [reason, setReason] = useState('');

    // Referral Information
    const [howDidYouHearAboutUs, setHowDidYouHearAboutUs] = useState('');

    const [isSubmitted, setIsSubmitted] = useState(false);

    const collectData = async (e) => {
        e.preventDefault();
        try {
            let result = await fetch('http://localhost:3001/api/applications', {
                method: 'post',
                body: JSON.stringify({
                    fullName,
                    contactInformation: {
                        emailAddress,
                        phoneNumber,
                    },
                    dateOfBirth,
                    gender,
                    highestQualification: {
                        qualification: highestQualification,
                        yearOfPassing,
                        percentageCGPA,
                    },
                    preferredCourse: {
                        course: preferredCourse,
                        reason,
                    },
                    howDidYouHearAboutUs: {
                        source: howDidYouHearAboutUs,
                    },
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            result = await result.json();
            localStorage.setItem('applicantData', JSON.stringify(result));

            // Reset form fields
            setFullName('');
            setEmailAddress('');
            setPhoneNumber('');
            setDateOfBirth('');
            setGender('');
            setHighestQualification('');
            setYearOfPassing('');
            setPercentageCGPA('');
            setPreferredCourse('');
            setReason('');
            setHowDidYouHearAboutUs('');

            sendMail();
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting form: ', error);
        }
    };

    const sendMail = () => {
        axios
            .get('http://localhost:3001/api/send-email', {
                params: {
                    emailAddress,
                    fullName,
                },
            })
            .then(() => {
                console.log('Email sent successfully');
            })
            .catch((error) => {
                console.log('Error sending email: ', error);
            });
    };

    if (isSubmitted) {
        return <Thankyou />;
    }

    return (
        <Box component="main" sx={{ py: 4, background: "#E7F6F2", width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container sx={{ width: 'auto' }}>
                <Paper elevation={3} sx={{ borderRadius: 5, padding: 4 }}>
                    <form onSubmit={collectData}>
                        <Grid container spacing={2}>
                            {/* Full Name */}
                            <Grid item xs={12}>
                                <TextField
                                    label="Full Name"
                                    variant="outlined"
                                    fullWidth
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    InputProps={inputProps}
                                />
                            </Grid>

                            {/* Email Address */}
                            <Grid item xs={12}>
                                <TextField
                                    label="Email Address"
                                    variant="outlined"
                                    fullWidth
                                    type="email"
                                    value={emailAddress}
                                    onChange={(e) => setEmailAddress(e.target.value)}
                                    required
                                    InputProps={inputProps}
                                />
                            </Grid>

                            {/* Phone Number */}
                            <Grid item xs={12}>
                                <TextField
                                    label="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    InputProps={inputProps}
                                />
                            </Grid>

                            {/* Date of Birth and Gender in same row */}
                            <Grid item xs={6}>
                                <TextField
                                    label="Date of Birth"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                    fullWidth
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    required
                                    InputProps={inputProps}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        label="Gender"
                                        required
                                        {...inputProps}
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Educational Qualifications */}
                            <Grid item xs={4}>
                                <TextField
                                    label="Highest Qualification"
                                    variant="outlined"
                                    fullWidth
                                    value={highestQualification}
                                    onChange={(e) => setHighestQualification(e.target.value)}
                                    required
                                    InputProps={inputProps}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Year of Passing"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    value={yearOfPassing}
                                    onChange={(e) => setYearOfPassing(e.target.value)}
                                    required
                                    InputProps={inputProps}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Percentage/CGPA"
                                    variant="outlined"
                                    fullWidth
                                    value={percentageCGPA}
                                    onChange={(e) => setPercentageCGPA(e.target.value)}
                                    required
                                    InputProps={inputProps}
                                />
                            </Grid>

                            {/* Preferred Course and Reason */}
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Preferred Course</InputLabel>
                                    <Select
                                        value={preferredCourse}
                                        onChange={(e) => setPreferredCourse(e.target.value)}
                                        label="Preferred Course"
                                        required
                                        {...inputProps}
                                    >
                                        {courses.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Referral Information */}
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>How Did You Hear About Us?</InputLabel>
                                    <Select
                                        value={howDidYouHearAboutUs}
                                        onChange={(e) => setHowDidYouHearAboutUs(e.target.value)}
                                        label="How Did You Hear About Us?"
                                        required
                                        {...inputProps}
                                    >
                                        <MenuItem value="Social Media">Social Media</MenuItem>
                                        <MenuItem value="Friend/Family Referral">Friend/Family Referral</MenuItem>
                                        <MenuItem value="Advertisement">Advertisement</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Reason for Choosing"
                                    variant="outlined"
                                    fullWidth
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    required
                                    multiline
                                    rows={3}
                                    InputProps={inputProps}
                                />
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12}>
                                
                                <Button
                                    variant="contained"
                                    // color="primary"
                                    type="submit"
                                    sx={{
                                        py:1,
                                        backgroundColor: '#4D6666', 
                                        color: '#E7F6F2',
                                        fontSize: '1rem',
                                        fontWeight: 'bold'

                                    }}
                                    fullWidth
                                >
                                    SUBMIT
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}


