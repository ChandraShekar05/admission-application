import { useState, useEffect} from 'react';
import { getAllAdmins } from '../services/superAdminApi';
import AdminTable from '../components/admin/AdminTable';
const SuperAdmin = () => {
    const [admins, setAdmins] = useState([]);
    useEffect(() => {
        getAllAdmins()
            .then((admins) => {
                setAdmins(admins);
            })
            .catch((error) => console.error('Error fetching admins:', error));
    }, []);
    return (
        <div>
            <AdminTable admins={admins} setAdmins={setAdmins} />
        </div>
    );
};

export default SuperAdmin;