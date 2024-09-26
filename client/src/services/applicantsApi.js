import axios from 'axios';

const url = 'http://localhost:3001/api/applications';

export const getApplicants = async () => {
    try {
        const response = await axios.get(url,{
            withCredentials: true // This ensures cookies are sent
          });
        return response.data;
    } catch (error) {
        console.error('Error fetching applicants:', error);
        return [];
    }
};

export const getApplicantById = async (id) => {
    try {
        const response = await axios.get(`${url}/${id}`,{
            withCredentials: true // This ensures cookies are sent
          });
        return response.data;
    } catch (error) {
        console.error('Error fetching applicant:', error);
        return null;
    }
};

export const updateApplicantStatus = async (id, status) => {
    try {
        const response = await axios.put(`${url}/${id}`, { status },{
            withCredentials: true // This ensures cookies are sent
          });
        return response.data;
    } catch (error) {
        console.error('Error updating applicant status:', error);
        return null;
    }
};
