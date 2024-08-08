"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function EditarEquipo() {
    const [nombre, setNombre] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");
    const [mensaje, setMensaje] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const equipoId = searchParams.get("id");

    useEffect(() => {
        if (equipoId) {
            fetchEquipoDetails(equipoId);
        }
    }, [equipoId]);

    const fetchEquipoDetails = async (id: string) => {
        try {
            const response = await axios.get(`/api/equipos/${id}`);
            const equipo = response.data;

            setNombre(equipo.nombre);
            setDescripcion(equipo.descripcion);
        } catch (error) {
            console.error("Error al obtener los detalles del equipo", error);
            setMensaje("Error al obtener los detalles del equipo");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje(null);

        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const data = { nombre, descripcion };

            const response = await axios.put(`/api/editarEquipo/${equipoId}`, data, config);

            if (response.data.error) {
                setMensaje(response.data.error);
            } else {
                setMensaje("Equipo actualizado exitosamente");
                // Redirige al usuario de nuevo a la página de Mis Equipos
                router.push("/misEquipos");
            }
        } catch (error) {
            console.error("Error al actualizar el equipo", error);
            setMensaje("Error al actualizar el equipo");
        }
    };

    return (
        <div>
            <h1>Editar Equipo</h1>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre del Equipo:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Actualizar Equipo</button>
            </form>
        </div>
    );
}

export default EditarEquipo;