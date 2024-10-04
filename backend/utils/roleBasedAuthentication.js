const { adminAuthentication, superAdminAuthentication } = require('./middleware'); // Adjust the path to your adminAuthentication middleware
const config = require('./config');
const jwt = require('jsonwebtoken');


const roleBasedAuthentication = (req, res, next) => {
    const token = req.cookies.adminAuth;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        console.log('decoded', decoded);
        if (decoded.role === 'AdminCounceller') {
            return adminAuthentication(req, res, next);
        } else {
            return superAdminAuthentication(req, res, next);
        }
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = roleBasedAuthentication;