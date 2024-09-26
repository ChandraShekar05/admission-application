import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import User from "./pages/User"
import Admin from "./pages/admin"
import CoursesPage from "./pages/coursesPage"
import ApplicantData from "./components/admin/ApplicantData"
import AdminNavbar from "./pages/AdminNavbar"
import LoginPage from "./pages/LoginPage"
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<User />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminNavbar/>}>
                    <Route index element={<Admin />} />
                    <Route path="applicants/:id" element={<ApplicantData />} />
                    <Route path="courses" element={<CoursesPage />} />
                </Route>
            </Routes>
        </Router>
    )
}
export default App
