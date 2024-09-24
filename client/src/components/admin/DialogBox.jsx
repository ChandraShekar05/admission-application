import { useState, Fragment } from "react"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Alert,
} from "@mui/material"

const AlertDialog = ({ open, deleteCourse, handleDelete, handleClose }) => {
    const handleAgrre = () => {
        handleDelete()
        handleClose()
    }

    return (
        <Fragment>
            <Dialog
                sx={{ width: "100%" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Delete Course? ${deleteCourse.name}`}
                </DialogTitle>
                <DialogContent>
                    <Alert severity="warning">
                        This action cannot be undone
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleAgrre}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default AlertDialog
