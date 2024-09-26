import { useState, useEffect } from "react"
import {
    Box,
    Typography,
    Button,
    Paper,
    IconButton,
    Alert,
    Container,
    Select,
    MenuItem,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import Chip from "@mui/material/Chip"
// import Navbar from "../components/admin/Navbar"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Link } from "react-router-dom"
import { getApplicants, updateApplicantStatus } from "../services/applicantsApi"
import { sendMail } from "../services/mailApi"

const Admin = () => {
    const [applicants, setApplicants] = useState([])
    const [selectedApplicants, setSelectedApplicants] = useState([])
    const [statusChanges, setStatusChanges] = useState({})
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

    const handleStatusChange = (id, newStatus) => {
        setStatusChanges((prev) => ({ ...prev, [id]: newStatus }))
    }

    const handleUpdateStatus = async (id) => {
        const newStatus = statusChanges[id]
        if (newStatus) {
            try {
                await updateApplicantStatus(id, newStatus)
                setApplicants((prev) =>
                    prev.map((applicant) =>
                        applicant.id === id
                            ? { ...applicant, status: newStatus }
                            : applicant
                    )
                )
            } catch (error) {
                console.error("Error updating status:", error)
                alert("Failed to update status")
            }
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
            setTimeout(() => setShowSuccessAlert(false), 3000)
            setSelectedApplicants([])
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
                <Select
                    value={statusChanges[params.row.id] || params.value}
                    onChange={(e) =>
                        handleStatusChange(params.row.id, e.target.value)
                    }
                    fullWidth
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        border: 'none', 
                        my: '10px',
                        '& .MuiSelect-select': { padding: '0' },
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                    
                >
                    <MenuItem value="Open" >
                        <Chip label="Open" color="primary" sx={{ margin: 'auto', width: '15ch' }} />
                    </MenuItem>
                    <MenuItem value="Followup">
                        <Chip label="Followup" color="warning" sx={{ margin: 'auto', width: '15ch' }} />
                    </MenuItem>
                    <MenuItem value="Mail Sent">
                        <Chip label="Mail Sent" color="warning" sx={{ margin: 'auto', width: '15ch' }} />
                    </MenuItem>
                    <MenuItem value="Accepted">
                        <Chip label="Accepted" color="success" sx={{ margin: 'auto', width: '15ch' }} />
                    </MenuItem>
                    <MenuItem value="Rejected">
                        <Chip label="Rejected" color="error" sx={{ my: 'auto', width: '15ch' }} />
                    </MenuItem>
                </Select>
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
            field: "action",
            headerName: "Action",
            width: 150,
            resizable: false,
            fontWeight: "bold",
            sortable: false, // Disables sorting
            filterable: false, // Disables filtering
            disableColumnMenu: true, // Disables column menu (three dots)
            hideSortIcons: true,
            headerClassName: "header-cell",
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    sx={{backgroundColor: "#2c3333",fontWeight: 'bold', color: "white"}}
                    onClick={(event) => {
                        event.stopPropagation()
                        handleUpdateStatus(params.row.id)
                    }}
                >
                    Update
                </Button>
            ),
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
                            sx={
                                { 
                                    mb: 3,
                                    fontWeight: 'bold',
                                    width: 'fit-content', 

                                }
                            }
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
                                // console.log(newRowSelectionModel)
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

        </Box>
    )
}

export default Admin
