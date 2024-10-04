import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import User from "./pages/User"
import Admin from "./pages/admin"
import CoursesPage from "./pages/coursesPage"
import ApplicantData from "./components/admin/ApplicantData"
import AdminNavbar from "./pages/AdminNavbar"
import LoginPage from "./pages/LoginPage"


import ProtectedRoute from "./components/admin/ProtectedRoute"
import SuperAdmin from "./pages/SuperAdmin"
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<User />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<ProtectedRoute><AdminNavbar/></ProtectedRoute>}>
                    <Route index element={<Admin />} />
                    <Route path="applicants/:id" element={<ApplicantData />} />
                    <Route path="courses" element={<CoursesPage />} />
                    <Route path="superadmin" element={ <SuperAdmin /> } />
                </Route>
            </Routes>
        </Router>
    )
}
export default App
