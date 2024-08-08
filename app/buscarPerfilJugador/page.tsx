"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function BuscarPerfilJugador() {
    const [username, setUsername] = useState<string>("");
    const [jugador, setJugador] = useState<any | null>(null);
    const [mensaje, setMensaje] = useState<string | null>(null);
    const router = useRouter();
    
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }
    }, [router])

    // maneja el cambio de entrada
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    
    // maneja el envio del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje(null);
        setJugador(null);

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setMensaje("No estas autenticado");
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const encodedUsername = encodeURIComponent(username);
            const response = await axios.get(`/api/jugador/${encodedUsername}`, config);

            if (response.data.error) {
                setMensaje(response.data.error);
            } else {
                setJugador(response.data);
            }
        } catch (error) {
            console.log('Error al buscar el perfil del jugador', error);
            setMensaje('Error al buscar el perfil del jugador');
        }
    };

    return (
        <div>
        <h1>Buscar Perfil de Jugador</h1>
        <form onSubmit={handleSubmit}>
            <label>
            Nombre de Usuario:
            <input
                type="text"
                value={username}
                onChange={handleInputChange}
                required
            />
            </label>
            <button type="submit">Buscar</button>
        </form>

        {mensaje && <p>{mensaje}</p>}

        {jugador && (
            <div>
            <h2>Perfil de Jugador: {jugador.username}</h2>
            <ul>
                <li>Nombre: {jugador.nombre}</li>
                <li>Apellido: {jugador.apellido}</li>
                <li>Edad: {jugador.edad}</li>
                <li>Rango: {jugador.rango}</li>
                <li>Rol: {jugador.rol}</li>
                <li>Rol Secundario: {jugador.rolSecundario}</li>
                <li>Biografía: {jugador.biografia}</li>
                <li>Disponibilidad: {jugador.disponibilidad}</li>
                <li>Perfil Tracker: {jugador.perfilTracker}</li>
                <li>Nacionalidad: {jugador.nacionalidad}</li>
                <li>Idioma: {jugador.idioma}</li>
                <li>Idioma Secundario: {jugador.idiomaSecundario}</li>
                <li>Twitter: {jugador.twitter}</li>
                <li>Twitch: {jugador.twitch}</li>
                <li>Kick Stream: {jugador.kickStream}</li>
                <li>YouTube: {jugador.youtube}</li>
            </ul>
            </div>
        )}
    </div>
    );
}

export default BuscarPerfilJugador