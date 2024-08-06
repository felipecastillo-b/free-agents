"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Dashboard() {
    const [usuario, setUsuario] = useState<any>({});
    const [esJugador, setEsJugador] = useState<boolean>(false);
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

                // Verifica si el Usuario es Jugador
                const jugadorResponse = await axios.get('/api/esJugador', config);
                setEsJugador(jugadorResponse.data.esJugador);

            } catch (error) {
                console.error('Error al obtener datos del dashboard:', error);
                //console.log('Redirigir al login si ocurre un error')
                //router.push('/login');

                if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
                    localStorage.removeItem("token"); // Opcional limpiar token invalido
                    router.push("/login");
                }
            }
        }

        fetchUsuario();
    }, [router]);

    // Funcion que redirige a Registrar Jugador
    const handleRegisterAsPlayer = () => {
        router.push('/registrarJugador');
    };

    // Funcion que redirige a Perfil Jugador
    const handleViewPlayerProfile = () => {
        router.push('/perfilJugador');
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {usuario.username ? (
                <ul>
                    <li>Nombre: {usuario.username}</li>
                    <li>Email: {usuario.email}</li>
                    {/* Agregar mas campos aqui segun sea necesario */}
                </ul>
            ) : (
                <p>Cargando...</p>
            )}

            {esJugador ? (
                <button onClick={handleViewPlayerProfile}>Perfil Jugador</button>
            ) : (
                <button onClick={handleRegisterAsPlayer}>Registrar como Jugador</button>
            )}
        </div>
    );
}

export default Dashboard;