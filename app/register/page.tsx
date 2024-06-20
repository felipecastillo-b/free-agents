'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Register = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', form);
            console.log(response.data);
            router.push('/login'); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" onChange={handleChange} placeholder="Username" />
            <input type="email" name="email" onChange={handleChange} placeholder="Email" />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;