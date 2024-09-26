import { Box, TextField, Paper, Button, Typography } from "@mui/material"
import { useState } from "react"
import { login } from "../services/login"
import { useNavigate } from "react-router-dom"
import Grid from "@mui/material/Grid2"

import LoginSVG from "../assets/Login.svg"
// import Login2 from "../assets/login2.svg"

const LoginPage = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && password) {
            login(email, password)
                .then((data) => {
                    if (data.success) {
                        console.log(data.message)
                        setPassword("")
                        setEmail("")
                        navigate("/admin")
                    }
                })
                .catch((error) => console.log(error))
        }
    }

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px:-1,
                mx:0
                
            }}
        >
            <Grid container spacing={1} sx={{width:'100%',height:'100%'}}>
                <Grid order={2} size={{ sm: 12, md: 7 }} sx={{p:2,background:'#E7F6F2',display:"flex",alignItems:"center",justifyContent:'center'}}>
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
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name="email"
                                label="Email Adress"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                sx={{ mt: 2 ,"& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#2C3333",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#2C3333",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#2C3333",
                                        },}}
                            />
                            <TextField
                                type="password"
                                name="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                sx={{ mt: 2 ,"& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#2C3333",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#2C3333",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#2C3333",
                                },}}
                            />
                            <Button
                                sx={{ mt: 2,border:1.5 }}
                                variant="outlined"
                                type="submit"
                                color="success"
                                fullWidth
                            >
                                Login
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid size={5} sx={{ p:2,display: { xs: "none", md: "flex" },alignItems:"center" }}>
                    <img src={LoginSVG} width={"100%"} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default LoginPage
