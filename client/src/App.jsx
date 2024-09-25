import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './pages/User';
import Admin from './pages/Admin';
import CoursesPage from './pages/coursesPage';
import ApplicantData from './components/admin/ApplicantData';
// import LoginPage from './pages/loginPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<Admin />}/>
                <Route path="/admin/applicants/:id" element={<ApplicantData />} />
                <Route path="/" element={<User/>} />
                <Route path="/admin/courses" element={<CoursesPage />} />
            </Routes>
        </Router>
    );

}
export default App;