const mongoose = require("mongoose")

const applicantSchema = new mongoose.Schema(
    {
        // Personal Information
        fullName: {
            type: String,
            required: [true, "Full Name is required"],
            trim: true,
            maxlength: [100, "Full Name cannot exceed 100 characters"],
        },
        dateOfBirth: {
            type: Date,
            required: [true, "Date of Birth is required"],
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            default: null, // Optional field
        },

        // Contact Information
        contactInformation: {
            phoneNumber: {
                type: String,
                required: [true, "Phone Number is required"],
                match: [
                    /^(?:\+91|91)?[6-9]\d{9}$/,
                    "Please enter a valid phone number",
                ],
            },
            emailAddress: {
                type: String,
                required: [true, "Email Address is required"],
                lowercase: true,
                trim: true,
                // eslint-disable-next-line no-useless-escape
                match: [/.+\@.+\..+/, "Please enter a valid email address"],
                unique: true,
            },
        },

        // Educational Qualifications
        highestQualification: {
            qualification: {
                type: String,
                required: [true, "Highest Qualification is required"],
            },
            yearOfPassing: {
                type: Number,
                required: [true, "Year of Passing is required"],
            },
            percentageCGPA: {
                type: String, // Use String to accommodate formats like "85%" or "8.5 CGPA"
                required: [true, "Percentage/CGPA is required"],
            },
        },

        // Course Preferences
        preferredCourse: {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
                required: [true, "Preferred Course is required"],
            },
            reason: {
                type: String,
                required: [true, "Reason for Choosing the Course is required"],
                maxlength: [500, "Reason cannot exceed 500 characters"],
            },
        },

        // Referral Information
        howDidYouHearAboutUs: {
            source: {
                type: String,
                required: [true, "Referral Source is required"],
                enum: [
                    "Social Media",
                    "Search Engine",
                    "Friend/Family Referral",
                    "Advertisement",
                    "Other",
                ],
            },
        },
        status: {
            type: String,
            enum: [
                "Open",
                "In Pipeline",
                "Next Batch",
                "CLosed-Won",
                "Closed-Lost",
                "Spam",
                "No Ansewer",
            ],
            default: "Open",
            required: [true, "Status is required"],
        },
        remarks: {
            type: [String],
            default: [],
            required: [true, "Remarks is required"],
        },
        lastUpdatedBy: {
            type: String,
            required: [true, "Last Updated by"],
            trim: true,
            default: "user",

            /* type: mongoose.Schema.Types.ObjectId, // Assuming Admins are stored in a separate collection
    ref: 'Admin',
    required: function() {
      return this.status !== 'Open'; // Require admin reference if status is updated
    }*/
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
)

applicantSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

        // Format the date
        if (returnedObject.createdAt) {
            // Adjust the timezone as needed
            returnedObject.createdAt = new Date(
                returnedObject.createdAt
            ).toLocaleString("en-US", {
                timeZone: "Asia/Kolkata", // Change to your desired timezone
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZoneName: "short",
            })
            returnedObject.updatedAt = new Date(
                returnedObject.updatedAt
            ).toLocaleString("en-US", {
                timeZone: "Asia/Kolkata", // Change to your desired timezone
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZoneName: "short",
            })
        }
    },
})

module.exports = mongoose.model("Applicant", applicantSchema)
