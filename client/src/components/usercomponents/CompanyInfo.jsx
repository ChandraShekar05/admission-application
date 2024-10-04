import React from "react";
import {
    Container,
    Card,
    CardContent,
    CardHeader,
    Typography,
} from "@mui/material";
import AdmissionStats from './AdmissionStats'
import CompanyLogos from './CompanyLogos'

const CompanyInfo = () => {
    return (
        <>
        <div
            style={{
                position: "relative",
                height: "auto", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    backgroundImage: `url('https://plus.unsplash.com/premium_photo-1683598391853-23dafcf53ff2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.9,
                }}
            />
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.5)", 
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            />
            <Card
                elevation={2} 
                sx={{
                    position: "relative",
                    height: "auto",
                    backgroundColor: "rgba(245, 245, 245, 0.7)", 
                    userSelect: "none",
                    width: "auto", 
                    p: 3, 
                    mb: 5,
                    mt:7,
                    borderRadius: 2, 
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", 
                }}
            >
                <Container>
                    <CardContent>
                        <CardHeader
                            title="Gradious"
                            subheader="Connecting Talent to Triumph: Enroll, Engage, Excel"
                            sx={{ mb: 5, p: 0 }}
                            titleTypographyProps={{
                                sx: {
                                    color: "#2C3E50", 
                                    fontWeight: "bold",
                                    fontSize: "4rem",
                                },
                            }}
                            subheaderTypographyProps={{
                                sx: {
                                    fontSize: "2rem",
                                    fontWeight: "bold",
                                    color: "#34495E", 
                                },
                            }}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 550,
                                width: "80%",
                                mt: 1,
                                color: "#2C3E50", 
                            }}
                        >
                           {`At Gradious, we prepare you to lead the
                            future with cutting-edge skills and industry-level
                            application knowledge. Our courses are designed to
                            transform learners into innovators, equipped with
                            practical tools and hands-on experience. Whether you’re
                            just starting your journey or enhancing your expertise,
                            our academy provides the training you need to thrive in
                            today's fast-paced professional world. Embark on a
                            learning adventure that bridges the gap between
                            knowledge and real-world success.`}
                        </Typography>
                    </CardContent>
                </Container>
            </Card>
        </div>
        <AdmissionStats/>
        <CompanyLogos />
        </>
    );
    
};

export default CompanyInfo;
