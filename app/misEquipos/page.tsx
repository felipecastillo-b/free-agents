"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Equipo {
    id: number;
    nombre: string;
    descripcion: string;
    fundadoEn: string | null;
    esAdministrador: boolean;
}

function MisEquipos() {
    const [equipos, setEquipos] = useState<Equipo[]>([]);
    const [mensaje, setMensaje] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        } else {
            fetchEquipos(token);
        }
    }, [router]);

    const fetchEquipos = async (token: string) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get('/api/misEquipos', config);

            if (response.data.error) {
                setMensaje(response.data.error);
            } else {
                setEquipos(response.data);
            }
        } catch (error) {
            console.error('Error al obtener los equipos del usuario', error);
            setMensaje('Error al obtener los equipos del usuario');
        }
    };

    const handleCreateTeam = () => {
        router.push("/crearEquipo");
    };

    const handleEditarEquipo = (id: number) => {
        router.push(`/editarEquipo?id=${id}`);
    };

    const handleBorrarEquipo = async (id: number) => {
        const confirmDelete = window.confirm('¿Estás seguro de que quieres borrar el Equipo?');
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                router.push("/login");
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.delete(`/api/borrarEquipo/${id}`, config);

            if (response.data.error) {
                setMensaje(response.data.error);
            } else {
                setMensaje("Equipo borrado exitosamente");
                // Actualiza la lista de equipos despues de borrar
                fetchEquipos(token);
            }
        } catch (error) {
            console.log('Error al borrar el equipo', error);
            setMensaje('Error al borrar el equipo');
        }
    };

    return (
        <div>
            <h1>Mis Equipos</h1>
            <button onClick={handleCreateTeam} style={{ marginBottom: "20px" }}>
                Crear Nuevo Equipo
            </button>
            {mensaje && <p>{mensaje}</p>}
            {equipos.length > 0 ? (
                <ul>
                    {equipos.map((equipo) => (
                        <li key={equipo.id}>
                            <h3>{equipo.nombre}</h3>
                            <p>{equipo.descripcion}</p>
                            <p>Fundado en: {equipo.fundadoEn ? new Date(equipo.fundadoEn).toLocaleDateString() : 'N/A'}</p>
                            {equipo.esAdministrador && (
                                <div>
                                    <button onClick={() => handleEditarEquipo(equipo.id)} style={{ marginRight: "10px" }}>Editar Equipo</button>
                                    <button onClick={() => handleBorrarEquipo(equipo.id)} style={{ backgroundColor: "red", color: "white" }}>Borrar Equipo</button>
                                </div>
                            )}
                            <br /><br />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No perteneces a ningun equipo.</p>
            )}
        </div>
    );
}

export default MisEquipos;
