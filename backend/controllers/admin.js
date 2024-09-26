const adminRouter = require("express").Router()
const Admin = require("../models/userScema")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const config = require("../utils/config")

adminRouter.post("/", async (req, res, next) => {
    const { name, password, email } = req.body
    const saltrounds = 10
    const hashedPassword = await bcrypt.hash(password, saltrounds)

    const newAdmin = new Admin({ name, password: hashedPassword, email })

    try {
        const result = await newAdmin.save()
        if (result) {
            return res.status(200).json({
                success: true,
                result,
            })
        }
    } catch (error) {
        next(error)
    }
})

adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    const passwordMatch =
        admin === null ? false : bcrypt.compare(password, admin.password)

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
    res.cookie("token", token, {
        httpOnly: true,
        // secure: false,
        maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour)
    })

    res.status(200).json({
        success: true,
        message: "Login Succesful",
    })
})

adminRouter.post("/logout", (req, res) => {
    res.clearCookie("token", { path: '/' })
    res.status(200).json({ success: true, message: "Logout successful" })
})

module.exports = adminRouter
