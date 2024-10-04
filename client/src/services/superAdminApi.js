import axios from "axios"

const url = 'http://localhost:3001/api/superAdmin'

const getAllAdmins = () => {
    const response = axios.get(url, { withCredentials: true })
    return response.then(response => response.data)
}

const createAdmin = (name, email, password) => {
    const response = axios.post(`${url}`, {name, email, password}, { withCredentials: true })
    return response.then(response => response.data)
}

const getAdminById = (id) => {
    const response = axios.get(`${url}/${id}`, { withCredentials: true })
    return response.then(response => response.data)
}

const updateAdmin = (id, adminData) => {
    const response = axios.put(`${url}/${id}`,  adminData, { withCredentials: true })
    return response.then(response => response.data)
}

const deleteAdmin = (id) => {
    const response = axios.delete(`${url}/${id}`, { withCredentials: true })
    return response.then(response => response.data)
}

const superAdminLogin =  (email,password, role) => {

    const response = axios.post(`${url}/login`,{email,password, role}, { withCredentials: true })
    return response.then(response => response.data)

}

const superAdminLogout =  () => {

    const response = axios.post(`${url}/logout`,{},{ withCredentials: true })
    return response.then(response => response.data)

}

const adminTokenValidation = () => {
    const response = axios.post(`${url}/validateToken`,{},{ withCredentials: true })
    return response.then(response => response.data)
}
export {
    getAllAdmins,
    createAdmin,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    superAdminLogin,
    superAdminLogout,
    adminTokenValidation
}