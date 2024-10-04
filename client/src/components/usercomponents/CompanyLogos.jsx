import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const CompanyLogos = () => {
  const logos = [
    "https://gradious.com/wp-content/uploads/2023/08/MPHASIS-logo-1536x508.png",
    "https://gradious.com/wp-content/uploads/2023/02/Kore-ai.png",
    "https://gradious.com/wp-content/uploads/2023/02/IDFC_First_Bank_logo.jpeg",
    "https://gradious.com/wp-content/uploads/2023/10/Simeio.png",
    "https://gradious.com/wp-content/uploads/2023/02/Sureify.png",
    "https://gradious.com/wp-content/uploads/2023/06/Cubic_Transportation_Systems_logo-removebg-preview.png",
    "https://gradious.com/wp-content/uploads/2023/08/Minfy-Logo-1536x419.png",
    "https://gradious.com/wp-content/uploads/2023/10/decisions-Logo.png",
    "https://gradious.com/wp-content/uploads/2023/08/yarken-logo_copy-removebg-preview.png",
    "https://gradious.com/wp-content/uploads/2021/12/Techouts_logo1.png",
    "https://gradious.com/wp-content/uploads/2023/08/Screenshot_2023-08-08_at_10.04.42_PM-removebg-preview.png",
  ];

  return (
    <Box sx={{ textAlign: "center", padding: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Companies that trust us...
      </Typography>

      <Grid container spacing={4} justifyContent="space-around">
        {logos.slice(0, 11).map((src, index) => (
          <Grid item xs={3} sm={2} md={2} key={index}>
            <Box
              sx={{
                backgroundColor: "#f0f0f0", 
                borderRadius: "8px", 
                padding: "10px", 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "130px",
                marginBottom:"10px" 
              }}
            >
              <img
                src={src}
                alt={`Company logo ${index + 1}`}
                style={{
                  maxWidth: "100%", 
                  height: "auto", 
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default CompanyLogos;
