// import axios from "axios";
// const url = 'http://localhost:3001/api/admin'
// const login =  (email,password) => {

//     const response = axios.post(`${url}/login`,{email,password}, { withCredentials: true })
//     return response.then(response => response.data)

// }

// const logout =  () => {

//     const response = axios.post(`${url}/logout`,{},{ withCredentials: true })
//     return response.then(response => response.data)

// }

// const tokenValidation = () => {
//     const response = axios.post(`${url}/validateToken`,{},{ withCredentials: true })
//     return response.then(response => response.data)
// }
// export {
//    login,
//    logout,
//    tokenValidation
// }

import axios from "axios";

const url = 'http://localhost:3001/api/admin';

// Updated login function to include role
const login = (email, password, role) => {
    const response = axios.post(`${url}/login`, { email, password, role }, { withCredentials: true });
    return response.then(response => response.data);
}

const logout = () => {
    const response = axios.post(`${url}/logout`, {}, { withCredentials: true });
    return response.then(response => response.data);
}

const tokenValidation = () => {
    const response = axios.post(`${url}/validateToken`, {}, { withCredentials: true });
    return response.then(response => response.data);
}

export {
    login,
    logout,
    tokenValidation
};
