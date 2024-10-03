const superAdminRouter = require('express').Router();
const adminCouncellers = require('../models/userScema');
const superAdmin = require('../models/adminSchema');
const { superAdminAuthentication } = require ("../utils/middleware")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');


superAdminRouter.get('/', superAdminAuthentication, async (req, res) => {
    const adminCounceller = await adminCouncellers.find({});
    res.json(adminCounceller);
});

superAdminRouter.get('/admin', superAdminAuthentication, async (req, res) => {
    const admin = await superAdmin.find({}).populate('adminCounceller', { name: 1, email: 1 });
    res.json(admin);
})

superAdminRouter.get('/:id', superAdminAuthentication, async (req, res) => {
    const id  = req.params.id;
    try{
        const adminCounceller = await adminCouncellers.findById(id);
        if(!adminCounceller){
            return res.status(404).json({ error: 'Admin councellor not found' });
        }
        res.status(200).json(adminCounceller);
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
})

superAdminRouter.post("/admin", superAdminAuthentication, async (req, res, next) => {
    const { name, password, email, role = 'Admin', adminCounceller } = req.body
    const saltrounds = 10
    const hashedPassword = await bcrypt.hash(password, saltrounds)

    const newAdmin = new superAdmin({ name, password: hashedPassword, email, adminCounceller })

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

superAdminRouter.post("/", async (req, res, next) => {
    const { name, password, email } = req.body
    const saltrounds = 10
    const hashedPassword = await bcrypt.hash(password, saltrounds)

    const newAdmin = new adminCouncellers({ name, password: hashedPassword, email })

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

superAdminRouter.put('/:id', superAdminAuthentication, async (req, res, next) => {
    const { id } = req.params;
    const adminCounceller = req.body;
    try{
        const updatedAdminCouncellor = await adminCouncellers.findByIdAndUpdate(id, adminCounceller, { new: true });
        if(!updatedAdminCouncellor){
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.status(200).json(updatedAdminCouncellor);
    }
    catch(error){
        next(error);
    }
})

superAdminRouter.delete('/:id', superAdminAuthentication, async (req, res, next) => {
    const { id } = req.params;
    try{
        const deletedAdminCouncellor = await adminCouncellers.findByIdAndDelete(id);
        if(!deletedAdminCouncellor){
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully' });
    }
    catch(error){
        next(error);
    }
})

superAdminRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    const admin = await superAdmin.findOne({ email })
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
    res.cookie("superAdminAuth", token, {
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

superAdminRouter.post('/logout', async (req, res) => {
    res.clearCookie('superAdminAuth');
    res.status(200).json({ message: 'Logout successful' });
})  

superAdminRouter.post("/validateToken", superAdminAuthentication, (req, res) => {
    res.status(200).json({ success: true, message: "Valid Token" })
    // res.clearCookie('adminAuth', { secure: false, httpOnly: false, path: '/' })
})

module.exports = superAdminRouter;