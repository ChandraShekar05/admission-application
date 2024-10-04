import { useState, useEffect } from "react";
import { getAllAdmins, createAdmin, deleteAdmin, updateAdmin } from "../../services/superAdminApi"; // Adjust the import path as necessary
import {
    Container,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    Paper,
    TableCell,
    TableBody,
    IconButton,
    Button,
    Box,
    Typography,
    TablePagination,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const commonCellStyles = {
    p: 1.5,
    fontSize: "1rem",
    color: "#E7F6F2",
    fontWeight: "bold",
};

const AdminTable = ({ admins, setAdmins }) => {
    const [openForm, setOpenForm] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState({ id: '', name: '', email: '', password: '', role: '' });
    const [editAdmin, setEditAdmin] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedAdmins = admins.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this admin?")) {
            deleteAdmin(id)
                .then(() => {
                    setAdmins(admins.filter((admin) => admin.id !== id));
                })
                .catch((error) => console.error("Error deleting admin:", error));
        }
    };

    const handleFormSubmit = () => {
        if (editAdmin) {
            updateAdmin(selectedAdmin.id, selectedAdmin)
                .then((updatedAdmin) => {
                    setAdmins(admins.map(admin => admin.id === updatedAdmin.id ? updatedAdmin : admin));
                    handleClose();
                    fetchAdmins();
                })
                .catch((error) => console.error("Error updating admin:", error));
        } else {
            createAdmin(selectedAdmin.name, selectedAdmin.email, selectedAdmin.password)
                .then((newAdmin) => {
                    setAdmins([...admins, newAdmin]);
                    handleClose();
                    fetchAdmins();
                })
                .catch((error) => console.error("Error adding admin:", error));
        }
    };

    const handleClose = () => {
        setOpenForm(false);
        setEditAdmin(false);
        setSelectedAdmin({ id: '', name: '', email: '', password: '', role: '' });
    };
    const fetchAdmins = async () => {
        try {
            const data = await getAllAdmins();
            setAdmins(data);
        } catch (error) {
            console.error("Error fetching admins:", error);
        }
    };

    // Fetch admins on component mount
    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <Box sx={{ background: "#E7F6F2", display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Container sx={{ textAlign: 'center' }}>
                <Typography sx={{ mb: 2 }} variant="h3" color="#2C3333">
                    Admins Data
                </Typography>
                <Button
                    sx={{
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        margin: '1rem auto',
                    }}
                    variant="contained"
                    color="success"
                    onClick={() => setOpenForm(true)}
                >
                    <AddCircleOutlineIcon sx={{ mr: 1 }} />
                    Add New Admin
                </Button>
                <TableContainer
                    elevation={3}
                    sx={{ borderRadius: 5, my: 1, width: '70%', margin: '0 auto' }} // Adjust the width here
                    component={Paper}
                >
                    <Table sx={{}} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ background: "#2C3333" }}>
                                <TableCell
                                    sx={{ ...commonCellStyles, width: "20%" }}
                                >
                                    Admin Name
                                </TableCell>
                                <TableCell
                                    sx={{ ...commonCellStyles, width: "20%" }}
                                >
                                    Email
                                </TableCell>
                                <TableCell
                                    sx={{ ...commonCellStyles, width: "20%" }}
                                >
                                    Role
                                </TableCell>
                                <TableCell
                                    sx={{ ...commonCellStyles, width: "20%" }}
                                ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedAdmins.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                        "& > *": { p: 2, fontSize: "0.9rem" },
                                    }}
                                >
                                    <TableCell sx={{ fontWeight: "bold" }}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.role}</TableCell>
                                    <TableCell
                                        sx={{ display: "flex" }}
                                        align="left"
                                    >
                                        <IconButton
                                            onClick={() => handleDelete(row.id)}
                                            sx={{ color: "error.light" }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                setEditAdmin(true);
                                                setSelectedAdmin({
                                                    id: row.id,
                                                    name: row.name || '',
                                                    email: row.email || '',
                                                    password: '',
                                                    role: row.role || ''
                                                });
                                                setOpenForm(true);
                                            }}
                                            sx={{ color: "#17A2B8" }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={admins.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
                <Dialog open={openForm} onClose={handleClose}>
                    <DialogTitle>{editAdmin ? "Edit Admin" : "Add New Admin"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Name"
                            type="text"
                            fullWidth
                            value={selectedAdmin.name}
                            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, name: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            type="email"
                            fullWidth
                            value={selectedAdmin.email}
                            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, email: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Password"
                            type="password"
                            fullWidth
                            value={selectedAdmin.password}
                            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, password: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleFormSubmit} color="primary">
                            {editAdmin ? "Update" : "Add"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default AdminTable;