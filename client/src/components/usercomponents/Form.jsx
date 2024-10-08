import { useState} from "react"
import axios from "axios"
import Grid from "@mui/material/Grid"
import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Container,
    Box,
    Paper,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material"
import Thankyou from "./Thankyou"

const inputProps = {
    sx: {
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2C3333",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2C3333",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2C3333",
        },
    },
}

export default function Form({ courses }) {
    // Personal Information
    const [fullName, setFullName] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [gender, setGender] = useState("")

    // Educational Qualifications
    const [highestQualification, setHighestQualification] = useState("")
    const [yearOfPassing, setYearOfPassing] = useState("")
    const [percentageCGPA, setPercentageCGPA] = useState("")

    // Course Preferences
    const [preferredCourse, setPreferredCourse] = useState("")
    const [reason, setReason] = useState("")

    // Referral Information
    const [howDidYouHearAboutUs, setHowDidYouHearAboutUs] = useState("")

    // Snackbar state
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const [isSubmitted, setIsSubmitted] = useState(false)

    // Close snackbar function
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }

    // Validation function
    const validateForm = () => {
        if (fullName.length > 20) {
            setErrorMessage("Full Name should be less than 20 characters")
            setOpenSnackbar(true)
            return false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(emailAddress)) {
            setErrorMessage("Please enter a valid email address")
            setOpenSnackbar(true)
            return false
        }
        const phoneRegex = /^[0-9]{10}$/
        if (!phoneRegex.test(phoneNumber)) {
            setErrorMessage("Phone number should be a valid 10-digit number")
            setOpenSnackbar(true)
            return false
        }
        if (!dateOfBirth) {
            setErrorMessage("Please enter your date of birth")
            setOpenSnackbar(true)
            return false
        }
        if (!gender) {
            setErrorMessage("Please select your gender")
            setOpenSnackbar(true)
            return false
        }
        if (!highestQualification || !yearOfPassing || !percentageCGPA) {
            setErrorMessage(
                "Please fill in all fields for educational qualifications"
            )
            setOpenSnackbar(true)
            return false
        }
        if (!preferredCourse || !reason) {
            setErrorMessage("Please select a preferred course and provide a reason")
            setOpenSnackbar(true)
            return false
        }
        if (!howDidYouHearAboutUs) {
            setErrorMessage("Please let us know how you heard about us")
            setOpenSnackbar(true)
            return false
        }
        return true
    }

    const collectData = async (e) => {
        e.preventDefault()

        // Perform form validation
        if (!validateForm()) {
            return
        }

        try {
            let result = await fetch("http://localhost:3001/api/applications", {
                method: "post",
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
                    "Content-Type": "application/json",
                },
            })

            result = await result.json()
            localStorage.setItem("applicantData", JSON.stringify(result))

            // Reset form fields
            setFullName("")
            setEmailAddress("")
            setPhoneNumber("")
            setDateOfBirth("")
            setGender("")
            setHighestQualification("")
            setYearOfPassing("")
            setPercentageCGPA("")
            setPreferredCourse("")
            setReason("")
            setHowDidYouHearAboutUs("")

            sendMail()
            setIsSubmitted(true)
        } catch (error) {
            console.error("Error submitting form: ", error)
        }
    }

    const sendMail = () => {
        axios
            .get("http://localhost:3001/api/send-email", {
                params: {
                    emailAddress,
                    fullName,
                    status: "open",
                },
            })
            .then(() => {
                console.log("Email sent successfully")
            })
            .catch((error) => {
                console.log("Error sending email: ", error)
            })
    }

    if (isSubmitted) {
        return <Thankyou />
    }
    return (
        <Box
            component="main"
            sx={{
                py: 4,
                background: "rgba(245, 245, 245, 0.7)",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                userSelect: 'none'
            }}
        >
            <Container sx={{ width: "auto" }}>
                <Typography
                    sx={{
                        color: "#395B64",
                        mb: 2,
                        fontSize: "2rem",
                        fontWeight: "bold",
                    }}
                >
                    Enhance Your Skills<Typography sx={{
                        color: "#A5C9CA",
                        mb: 2,
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                    }} >Enroll Now</Typography>
                </Typography>
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
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setEmailAddress(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setDateOfBirth(e.target.value)
                                    }
                                    required
                                    InputProps={inputProps}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        value={gender}
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                        label="Gender"
                                        required
                                        {...inputProps}
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">
                                            Female
                                        </MenuItem>
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
                                    onChange={(e) =>
                                        setHighestQualification(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setYearOfPassing(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setPercentageCGPA(e.target.value)
                                    }
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
                                        onChange={(e) =>
                                            setPreferredCourse(e.target.value)
                                        }
                                        label="Preferred Course"
                                        required
                                        {...inputProps}
                                    >
                                        {courses.map((item) => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Referral Information */}
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>
                                        How Did You Hear About Us?
                                    </InputLabel>
                                    <Select
                                        value={howDidYouHearAboutUs}
                                        onChange={(e) =>
                                            setHowDidYouHearAboutUs(
                                                e.target.value
                                            )
                                        }
                                        label="How Did You Hear About Us?"
                                        required
                                        {...inputProps}
                                    >
                                        <MenuItem value="Social Media">
                                            Social Media
                                        </MenuItem>
                                        <MenuItem value="Friend/Family Referral">
                                            Friend/Family Referral
                                        </MenuItem>
                                        <MenuItem value="Advertisement">
                                            Advertisement
                                        </MenuItem>
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
                            <Grid item xs={12}sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        py: 1,
                                        backgroundColor: "black",
                                        color: "#E7F6F2",
                                        fontSize: "1rem",
                                        fontWeight: "bold",
                                        
                                    }}
                                >
                                    SUBMIT
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
            {/* Snackbar for error messages */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    sx={{ backgroundColor: '#000', color: '#fff' }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>

        </Box>
    )
}















