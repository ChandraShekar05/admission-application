import { useState } from "react"
// import { getAllCourses } from "../../services/coursesApi"
import { deleteCourse } from "../../services/coursesApi"
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
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

import AlertDialog from "./DialogBox"
import FormDialog from "./FormDialog"

const commonCellStyles = {
    p: 1.5,
    fontSize: "1rem",
    color: "#E7F6F2",
    fontWeight: "bold",
}

const CourseTable = ({ courses, setCourses }) => {
    // const [courses, setCourses] = useState([])
    const [openForm, setOpenForm] = useState(false)
    const [open, setOpen] = useState(false) // State to control dialog visibility
    const [selectedCourse, setSelectedCourse] = useState({})
    const [editCourse, setEditCourse] = useState(false)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const paginatedCourses = courses.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    )

    const handleDelete = (id) => {
        deleteCourse(id)
            .then(() => {
                setCourses(courses.filter((course) => course.id !== id))
            })
            .catch((error) => console.error("Error deleting Course:", error))
    }
    const handleDeleteClick = (id, name) => {
        setSelectedCourse({ id, name }) // Set the ID of the row to be deleted
        setOpen(true) // Open the dialog
    }
    const handleClose = () => {
        if (open) {
            setOpen(false) // Close the dialog'=
            setSelectedCourse({})
        } else if (openForm) {
            setOpenForm(false) // Close the dialog'=
            setEditCourse(false)
            // setSelectedCourse({})
        }
    }

    // useEffect(() => {
    //     getAllCourses()
    //         .then((data) => setCourses(data))
    //         .catch((error) => console.error("Error Fetchingn users:", error))
    // }, [])

    return (
        <Box sx={{ background: "#E7F6F2", py: 5 }}>
            <Container>
                <Typography sx={{ mb: 3 }} variant="h3" color="#2C3333">
                    Courses Data
                </Typography>
                <Button
                    sx={{
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                    }}
                    variant="contained"
                    color="success"
                    onClick={() => setOpenForm(true)}
                >
                    <AddCircleOutlineIcon sx={{ mr: 1 }} />
                    Add New Course
                </Button>
                <TableContainer
                    elevation={3}
                    sx={{ borderRadius: 5, my: 1 }}
                    component={Paper}
                >
                    <Table sx={{}} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ background: "#2C3333" }}>
                                <TableCell
                                    sx={{ ...commonCellStyles, width: "20%" }}
                                >
                                    Course Name
                                </TableCell>
                                <TableCell
                                    sx={{ ...commonCellStyles, width: "5%" }}
                                >
                                    Duration
                                </TableCell>
                                <TableCell
                                    sx={{ ...commonCellStyles, width: "5%" }}
                                >
                                    Amount
                                </TableCell>
                                <TableCell
                                    sx={{ ...commonCellStyles, width: "65%" }}
                                >
                                    Description
                                </TableCell>
                                <TableCell
                                    sx={{ ...commonCellStyles, width: "5%" }}
                                ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedCourses.map((row) => (
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
                                    <TableCell
                                        sx={{ textTransform: "capitalize" }}
                                    >
                                        {row.duration}
                                    </TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell
                                        sx={{ display: "flex" }}
                                        align="left"
                                    >
                                        <IconButton
                                            onClick={() =>
                                                handleDeleteClick(
                                                    row.id,
                                                    row.name
                                                )
                                            }
                                            sx={{ color: "error.light" }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                setEditCourse(true)
                                                setSelectedCourse(row)
                                                setOpenForm(true)
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
                        count={courses.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
                <FormDialog
                    openForm={openForm}
                    handleClose={handleClose}
                    setCourses={setCourses}
                    selectedCourse={selectedCourse}
                    editCourse={editCourse}
                />
                <AlertDialog
                    open={open}
                    deleteCourse={selectedCourse}
                    handleClose={handleClose}
                    handleDelete={() => handleDelete(selectedCourse.id)}
                />
            </Container>
        </Box>
    )
}

export default CourseTable
