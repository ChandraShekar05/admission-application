const mongoose = require("mongoose")
const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Full Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            match: [/.+\@.+\..+/, "Please enter a valid email address"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        role: {
            type: String,
            enum: ["Admin", "AdminCounceller"],
            default: "AdminCounceller",
        },
        adminCounceller: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Admin", // Referencing the same model
            },
        ],
    },
    {
        timestamps: true,
    }
)

adminSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    },
})

module.exports = mongoose.model("Admin", adminSchema)
