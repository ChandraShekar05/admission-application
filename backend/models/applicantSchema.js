const mongoose = require('mongoose')

const config = require('../utils/config')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI).
    then(() => {
        console.log('Connection successful')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const applicantSchema = new mongoose.Schema({
    // Personal Information
    fullName: {
        type: String,
        required: [true, 'Full Name is required'],
        trim: true,
        maxlength: [100, 'Full Name cannot exceed 100 characters']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of Birth is required']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: null // Optional field
    },

    // Contact Information
    contactInformation: {
        phoneNumber: {
            type: String,
            required: [true, 'Phone Number is required'],
            match: [/^(?:\+91|91)?[6-9]\d{9}$/, 'Please enter a valid phone number']

        },
        emailAddress: {
            type: String,
            required: [true, 'Email Address is required'],
            lowercase: true,
            trim: true,
            match: [/.+\@.+\..+/, 'Please enter a valid email address']
        }
    },

    // Educational Qualifications
    highestQualification: {
        qualification: {
            type: String,
            required: [true, 'Highest Qualification is required']
        },
        yearOfPassing: {
            type: Number,
            required: [true, 'Year of Passing is required'],
        },
        percentageCGPA: {
            type: String, // Use String to accommodate formats like "85%" or "8.5 CGPA"
            required: [true, 'Percentage/CGPA is required']
        }
    },

    // Course Preferences
    preferredCourse: {
        course: {
            type: String,
            required: [true, 'Preferred Course is required']
        },
        reason: {
            type: String,
            required: [true, 'Reason for Choosing the Course is required'],
            maxlength: [500, 'Reason cannot exceed 500 characters']
        },
    },

    // Referral Information
    howDidYouHearAboutUs: {
        source: {
            type: String,
            required: [true, 'Referral Source is required'],
            enum: ['Social Media', 'Search Engine', 'Friend/Family Referral', 'Advertisement', 'Other']
        },
    },
    status: {
        type: String,
        enum: ['Open', 'Mail Sent', 'Followup', 'Accepted', 'Rejected'],
        default: 'Open',
        required: [true, 'Status is required']
    },
    lastUpdatedBy: {
        type: String,
        required: [true, 'Full Name is required'],
        trim: true,
        default: null,

        /* type: mongoose.Schema.Types.ObjectId, // Assuming Admins are stored in a separate collection
         ref: 'Admin',
         required: function() {
           return this.status !== 'Open'; // Require admin reference if status is updated
         }*/
    },

    // Metadata
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Applicant', applicantSchema);