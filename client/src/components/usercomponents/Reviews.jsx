import React from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Stack } from '@mui/material';

const testimonials = [
  {
    text: "Personalised approach, hands-on experience and real world use cases made the training effective and valuable.",
    name: "Sunitha",
    title: "HR Manager at Kore.AI",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg", // Example image URL
  },
  {
    text: "Working with Gradious team was a delight. I am grateful for the unwavering support and exceptional dedication provided by the team.",
    name: "Alvin Lim",
    title: "Technical Co-Founder, IDFC Bank",
    avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg", // Example image URL
  },
  {
    text: "Gradious uses an effective approach to connect untapped talent with industry demands. Promptness and follow-up signify Gradious dedication.",
    name: "William A. Wachlin",
    title: "Senior Representative, Cubic-Transportation",
    avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg", // Example image URL
  },
];

const TestimonialCard = ({ testimonial }) => (
  <Card variant="outlined" sx={{ p: 2, borderRadius: 2, boxShadow: 1, height: '340px' }}>
    <CardContent>
      <Typography variant="h6" component="div" gutterBottom sx={{ fontStyle: 'italic' }}>
        "{testimonial.text}"
      </Typography>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
        <Avatar alt={testimonial.name} src={testimonial.avatarUrl} sx={{ width: 50, height: 50 }} />
        <div>
          <Typography variant="subtitle1">
            {testimonial.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {testimonial.title}
          </Typography>
        </div>
      </Stack>
    </CardContent>
  </Card>
);

const TestimonialsGrid = () => (
  <Grid container spacing={4} sx={{ p: 4, justifyContent: "center", alignItems:"center", height:"auto" }}>
    {testimonials.map((testimonial, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <TestimonialCard testimonial={testimonial} />
      </Grid>
    ))}
  </Grid>
);

const ClientTestimonialsSection = () => (
  <div>
    <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 2, color:'black', mt:2 }}>
      Client Testimonials
    </Typography>
    <TestimonialsGrid />
  </div>
);

export default ClientTestimonialsSection;
