import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const AdmissionStats = () => {
  return (
    <Box
      sx={{
        padding: 8,
        backgroundColor: "rgba(245, 245, 245, 0.7)",
        borderRadius: 2,
        boxShadow: 0,
        textAlign: "center",
        marginTop:0
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              padding: 2,
              borderRadius: 2,
              height: "100px", 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", 
              alignItems: "center", 
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              4000+
            </Typography>
            <Typography variant="body1">on-demand courses</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              padding: 2,
              borderRadius: 2,
              height: "100px", 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", 
              alignItems: "center", 
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              2000+
            </Typography>
            <Typography variant="body1">practice exercises</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              padding: 2,
              borderRadius: 2,
              height: "100px", 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", 
              alignItems: "center", 
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              4.4{" "}
              <StarIcon
                sx={{
                  fontSize: "1rem",
                  verticalAlign: "middle",
                  color: "#FFD700",
                }}
              />
            </Typography>
            <Typography variant="body1">average course rating</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              padding: 2,
              borderRadius: 2,
              height: "100px", 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", 
              alignItems: "center", 
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              3000+
            </Typography>
            <Typography variant="body1">top instructors</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdmissionStats;
