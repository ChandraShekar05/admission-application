import Form from '../components/usercomponents/Form'
import DrawerAppBar from '../components/usercomponents/DrawerAppBar';
import CompanyInfo from '../components/usercomponents/CompanyInfo';
import CourseCards from '../components/usercomponents/CourseCards';
import Footer from '../components/usercomponents/Footer';
import React, { useEffect, useState, useRef } from 'react';
import { getAllCourses } from '../services/coursesApi';
import { Container } from '@mui/material';

const User = () => {

    const [courses, setCourses] = useState([])
    const formRef = useRef(null);
    const courseCardsRef = useRef(null);
    const contactsRef = useRef(null);
    const aboutRef = useRef(null)
    const homeRef = useRef(null)
    useEffect(() => {
        getAllCourses()
            .then(data => setCourses(data))
    }, [])
    const scrollToForm = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToCourses = () => {
        if (courseCardsRef.current) {
            courseCardsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToContact = () => {
        if (contactsRef.current) {
            contactsRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }
    const scrollToAbout = () => {
        if (aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }
    const scrollToHome = () => {
        if (homeRef.current) {
            homeRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }
    return (
        <div style={{ background: "#FDFFFC" }}>
            <div ref={homeRef}>
                <DrawerAppBar scrollToCourses={scrollToCourses} scrollToContact={scrollToContact} scrollToAbout={scrollToAbout} scrollToHome={scrollToHome} />
            </div>
            <div ref={aboutRef}>
                <CompanyInfo />
            </div>
            <Container maxWidth="lg">
                <div ref={courseCardsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                    {courses.map((course, index) => (
                        <CourseCards
                            key={index}
                            name={course.name}
                            subheader={`Duration: ${course.duration}`}
                            description={course.description}
                            amount={course.amount}
                            scrollToForm={scrollToForm}
                        />
                    ))}
                </div>
            </Container>
            <div ref={formRef}>
                <Form courses={courses} />
            </div>
            <div ref={contactsRef}>
                <Footer />
            </div>
        </div>
    );
};

export default User;