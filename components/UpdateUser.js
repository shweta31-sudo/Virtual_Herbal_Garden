import { useState } from 'react';
import { updateUser } from '../services/userService';
import './UpdateUser.css';

const UpdateUser = () => {
    const [id, setId] = useState('');
    const [user, setUser] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, user);
            alert('User updated successfully');
        } catch (error) {
            alert('Failed to update user');
        }
    };

    return (
        <div>
            <h2>Update User</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="User ID" value={id} onChange={(e) => setId(e.target.value)} required />
                <input type="text" name="username" placeholder="New Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="New Password" onChange={handleChange} required />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateUser;
