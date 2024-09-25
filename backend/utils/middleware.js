const logger = require("./logger")

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
    }
    else if(error.code === 11000)
    {
        return  res.status(409).json({
            success:false,
            error:' Email address already exists.' })
    }

    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler,
}
