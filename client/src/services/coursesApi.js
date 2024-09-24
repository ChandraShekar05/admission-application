import axios from "axios";

const url = 'http://localhost:3001/api/courses'



const getAllCourses =async ()=>{
   const request = axios.get(url);
   const response = await request;
    return response.data;
}

const addNewCourse =async (newPerson)=>{
    const request = axios.post(url,newPerson)
    const response = await request;
    return response.data;
}

const deleteCourse = async (id)=>{
    const request = axios.delete(`${url}/${id}`);
    const response = await request;
    return response.data;
}

const updateCourse =async (id,updatePreson)=>{
    const request = axios.put(`${url}/${id}`,updatePreson);
    const response = await request;
    return response.data;
}

export {
    getAllCourses,
    addNewCourse,
    deleteCourse,
    updateCourse
}