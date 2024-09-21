const logger  = require('./logger')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler=(error,req,res,next) => {
  logger.error((error.message))

  if(error.name ==='CastError'){
    return res.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

module.exports ={
  unknownEndpoint,
  errorHandler
}