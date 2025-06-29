import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

export default function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const { token } = await register({ name, email, password });
            localStorage.setItem('token', token);
            navigate('/');
            window.location.reload();
        } catch (err) {
            console.log(err);
            setError('Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-3xl font-bold mb-6">Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-indigo-700">
                    Register
                </button>
            </form>
        </div>
    );
}