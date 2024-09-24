import axios from 'axios'

const url = 'http://localhost:3001/api/mail'

export const sendMail = async (applicants) => {
    const promises = applicants.map(applicant => {
        return axios.post(`${url}/send-email`, {
            email: applicant.email,
            fullName: applicant.fullName,
            status: applicant.status,
        });
    });

    await Promise.all(promises);
}