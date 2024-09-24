import * as React from 'react';
import { Card, CardContent, Typography, Button, Divider, CardActions, CardHeader } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function CourseCards({ name, subheader, description, amount, scrollToForm }) {
  return (
    <Card
      elevation={3}
      sx={{
        width: '500px',
        borderRadius: 3,
        p: 1,
        mb: 5,
        transition: '0.3s', 
        '&:hover': {
          transform: 'scale(1.03)', 
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardContent sx={{ borderRadius: 2, backgroundColor: '#E7F6F2', minHeight: 150 }}>
        <CardHeader
          title={name}
          subheader={subheader}
          sx={{ mb: 1, p: 0 }}
          titleTypographyProps={{
            sx: {
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              color: '#2C3333',
            },
          }}
          subheaderTypographyProps={{
            sx: {
              fontWeight: 'bold',
              fontSize: '0.95rem',
              color: '#3959B64',
            },
          }}
        />
        <Divider />
        <Typography variant='subtitle2' sx={{ mt: 1, color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 0, mt: 1, height: 43 }}>
        <Typography
          variant='subtitle1'
          sx={{
            pl: 2,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CurrencyRupeeIcon fontSize='1rem' />
          {amount}/-
        </Typography>
        <Button
          size='large'
          sx={{
            borderRadius: 5,
            color: '#2C3333',
            fontWeight: 'bold',
            m: 0,
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={scrollToForm}
        >
          Enroll
          <ChevronRightIcon fontSize='small' />
        </Button>
      </CardActions>
    </Card>
  );
}

export default CourseCards;