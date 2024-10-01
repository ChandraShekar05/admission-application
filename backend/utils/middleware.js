/* eslint-disable no-unused-vars */
const logger = require("./logger")

const config = require("./config")
const jwt = require("jsonwebtoken")

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    // Id is not matched
    if (error.name === "CastError") {
        return res.status(400).send({ error: "malformatted id" })
    }
    //Vlidation error
    else if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message })
    } else if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            error: " Email address already exists.",
        })
    }

    next(error)
}

const superAdminAuthentication = (req, res, next) => {
    const token = req.cookies.superAdminAuth;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decodedToken = jwt.verify(token, config.JWT_SECRET);
        if (decodedToken.role !== 'Admin') {
            return res.status(403).json({ error: 'Forbidden: Access is denied' });
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

const adminAuthentication = (req, res, next) => {
    try {
        const token = req.cookies.adminAuth
        if (!token) {
            return res
                .status(401)
                .json({ message: "Unauthorized: No token provided" })
        }

        const decoded = jwt.verify(token, config.JWT_SECRET)
        if(decoded.role!=='AdminCounceller')
        {

            return res
                .status(401)
                .json({ message: "Unauthorized: No Access" })

        }

        req.admin = decoded

        next()
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" })
    }
}
module.exports = {
    unknownEndpoint,
    errorHandler,
    superAdminAuthentication,
    adminAuthentication,
}
