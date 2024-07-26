"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function PerfilJugador() {
    const [jugador, setJugador] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
            return;
        }

        const fetchJugador = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                };

                const response = await axios.get('/api/perfilJugador', config);
                setJugador(response.data);
            } catch (error) {
                console.error('Error al obtener perfil del jugador:', error);
                router.push('/dashboard'); // Redirigir al dashboard si hay un error
            }
        };

        fetchJugador();
    }, [router]);

    // Escoger luego al hacer las vistas si mostrar todos los datos o solo los datos rellenados
    return (
        <div>
            <h1>Perfil del Jugador</h1>
            {jugador ? (
                <ul>
                    <li>Nombre: {jugador.nombre}</li>
                    <li>Apellido: {jugador.apellido}</li>
                    <li>Edad: {jugador.edad}</li>
                    <li>Rango: {jugador.rango}</li>
                    <li>Rol: {jugador.rol}</li>
                    {jugador.rolSecundario && <li>Rol Secundario: {jugador.rolSecundario}</li>}
                    {jugador.biografia && <li>Biografía: {jugador.biografia}</li>}
                    {jugador.disponibilidad && <li>Disponibilidad: {jugador.disponibilidad}</li>}
                    {jugador.perfilTracker? <li>Perfil Tracker: {jugador.perfilTracker}</li> : <li>Perfil Tracker: No disponible</li>}
                    {jugador.nacionalidad && <li>Nacionalidad: {jugador.nacionalidad}</li>}
                    {jugador.idioma && <li>Idioma: {jugador.idioma}</li>}
                    {jugador.idiomaSecundario && <li>Idioma Secundario: {jugador.idiomaSecundario}</li>}
                    {jugador.twitter && <li>Twitter: {jugador.twitter}</li>}
                    {jugador.twitch && <li>Twitch: {jugador.twitch}</li>}
                    {jugador.kickStream && <li>Kick Stream: {jugador.kickStream}</li>}
                    {jugador.youtube? <li>YouTube: {jugador.youtube}</li> : <li>Youtube: No disponible</li>}
                </ul>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export default PerfilJugador;
