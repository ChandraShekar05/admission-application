import axios from "axios"

const url = 'http://localhost:3001/api/superAdmin'

const superAdminLogin =  (email,password) => {

    const response = axios.post(`${url}/login`,{email,password}, { withCredentials: true })
    return response.then(response => response.data)

}

const superAdminLogout =  () => {

    const response = axios.post(`${url}/logout`,{},{ withCredentials: true })
    return response.then(response => response.data)

}

const tokenValidation = () => {
    const response = axios.post(`${url}/validateToken`,{},{ withCredentials: true })
    return response.then(response => response.data)
}
export {
    superAdminLogin,
    superAdminLogout,
    tokenValidation
}