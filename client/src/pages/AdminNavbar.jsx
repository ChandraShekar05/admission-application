import { useState, Fragment } from "react"
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    Button,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

import { Link, Outlet } from "react-router-dom"

import { logout } from '../services/login';

const drawerWidth = 300
const navItems = ["Applications", "Courses"]
const navLinks = ["/admin", "courses"]

function AdminNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState)
    }

    const handleLogut = () => {
        logout()
            .then((data) => {
                if (data.success) {
                    window.location.href = "/login"
                }
            })
            .catch((error) => console.log(error))

        }
        const drawer = (
            <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography
                    variant="h5"
                    color="#2C3333"
                    sx={{ fontWeight: "700", my: 2 }}
                >
                    Lisan Al Gaib
                </Typography>
                <Divider sx={{ my: 2 }} />
                <List>
                    {navItems.map((item, index) => (
                        <ListItem key={item} disablePadding>
                            <ListItemButton
                                component={Link} // Add the Link component for navigation
                                to={navLinks[index]}
                                sx={{
                                    color: "#395B64",
                                    textAlign: "center",
                                    borderRadius: "8px",
                                    transition: "background 0.3s",
                                    "&:hover": {
                                        backgroundColor: "#D6E4E5",
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={item}
                                    primaryTypographyProps={{
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <Button variant='outlined' color='white' onClick={handleLogut}>LogOut</Button>
                </List>
            </Box>
        )

        return (
            <Fragment>
                <CssBaseline />
                <AppBar
                    elevation={3}
                    sx={{
                        position: "sticky",
                        top: "0",
                        background:
                            "linear-gradient(90deg, #2C3333 0%, #395B64 100%)", // Gradient background
                        zIndex: 1100,
                        transition: "background 0.3s ease-in-out",
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    component="nav"
                >
                    <Toolbar
                        sx={{
                            justifyContent: "space-between",
                            px: { xs: 1, sm: 3 },
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography
                                // variant="h5"
                                fontSize={'24px'}
                                component="div"
                                color="#ffffff"
                                sx={{
                                    fontWeight: "700",
                                    display: { xs: "none", sm: "block" },
                                }}
                            >
                                Lisan Al Gaib
                            </Typography>
                        </Box>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                mr: 2,
                                display: { sm: "none" },
                                color: "#ffffff",
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                            {navItems.map((item, index) => (
                                <Button
                                    key={item}
                                    component={Link}
                                    to={navLinks[index]}
                                    sx={{
                                        color: "#ffffff",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        mr: 1,
                                        borderRadius: "20px",
                                        // padding: "10px 20px",
                                        p:1,
                                        transition: "background-color 0.3s",
                                        // '&:hover': {
                                        //   backgroundColor: '#D6E4E5',
                                        //   color: '#2C3333',
                                        // },
                                    }}
                                >
                                    {item}
                                </Button>
                            ))}
                            <Button
                                variant="outlined"
                                color="white"
                                onClick={handleLogut}
                                sx={{fontSize:'14px',ml:1}}
                            >
                                LogOut
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: "block", sm: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                                backgroundColor: "#F4FAFA",
                                boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
                <Outlet />
            </Fragment>
        )
    }


export default AdminNavbar
