import {
    Container,
    Card,
    CardContent,
    CardHeader,
    Typography,
} from "@mui/material"

const CompanyInfo = () => {
    return (
        <Card
            elevation={0}
            sx={{
                position: "relative",
                height: "auto",
                background: "#E7F6F2",
                userSelect: "none",
                width: "100%",
                p: 1,
                mb: 5,
            }}
        >
            <Container>
                <CardContent sx={{ borderRadius: 2 }}>
                    <CardHeader
                        title="Lisan Al Gaib Academy"
                        subheader="Forging the Minds that Will Lead the Future"
                        sx={{ mb: 5, p: 0 }}
                        titleTypographyProps={{
                            sx: {
                                color: "#2C3333",
                                fontWeight: "bold",
                                fontSize: "4rem",
                            },
                        }}
                        subheaderTypographyProps={{
                            sx: {
                                fontSize: "2rem",
                                fontWeight: "bold",
                                color: "#395B64",
                            },
                        }}
                    />
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 550,
                            width: "80%",
                            mt: 1,
                            color: "text.secondary",
                        }}
                    >
                       {` At Lisan Al Gaib Academy, we prepare you to lead the
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
    )
}

export default CompanyInfo
