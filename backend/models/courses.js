const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

// mongoose.connect(config.MONGODB_URI).
//     then(( ) => {
//         logger.info('Connection successfull to courses')
//     })
//     .catch(error => {
//         logger.error(error)
//     })

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Course name is required"], // Required field with a custom message
            minlength: [3, "Course name must be at least 3 characters long"], // Minimum length validation
            maxlength: [100, "Course name can be at most 100 characters long"], // Maximum length validation
        },
        amount: {
            type: Number,
            required: [true, "Course amount is required"], // Required field with a custom message
            min: [0, "Course amount cannot be negative"], // Ensure amount is not negative
        },
        duration: {
            type: String,
            required: [true, "Course duration is required"], // Required field with a custom message
            match: [
                /\d+\s*(week|month|year)s?/i,
                "Use formats like '3 months', '6 weeks', etc.",
            ],
        },
        description: {
            type: String,
            required: [true, "Course description is required"], // Required field with a custom message
            minlength: [10, "Description must be at least 10 characters long"], // Minimum length validation
            maxlength: [500, "Description can be at most 500 characters long"], // Maximum length validation
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
)

courseSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model("Course", courseSchema)
