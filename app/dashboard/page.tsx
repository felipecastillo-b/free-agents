"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Dashboard() {
    const [usuario, setUsuario] = useState<any>({});
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token'); // Toma el token almacenado en localstorage

        async function fetchUsuario() {
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                const response = await axios.get('/api/dashboard', config);
                setUsuario(response.data);
            } catch (error) {
                console.error('Error al obtener datos del dashboard:', error);
            }
        }

        fetchUsuario();
    }, [router]);

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                <li>Nombre: {usuario.username}</li>
                <li>Email: {usuario.email}</li>
                {/* Agregar mas campos aqui segun sea necesario */}
            </ul>
        </div>
    );
}

export default Dashboard;