import { useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_API, { firstName, lastName, email, phoneNumber });
      console.log(res.data);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <br />
        <input type="text" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <br />
        <input type="email" placeholder="Enter Email " value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type="text" placeholder="Enter Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default AddEmployee