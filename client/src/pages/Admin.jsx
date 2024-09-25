import { useState, useEffect } from "react"
import {
    Box,
    Typography,
    Button,
    Paper,
    IconButton,
    Alert,
    Container,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import Chip from "@mui/material/Chip"
// import Navbar from "../components/admin/Navbar"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Link } from "react-router-dom"
import { getApplicants } from "../services/applicantsApi"
import { sendMail } from "../services/mailApi"
import { getAllCourses } from "../services/coursesApi"

import CourseTable from "../components/admin/CourseTable"

const Admin = () => {
    const [applicants, setApplicants] = useState([])
    const [selectedApplicants, setSelectedApplicants] = useState([])
    const [courses, setCourses] = useState([])
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const paginationModel = { page: 0, pageSize: 5 }

    useEffect(() => {
        getApplicants()
            .then((applicants) => {
                setApplicants(applicants)
            })
            .catch((error) =>
                console.error("Error fetching applicants:", error)
            )

        getAllCourses()
            .then((courses) => {
                setCourses(courses)
            })
            .catch((error) => console.error("Error fetching courses:", error))
    }, [])

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "open":
                return "primary"
            case "followup":
            case "mail sent":
                return "warning"
            case "accepted":
                return "success"
            case "rejected":
                return "error"
            default:
                return "default"
        }
    }

    const handleSendMail = async () => {
        try {
            const emails = selectedApplicants.map((id) => {
                const applicant = applicants.find(
                    (applicant) => applicant.id === id
                )
                return {
                    email: applicant.contactInformation.emailAddress,
                    fullName: applicant.fullName,
                    status: applicant.status,
                }
            })
            await sendMail(emails)
            setShowSuccessAlert(true)
        } catch (error) {
            console.error("Error sending emails:", error)
            alert("Failed to send emails")
        }
    }

    const columns = [
        {
            field: "fullName",
            headerName: "Full Name",
            width: 200,
            resizable: false,
            fontWeight: "bold",
            headerClassName: "header-cell",
        },
        {
            field: "email",
            headerName: "Email",
            width: 200,
            resizable: false,
            fontWeight: "bold",
            headerClassName: "header-cell",
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            width: 150,
            resizable: false,
            fontWeight: "bold",
            headerClassName: "header-cell",
        },
        {
            field: "course",
            headerName: "Preferred Course",
            width: 180,
            cellClassName: "preferred-course-column",
            resizable: false,
            fontWeight: "bold",
            headerClassName: "header-cell",
        },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            resizable: false,
            fontWeight: "bold",
            headerClassName: "header-cell",
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    sx={{ width: "15ch", fontWeight: "bold" }}
                    color={getStatusColor(params.value)}
                />
            ),
        },
        {
            field: "lastUpdatedBy",
            headerName: "Last Updated By",
            width: 150,
            resizable: false,
            fontWeight: "bold",
            headerClassName: "header-cell",
        },
        {
            field: "view",
            headerName: "View",
            resizable: false,
            headerClassName: "header-cell",
            sortable: false, // Disables sorting
            filterable: false, // Disables filtering
            disableColumnMenu: true, // Disables column menu (three dots)
            hideSortIcons: true, // Hides the sort icons
            renderCell: (params) => (
                <IconButton
                    component={Link}
                    to={`/admin/applicants/${params.row.id}`}
                    sx={{ "&:hover": { backgroundColor: "white" } }}
                >
                    <ChevronRightIcon />
                </IconButton>
            ),
        },
    ]

    const rows = applicants.map((applicant) => {
        return {
            id: applicant.id,
            fullName: applicant.fullName,
            email: applicant.contactInformation.emailAddress,
            phoneNumber: applicant.contactInformation.phoneNumber,
            course: applicant.preferredCourse.course.name,
            status: applicant.status,
            lastUpdatedBy: applicant.lastUpdatedBy,
        }
    })

    return (
        <Box>
            {/* <Navbar /> */}
            <Container sx={{ justifyItems: "center" }}>
                {showSuccessAlert && (
                    <Alert severity="success">Mail sent successfully.</Alert>
                )}
                <Box
                    id="applications"
                    sx={{
                        my: 4,
                        p: 0,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h3" color="#2C3333" sx={{ mb: 3 }}>
                        Applications Data
                    </Typography>
                    {selectedApplicants.length > 0 && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSendMail}
                        >
                            send mail
                        </Button>
                    )}
                    <Paper
                        elevation={3}
                        sx={{
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 3,
                            width: "100%",
                            overflowX: "auto",
                        }}
                    >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowId={(row) => row.id}
                            pagination
                            // paginationModel={paginationModel}
                            // onPaginationModelChange={(newPaginationModel) =>
                            //     setPaginationModel(newPaginationModel)
                            // }
                            // pageSizeOptions={[5, 10]}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            disableSelectionOnClick
                            resizable={false}
                            getRowClassName={() => "row-cell"}
                            // isRowSelectable={(params) => params.row.status !== 'Accepted' && params.row.status !== 'Rejected' }
                            onRowSelectionModelChange={(
                                newRowSelectionModel
                            ) => {
                                console.log(newRowSelectionModel)
                                setSelectedApplicants(newRowSelectionModel)
                            }}
                            sx={{
                                border: "none",
                                "& .MuiDataGrid-columnHeader": {
                                    backgroundColor: "#2C3333",
                                },
                                "& .header-cell": {
                                    // backgroundColor: 'purple',
                                    p: 1.5,
                                    fontSize: "1rem",
                                    color: "#E7F6F2",
                                    fontWeight: "bold",
                                },
                                "& .MuiDataGrid-sortIcon": {
                                    color: "#E7F6F2", // Sort arrow color
                                },
                                "& .MuiDataGrid-menuIcon": {
                                    color: "#E7F6F2", // Column menu icon color
                                },
                                "& .MuiDataGrid-menuIconButton": {
                                    color: "#E7F6F2", // Color of the menu button when clicked
                                },
                                "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-checkboxInput svg":{
                                    color: "#E7F6F2", // Header checkbox color
                                }
                            }}
                        />
                    </Paper>
                </Box>
            </Container>
            <CourseTable courses={courses} setCourses={setCourses} />

        </Box>
    )
}

export default Admin
