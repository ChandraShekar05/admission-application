import { useState, useEffect, Fragment } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { addNewCourse,updateCourse } from '../../services/coursesApi';

const FormDialog = ({ openForm, handleClose, setCourses, selectedCourse, editCourse }) => {

  
  const emptyForm = {
    name: '',
    duration: '',
    amount: '',
    description: ''
  };
  
  const [formValues, setFormValues] = useState(emptyForm);

  const [debouncedValues, setDebouncedValues] = useState(formValues);

  // Handle debounced input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValues(formValues);
    }, 500); // Adjust debounce delay as needed (500ms here)

    return () => {
      clearTimeout(handler);
    };
  }, [formValues]);

  // If editing, pre-fill the form with selectedCourse values
  useEffect(() => {
    if (editCourse && selectedCourse) {
      setFormValues({
        name: selectedCourse.name || '',
        duration: selectedCourse.duration || '',
        amount: selectedCourse.amount || '',
        description: selectedCourse.description || ''
      });
    }
    else{
      setFormValues({
        name: '',
        duration: '',
        amount: '',
        description: ''
      })
    }
  }, [editCourse, selectedCourse]);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if(editCourse)
    {
      updateCourse(selectedCourse.id,debouncedValues)
      .then(data => setCourses(prev => 
        prev.map(item => 
          item.id===selectedCourse.id?data:item)))
      .catch(error => console.log(error))

    }
    else{

      addNewCourse(debouncedValues)
        .then((data) => setCourses((prev) => prev.concat(data)))
        .catch((error) => console.error(error));

    }
    resetForm(); // Reset form before closing
    handleClose();
    
  };

  const resetForm = () => {
    setFormValues(emptyForm);
    setDebouncedValues(emptyForm);
  };

  return (
    <Fragment>
      <Dialog
        open={openForm}
        onClose={handleClose}
        PaperProps={{
          sx: { borderRadius: 5, p: 2 },
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle variant="h5" sx={{ pb: 0, fontWeight: 'bold', color: '#2C3333' }}>
          {editCourse ? 'Edit Course' : 'Add New Course'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#395B64', mb: 1 }}>
            Enter the Course details below
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Course Name"
            type="text"
            fullWidth
            variant="standard"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="duration"
            name="duration"
            label="Course Duration"
            type="text"
            fullWidth
            variant="standard"
            value={formValues.duration}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="amount"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            value={formValues.amount}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Course Description"
            type="text"
            fullWidth
            variant="standard"
            value={formValues.description}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(handleClose)} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" color="success" variant="contained">
            {editCourse ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default FormDialog;
