"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', {
                username,
                password,
            });

            const token = response.data.token;
            localStorage.setItem('token', token); // Guarda el token en localstorage

            console.log(response.data); // Para manejar la respuesta

            // Redirecciona a otra pagina despues del login
            router.push('/dashboard'); // Cambia '/dashboard' por la ruta deseada despues del login
        } catch (error) {
            console.error('Error de login:', error);
            // Manejar errores de login, por ejemplo mostrar un mensaje de error al usuario
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;