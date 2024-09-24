import { useEffect, useState } from "react"
import { getAllCourses} from "../../services/coursesApi"
import { deleteCourse} from "../../services/coursesApi"
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
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

import AlertDialog from "./DialogBox"

const CourseTable = () => {
    const [courses, setCourses] = useState([])
    const [open, setOpen] = useState(false) // State to control dialog visibility
    const [selectedCourse, setSelectedCourse] = useState({})

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
        setOpen(false) // Close the dialog'=
        setSelectedCourse({})
    }

    useEffect(() => {
        getAllCourses()
            .then((data) => setCourses(data))
            .catch((error) => console.error("Error Fetchingn users:", error))
    }, [])

    return (
        <Container>
            <TableContainer elevation={3} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Course Name</TableCell>
                            <TableCell
                                align="left"
                                sx={{ width: "max-content" }}
                            >
                                Duration
                            </TableCell>
                            <TableCell align="left">Amount</TableCell>
                            <TableCell align="left">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ width: "max-content" }}
                                >
                                    {row.duration}
                                </TableCell>
                                <TableCell align="left">{row.amount}</TableCell>
                                <TableCell align="left">
                                    {row.description}
                                </TableCell>
                                <TableCell
                                    sx={{ display: "flex" }}
                                    align="left"
                                >
                                    <IconButton
                                        onClick={() =>
                                            handleDeleteClick(row.id, row.name)
                                        }
                                        sx={{ color: "error.light" }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton sx={{ color: "#546e7a" }}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AlertDialog
                open={open}
                deleteCourse={selectedCourse}
                handleClose={handleClose}
                handleDelete={() => handleDelete(selectedCourse``.id)} // Pass the deleteId to handleDelete
            />
        </Container>
    )
}

export default CourseTable
