"use client"
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function RegistrarJugador() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [rango, setRango] = useState('');
    const [rol, setRol] = useState('');
    const [rolSecundario, setRolSecundario] = useState('');
    const [biografia, setBiografia] = useState('');
    const [disponibilidad, setDisponibilidad] = useState('');
    const [perfilTracker, setPerfilTracker] = useState('');
    const [nacionalidad, setNacionalidad] = useState('');
    const [idioma, setIdioma] = useState('');
    const [idiomaSecundario, setIdiomaSecundario] = useState('');
    const [twitter, setTwitter] = useState('');
    const [twitch, setTwitch] = useState('');
    const [kickStream, setKickStream] = useState('');
    const [youtube, setYoutube] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            const response = await axios.post('/api/registrarJugador', {
                nombre,
                apellido,
                edad: parseInt(edad, 10),
                rango,
                rol,
                rolSecundario,
                biografia,
                disponibilidad,
                perfilTracker,
                nacionalidad,
                idioma,
                idiomaSecundario,
                twitter,
                twitch,
                kickStream,
                youtube,
            }, config);

            console.log('Jugador registrado:', response.data);

            // Redirigir al dashboard después del registro
            router.push('/dashboard');
        } catch (error) {
            console.error('Error al registrar jugador:', error);
        }
    };

    return (
        <div>
            <h1>Registrar como Jugador</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Edad"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Rango"
                    value={rango}
                    onChange={(e) => setRango(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Rol"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                    required
                />
                {/* Campos opcionales */}
                <input
                    type="text"
                    placeholder="Rol Secundario"
                    value={rolSecundario}
                    onChange={(e) => setRolSecundario(e.target.value)}
                />
                <textarea
                    placeholder="Biografía"
                    value={biografia}
                    onChange={(e) => setBiografia(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Disponibilidad"
                    value={disponibilidad}
                    onChange={(e) => setDisponibilidad(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Perfil Tracker"
                    value={perfilTracker}
                    onChange={(e) => setPerfilTracker(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nacionalidad"
                    value={nacionalidad}
                    onChange={(e) => setNacionalidad(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Idioma"
                    value={idioma}
                    onChange={(e) => setIdioma(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Idioma Secundario"
                    value={idiomaSecundario}
                    onChange={(e) => setIdiomaSecundario(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Twitter"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Twitch"
                    value={twitch}
                    onChange={(e) => setTwitch(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Kick Stream"
                    value={kickStream}
                    onChange={(e) => setKickStream(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="YouTube"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default RegistrarJugador;
