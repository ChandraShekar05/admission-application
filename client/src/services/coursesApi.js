import axios from "axios";

const url = 'http://localhost:3001/api/courses'





const getAllCourses =()=>{
   const request = axios.get(url);
   return request.then(response=>response.data);
}

const addNewCourse =(newPerson)=>{
    const request = axios.post(url,newPerson,{
        withCredentials: true // This ensures cookies are sent
      })
    return request.then(response=>response.data);
}

const deleteCourse = (id)=>{
    const request = axios.delete(`${url}/${id}`,{
        withCredentials: true // This ensures cookies are sent
      });
    return request.then(response=>response.data)
}

const updateCourse =(id,updatePreson)=>{
    const request = axios.put(`${url}/${id}`,updatePreson,{
        withCredentials: true // This ensures cookies are sent
      });
    return request.then(response=>response.data)
}

export {
    getAllCourses,
    addNewCourse,
    deleteCourse,
    updateCourse
}