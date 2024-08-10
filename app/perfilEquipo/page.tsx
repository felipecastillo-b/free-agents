"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Define el tipo para el equipo
interface Equipo {
    id: number;
    nombre: string;
    descripcion: string;
    fundadoEn: string; // Puede ser 'string' o 'Date', dependiendo de como venga el dato desde la API
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

    return (
        <div>
            <h1>nombre: {equipo.nombre}</h1>
            <p>descripcion: {equipo.descripcion}</p>
            <p>Fundado en: {new Date(equipo.fundadoEn).toLocaleDateString()}</p>

            {esAdministrador && (
                <button onClick={() => {/* Logica para invitar a un jugador */}}>
                    Invitar Jugador
                </button>
            )}
        </div>
    );
};

export default PerfilEquipo;
