import { Box, TextField, Paper, Button, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useState } from "react";
import { login } from "../services/login";
import { superAdminLogin } from "../services/superAdminApi";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import LoginSVG from "../assets/Login.svg";
import Cookies from "js-cookie"; // Importing the js-cookie library

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");  // New state to store role selection
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        if (email && password && role) {  // Ensure role is selected
            if (role === "Admin") {
                superAdminLogin(email, password)
                    .then((data) => {
                        if (data.success) {
                            console.log(data.message);
                            setPassword("");
                            setEmail("");
                            Cookies.set("userRole", role, { expires: 60*60 }); 
                            navigate("/admin");
                        } else {
                            setError(data.message || "Login failed");
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        setError("Something went wrong. Please try again.");
                    })
                    .finally(() => setLoading(false));
            }
          else if (role === "AdminCounceller") {

                login(email, password)
                    .then((data) => {
                        if (data.success) {
                            console.log(data.message);
                            setPassword("");
                            setEmail("");

                            // Store the role in cookies
                            Cookies.set("userRole", role, { expires: 7 }); // Save role cookie for 7 days

                            // Navigate based on role selection
                            if (role === "Admin") {
                                navigate("/admin");
                            } else if (role === "AdminCounceller") {
                                navigate("/admin");
                            }
                        } else {
                            setError(data.message || "Login failed");
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        setError("Something went wrong. Please try again.");
                    })
                    .finally(() => setLoading(false));
            } else {
                setLoading(false);
                setError("Please fill in all fields, including selecting a role.");
            }
        }
    };

        return (
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    px: -1,
                    mx: 0,
                }}
            >
                <Grid container spacing={1} sx={{ width: "100%", height: "100%" }}>
                    <Grid
                        order={2}
                        size={{ sm: 12, md: 7 }}
                        sx={{
                            p: 2,
                            background: "#E7F6F2",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Paper
                            elevation={4}
                            sx={{
                                p: 5,
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: 5,
                            }}
                        >
                            <Typography variant="h3" color="#2C3333">
                                Admin Login
                            </Typography>
                            {error && (
                                <Typography
                                    variant="body2"
                                    color="error"
                                    sx={{ mt: 1 }}
                                >
                                    {error}
                                </Typography>
                            )}
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    name="email"
                                    label="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    sx={{
                                        mt: 2,
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#2C3333",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#2C3333",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#2C3333",
                                        },
                                    }}
                                />
                                <TextField
                                    type="password"
                                    name="password"
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    sx={{
                                        mt: 2,
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#2C3333",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#2C3333",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#2C3333",
                                        },
                                    }}
                                />

                                {/* Select for Role */}
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <InputLabel id="role-select-label">Role</InputLabel>
                                    <Select
                                        labelId="role-select-label"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        label="Role"
                                        sx={{
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#2C3333",
                                            },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#2C3333",
                                            },
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#2C3333",
                                            },
                                        }}
                                    >
                                        <MenuItem value="Admin">Admin</MenuItem>
                                        <MenuItem value="AdminCounceller">AdminCounceller</MenuItem>
                                    </Select>
                                </FormControl>

                                <Button
                                    sx={{ mt: 2, border: 1.5 }}
                                    variant="outlined"
                                    type="submit"
                                    color="success"
                                    fullWidth
                                    disabled={loading}
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid
                        size={5}
                        sx={{
                            p: 2,
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                        }}
                    >
                        <img src={LoginSVG} width={"100%"} alt="Login Illustration" />
                    </Grid>
                </Grid>
            </Box>
        );
    };

    export default LoginPage;
