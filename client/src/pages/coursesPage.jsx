import React, { useState, useEffect } from 'react';
import CourseTable from '../components/admin/CourseTable';
import { getAllCourses } from '../services/coursesApi';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getAllCourses()
            .then((courses) => {
                setCourses(courses);
            })
            .catch((error) => console.error('Error fetching courses:', error));
    }, []);

    return (
        <div>
            <CourseTable courses={courses} setCourses={setCourses} />
        </div>
    );
};

export default CoursesPage;