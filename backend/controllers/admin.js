const adminRouter = require("express").Router()
const Admin = require("../models/userScema")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const config = require("../utils/config")

const { adminAuthentication } = require ("../utils/middleware")



adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    const passwordMatch =
        admin === null ? false : await bcrypt.compare(password, admin.password)


    if (!(admin && passwordMatch)) {
        return res.status(401).json({
            success: false,
            error: "invalid email or password",
        })
    }

    const adminToken = {
        name: admin.name,
        role: admin.role,
    }

    const token = jwt.sign(adminToken, config.JWT_SECRET, {
        expiresIn: 60 * 60,
    })
    res.cookie("adminAuth", token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour)
        sameSite: "Lax",
    })

    res.status(200).json({
        success: true,
        message: "Login Succesful",
    })
})

adminRouter.post("/logout", (req, res) => {
    res.clearCookie("adminAuth", { path: "/", httpOnly: true, secure: false })
    res.status(200).json({ success: true, message: "Logout successful" })

    // res.clearCookie('adminAuth', { secure: false, httpOnly: false, path: '/' })
})
adminRouter.post("/validateToken",adminAuthentication, (req, res) => {
    res.status(200).json({ success: true, message: "Valid Token" })
    // res.clearCookie('adminAuth', { secure: false, httpOnly: false, path: '/' })
})

module.exports = adminRouter
