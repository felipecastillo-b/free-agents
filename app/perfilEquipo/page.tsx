"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Miembro {
    jugador: {
        id: number;
        username: string;
    };
    rol: string | null;
}

interface Equipo {
    id: number;
    nombre: string;
    descripcion: string;
    fundadoEn: string;
    miembros: Miembro[];
}

const PerfilEquipo: React.FC = () => {
    const [equipo, setEquipo] = useState<Equipo | null>(null);
    const [esAdministrador, setEsAdministrador] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const equipoId = searchParams.get("id");

    useEffect(() => {
        if (!equipoId) {
            console.error("Equipo ID is undefined");
            return;
        }

        const fetchEquipo = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`/api/verEquipo/${equipoId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setEquipo(res.data.equipo);
                setEsAdministrador(res.data.esAdministrador);
            } catch (error) {
                console.error('Error fetching equipo data', error);
            }
        };

        fetchEquipo();
    }, [equipoId]);

    if (!equipo) {
        return <div>Loading...</div>;
    }

    const handleInvitarJugador = () => {
        router.push(`/invitarJugador?id=${equipoId}`);
    };

    return (
        <div>
            <h1>Nombre: {equipo.nombre}</h1>
            <p>Descripción: {equipo.descripcion}</p>
            <p>Fundado en: {new Date(equipo.fundadoEn).toLocaleDateString()}</p>

            {esAdministrador && (
                <button onClick={handleInvitarJugador}>
                    Invitar Jugador
                </button>
            )}

            <h2>Miembros del Equipo</h2>
            <ul>
                {equipo.miembros.map((miembro) => (
                    <li key={miembro.jugador.id}>
                        <p>Nickname: {miembro.jugador.username}</p>
                        <p>Rol: {miembro.rol ?? 'No asignado'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PerfilEquipo;
