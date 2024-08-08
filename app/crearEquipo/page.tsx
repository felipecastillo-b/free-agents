"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

function CrearEquipo() {
    const [nombre, setNombre] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");
    const [fundadoEn, setFundadoEn] = useState<string>("");
    const [mensaje, setMensaje] = useState<string | null>(null);
    const router = useRouter();

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

            const data = {
                nombre,
                descripcion,
                fundadoEn: new Date(fundadoEn).toISOString(), // Formatea la fecha
            };

            const response = await axios.post("/api/crearEquipo", data, config);

            if (response.data.error) {
                setMensaje(response.data.error);
            } else {
                setMensaje("Equipo creado exitosamente");
                // Redirige al usuario de nuevo a la página de Mis Equipos
                router.push("/misEquipos");
            }
        } catch (error) {
            console.error("Error al crear el equipo", error);
            setMensaje("Error al crear el equipo");
        }
    };

    return (
        <div>
            <h1>Crear Nuevo Equipo</h1>
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
                <div>
                    <label htmlFor="fundadoEn">Fundado En:</label>
                    <input
                        type="date"
                        id="fundadoEn"
                        value={fundadoEn}
                        onChange={(e) => setFundadoEn(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Crear Equipo</button>
            </form>
        </div>
    );
}

export default CrearEquipo;
