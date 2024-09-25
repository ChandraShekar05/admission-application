import { Fragment } from "react"
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
                 PaperProps={{
                    sx: { borderRadius: 5, p: 2 },
                 }}
                 
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{p:1}} id="alert-dialog-title">
                    {`Delete Course? ${deleteCourse.name}`}
                </DialogTitle>
                <DialogContent sx={{p:1}}>
                    <Alert severity="warning">
                        This action cannot be undone
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
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
