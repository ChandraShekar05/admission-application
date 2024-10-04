import { useState, useEffect } from "react"
import {
    Box,
    Typography,
    Button,
    Paper,
    IconButton,
    Snackbar,
    Alert,
    Container,
    Select,
    MenuItem,
    Chip,
    Toolbar,
    TextField,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Link } from "react-router-dom"
import { getApplicants, updateApplicantStatus } from "../services/applicantsApi"
import { sendMail } from "../services/mailApi"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';

const Admin = () => {
    const [applicants, setApplicants] = useState([])
    const [selectedApplicants, setSelectedApplicants] = useState([])
    const [statusChanges, setStatusChanges] = useState({})
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [filterStatus, setFilterStatus] = useState('')
    const [filterText, setFilterText] = useState('')
    const paginationModel = { page: 0, pageSize: 10 }

    useEffect(() => {
        getApplicants()
            .then((applicants) => {
                setApplicants(applicants)
            })
            .catch((error) =>
                console.error("Error fetching applicants:", error)
            )
    }, [])

    const handleStatusChange = (id, newStatus) => {
        setStatusChanges((prev) => ({ ...prev, [id]: newStatus }))
    }

    const handleUpdateStatus = async (id) => {
        const newStatus = statusChanges[id]
        if (newStatus) {
            try {
                const response = await updateApplicantStatus(id, newStatus)
                setApplicants((prev) =>
                    prev.map((applicant) =>
                        applicant.id === id ? response : applicant

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

    const handleFilterChange = (event) => {
        const selectedStatus = event.target.value
        setFilterStatus(selectedStatus)
    };

    const commonStyles = {
        display: "flex",
        justifyContent: "center",
        border: "none",
        my: "10px",
        "& .MuiSelect-select": { padding: "0" },
        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    };

    const getStatusColor = (status) => {   
        switch (status) {
            case "Open":
                return "primary"
            case "Followup":
                return "warning"
            case "Mail Sent":
                return "warning"
            case "Accepted":
                return "success"
            case "Rejected":
                return "error"
            default:
                return "default"
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
            width: 250,
            resizable: false,
            fontWeight: "bold",
            headerClassName: "header-cell",
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: '8px' }}>
                <Typography sx={{ fontSize: 'small'}}>{params.value}</Typography>
                    <IconButton
                        onClick={() => navigator.clipboard.writeText(params.value)}
                        sx={{ ml: 1 }}
                    >
                        <ContentCopyIcon sx={{fontSize: 'medium'}} />
                    </IconButton>
                </Box>
            ),
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            width: 200,
            resizable: false,
            fontWeight: "bold",
            headerClassName: "header-cell",
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: '8px' }}>
                    <Typography sx={{ fontSize: 'small'}}>{params.value}</Typography>
                    <IconButton
                        component="a"
                        href={`https://wa.me/${params.value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ ml: 1, fontSize: 'small' }}
                    >
                        <WhatsAppIcon sx={{fontSize: 'medium'}} color="success" />
                    </IconButton>
                </Box>
            ),
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
                    sx={commonStyles}
                >
                    {["Open", "Followup", "Mail Sent", "Accepted", "Rejected"].map((status) => (
                        <MenuItem key={status} value={status}>
                            <Chip label={status} color={getStatusColor(status)} sx={{ margin: "auto", width: "15ch" }} />
                        </MenuItem>
                    ))}
                </Select>
            ),
        },
        {
            field: "remarks",
            headerName: "Remarks",
            width: 150,
            resizable: false,
            fontWeight: "bold",
            headerClassName: "header-cell",
            renderCell: (params) => (
                <Typography sx={{ fontSize: 'medium', my: 2 }}>
                    {params.value.length > 0 ? params.value[params.value.length - 1] : "No remarks"}
                </Typography>
            ),
        },
        {
            field: "action",
            headerName: "Action",
            width: 120,
            resizable: false,
            fontWeight: "bold",
            sortable: false, // Disables sorting
            filterable: false, // Disables filtering
            disableColumnMenu: true, // Disables column menu (three dots)
            hideSortIcons: true,
            headerClassName: "header-cell",
            renderCell: (params) => (
                <Button
                    variant="contained"
                    sx={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        background: "#2c3333",
                        transition: "0.3s",
                        "&:hover": {
                            transform: "scale(1.02)",
                            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                        },
                    }}
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

    const filteredRows = applicants
        .filter((applicant) => {
            const filterValue = filterText.toLowerCase();
            const statusFilter = filterStatus.toLowerCase();
            const statusMatches = statusFilter === "" || applicant.status.toLowerCase() === statusFilter;
            const textMatches = applicant.status.toLowerCase().includes(filterValue);

            return statusMatches && textMatches;
        })
        .map((applicant) => {
            return {
                id: applicant.id,
                fullName: applicant.fullName,
                email: applicant.contactInformation.emailAddress,
                phoneNumber: applicant.contactInformation.phoneNumber,
                course: applicant.preferredCourse.course.name,
                status: applicant.status,
                remarks: applicant.remarks,
            }
        })

    return (
        <Box >
            <Container sx={{ justifyItems: "center" }}>
                <Snackbar
                    open={showSuccessAlert}
                    autoHideDuration={3000}
                    onClose={() => setShowSuccessAlert(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={() => setShowSuccessAlert(false)} severity="success" sx={{ width: '300px' }}>
                        Mail sent successfully.
                    </Alert>
                </Snackbar>
                <Box
                    id="applications"
                    className="send-mail-container"
                    sx={{
                        my: 4,
                        p: 0,
                        display: "flex",
                        flexDirection: "column",
                        
                    }}
                >
                    <Typography variant="h3" color="#2C3333" sx={{ mb: 1 }}>
                        Applications Data
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between"}}>
                        {selectedApplicants.length >= 0 && (
                        <Button
                            variant="rounded"
                            color="#2C3333"
                            sx={{
                                backgroundColor: "#2C3333",
                                color: "white",   
                                '& .MuiButtonBase-root' :{
                                    padding: 0,
                                },
                                mb: 3,
                                fontWeight: "bold",
                                opacity: selectedApplicants.length > 0 ? 1 : 0,
                                transition: "opacity 0.5s ease-in-out",
                            }}
                            onClick={handleSendMail}
                        >
                            Send Mail
                        </Button>
                        )}
                        <Toolbar sx={{ justifyContent: "flex-end" }}>
                            <Select
                                label="Filter by Status"
                                variant="outlined"
                                value={filterStatus}
                                onChange={handleFilterChange}
                                size="small"
                                displayEmpty
                                sx={{ minWidth: 150 }}
                            >
                                <MenuItem value="">Filter By Status</MenuItem>
                                <MenuItem value="Open">Open</MenuItem>
                                <MenuItem value="Followup">Followup</MenuItem>
                                <MenuItem value="Mail Sent">Mail Sent</MenuItem>
                                <MenuItem value="Accepted">Accepted</MenuItem>
                                <MenuItem value="Rejected">Rejected</MenuItem>
                            </Select>
                        </Toolbar>
                    </Box>
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
                            rows={filteredRows}
                            columns={columns}
                            getRowId={(row) => row.id}
                            pagination
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            disableSelectionOnClick
                            resizable={false}
                            getRowClassName={() => "row-cell"}
                            onRowSelectionModelChange={(
                                newRowSelectionModel
                            ) => {
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
                                "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-checkboxInput svg":
                                    {
                                        color: "#E7F6F2", // Header checkbox color
                                    },
                            }}
                        />
                    </Paper>
                </Box>
            </Container>
        </Box>
    )
}

export default Admin
