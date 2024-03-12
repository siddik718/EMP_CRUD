import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllEmployee = () => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_API);
                setEmployees(res.data.employees);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const navigate = useNavigate();
    const findDetails = (id) => {
        navigate(id);
    }
    const toggleBlock = async (id) => {
        try {
            const endpoint = import.meta.env.VITE_API + "/"+ id + "/status";
            const res = await axios.patch(endpoint);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const removeEmployee = async (id) => {
        try {
            const endpoint = import.meta.env.VITE_API + "/"+ id;
            const res = await axios.delete(endpoint);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <table border="1">
                <thead>

                    <tr>
                        <th colSpan="2">Full Name</th>
                        <th colSpan="3">Options</th>
                    </tr>
                </thead>
                <tbody>

                    {employees.map(emp => (
                        <tr key={emp._id}>
                            <td>{emp.firstName}</td>
                            <td >{emp.lastName}</td>
                            <td onClick={() => findDetails(emp._id)} style={{ cursor: 'pointer' }}>Details</td>
                            <td onClick={() => toggleBlock(emp._id)} style={{ cursor: 'pointer' }}> {emp.isBlocked ? "Unblock" : "Block"}</td>
                            <td onClick={() => removeEmployee(emp._id)} style={{ cursor: 'pointer' }} > Delete </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllEmployee;