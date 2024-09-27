# Admission Application

The Admission Application website is designed to manage and streamline the admission process for educational institutions. It provides an interface for administrators to manage applicant data, update application statuses, and communicate with applicants via email.

## Features

- **Applicant Management**: View and manage a list of applicants.
- **Status Updates**: Update the status of applications (e.g., Open, Followup, Mail Sent, Accepted, Rejected).
- **Email Notifications**: Send email notifications to applicants regarding their application status.
- **Secure Authentication**: Secure login for administrators using JWT authentication.
- **Responsive Design**: User-friendly interface that works on both desktop and mobile devices.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

## Environment Variables

Create a `.env` file in the root directory of both the backend folders with the following variables:

### Backend `.env` File

```properties
MONGODB_URI='mongodb://localhost:27017/gradious'
PORT=3001
EMAIL_USER='your-email@example.com'
EMAIL_PASS='your-google-app-password'
JWT_SECRET='your-secure-jwt-secret'
```
## Generating the EMAIL_PASS

### 1. Enable 2-Step Verification:
- Go to your Google Account.
- Navigate to the "Security" section.
- Select "2-Step Verification" and follow the instructions to enable it.
### 2. Generate an App Password:
- After enabling 2-Step Verification, go back to the "Security" section.
- In the search bar search "App passwords."
- Open "App Passwords."
- Enter a name for your app (e.g., "Admission Application") and click "Generate."
- Google will display a 16-character app password. Copy this password.
### 3. Update the `.env` file
- Open you `.env` file in the backend folder
- Replace the  [EMAIL_PASS](EMAIL_PASS) value with the generated app password.

## Running the Backend Server
1. Navigate to the backend directory
```sh
    cd backend
```
2. Install the dependencies
```sh
    npm install
```
3. Start the backend server
```sh
    npm run dev
```
The backend server should now be running on `http://localhost:3001`.

## Running the Client Server
1. Navigate to the client directory
```sh
    cd client
```
2. Install the dependencies
```sh
    npm install
```
3. Start the client server
```sh
    npm run dev
```