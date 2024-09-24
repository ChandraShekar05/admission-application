import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import User from './pages/User';
import Admin from './pages/admin';
import ApplicantData from './components/admin/ApplicantData';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/applicants/:id" element={<ApplicantData />} />
                <Route path="/" element={<User/>} />
            </Routes>
        </Router>
    );

}
export default App;