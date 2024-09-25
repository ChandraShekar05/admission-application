import axios from "axios";
const url = 'http://localhost:3001/api/admin/login'
const login =  (email,password) => {

    const response = axios.post(url,{email,password}, { withCredentials: true })
    return response.then(response => response.data)

}
export {
   login
}