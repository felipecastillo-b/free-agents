"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

const InvitarJugador: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [equipoId, setEquipoId] = useState<string | null>(null);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        if (id) {
            setEquipoId(id);
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!equipoId) {
            setError('Equipo ID no está disponible');
            return;
        }

        try {
            await axios.post('/api/invitarJugador', { username, mensaje, equipoId }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setSuccess('Invitación enviada correctamente');
            setUsername('');
            setMensaje('');
            router.push('/misEquipos'); // Redirigir a la vista de mis equipos
        } catch (err) {
            setError('Error al enviar la invitación');
        }
    };

    return (
        <div>
            <h1>Invitar Jugador</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de Usuario:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Mensaje:</label>
                    <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} required></textarea>
                </div>
                <button type="submit">Enviar Invitación</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default InvitarJugador;
