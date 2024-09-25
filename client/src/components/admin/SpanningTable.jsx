import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateApplicantStatus } from '../../services/applicantsApi';
import { Table, TableBody, TableContainer, TableCell, TableRow, Paper, Button, Select, MenuItem,  } from '@mui/material';

const SpanningTable = ({ rows, applicantId, onUpdate }) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(rows.find(row => row.label === 'Status').value);
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = async () => {
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await updateApplicantStatus(applicantId, status);
            setEditMode(false);
            onUpdate();
            navigate('/admin');
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <TableContainer component={Paper} elevation={3}  sx={{ borderRadius:5,border:1,borderColor:'divider'}}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.label}>
                            <TableCell variant="head" sx={{fontWeight: 'bold'}}>{row.label}</TableCell>
                            <TableCell>
                                {row.label === 'Status' && editMode ? (
                                    <Select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        fullWidth
                                    >
                                        <MenuItem value="Open">Open</MenuItem>
                                        <MenuItem value="Followup">Followup</MenuItem>
                                        <MenuItem value="Mail Sent">Mail Sent</MenuItem>
                                        <MenuItem value="Accepted">Accepted</MenuItem>
                                        <MenuItem value="Rejected">Rejected</MenuItem>
                                    </Select>
                                ) : (
                                    row.value
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell colSpan={2} align="right">
                            {editMode ? (
                                <Button variant="contained" color="Secondary" onClick={handleSaveClick}>
                                    Save
                                </Button>
                            ) : (
                                <Button variant="contained" color="secondary" onClick={handleUpdateClick}>
                                    Update
                                </Button>
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SpanningTable;