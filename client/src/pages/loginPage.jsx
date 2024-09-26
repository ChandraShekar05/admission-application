import { Container, TextField, Paper, Button } from "@mui/material"
import { useState } from "react"
import { login } from "../services/login"
import {useNavigate } from 'react-router-dom'


const LoginPage = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && password) {
            login(email,password)
            .then(data => {
                if(data.success)
                {
                    console.log(data.message)
                    setPassword('')
                    setEmail('')
                    navigate('/admin')
                    
                }
            })
            .catch(error => console.log(error))
        }
    }

    return (
        <Container sx={{ height:'100vh',my:5,display:'flex',justifyContent:'center'}}>
            <Paper  sx={{my:5,display:'flex',flexDirection:'column'}} >
                <form onSubmit={handleSubmit}>
                <TextField
                    name="email"
                    label="Email Adress"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    type="password"
                    name="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="outlined" type="submit">
                    Login
                </Button>

                </form>
            </Paper>
        </Container>
    )
}

export default LoginPage
