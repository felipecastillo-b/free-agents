"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function EditarPerfilJugador() {
    const [jugador, setJugador] = useState<any>({
        nombre: "",
        apellido: "",
        edad: 0,
        rango: "",
        rol: "",
        rolSecundario: "",
        biografia: "",
        disponibilidad: "",
        perfilTracker: "",
        nacionalidad: "",
        idioma: "",
        idiomaSecundario: "",
        twitter: "",
        twitch: "",
        kickStream: "",
        youtube: "",
    });
    
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token"); // Toma el Token almacenado
    
        if (!token) {
            router.push("/login");
            return;
        }

        const fetchJugadorData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get("/api/perfilJugador", config);

                setJugador(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Error al cargar los datos del jugador:", error);
                setError("Error al cargar los datos del jugador.");
                setLoading(false);
            }
        };

        fetchJugadorData();
    }, [router]);

    // Maneja el cambio de entrada
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setJugador({ ...jugador, [name]: value });
    };

    // Maneja el envio del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            const response = await axios.put("/api/actualizarPerfilJugador", jugador, config);
        
            if (response.status === 200) {
                setSuccessMessage("Perfil Jugador Actualizado exitosamente");
                router.push("/perfilJugador");
            }
        } 
        catch (error) {
            console.log('Error al actualizar el Perfil del Jugador', error);
            setError("Error al actualizar el perfil del Jugador");
        }
    };

    if (loading) {
        return <div>Cargando ...</div>;
    }

    return (
    <div>
        <h1>Editar Perfil de Jugador</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

    <form onSubmit={handleSubmit}>
        <div>
            <label>
                Nombre:
                <input
                type="text"
                name="nombre"
                value={jugador.nombre}
                onChange={handleInputChange}
                required
                />
            </label>
            </div>

            <div>
            <label>
                Apellido:
                <input
                type="text"
                name="apellido"
                value={jugador.apellido}
                onChange={handleInputChange}
                required
                />
            </label>
            </div>

            <div>
            <label>
                Edad:
                <input
                type="number"
                name="edad"
                value={jugador.edad}
                onChange={handleInputChange}
                required
                />
            </label>
            </div>

            <div>
            <label>
                Rango:
                <input
                type="text"
                name="rango"
                value={jugador.rango}
                onChange={handleInputChange}
                required
                />
            </label>
            </div>

            <div>
            <label>
                Rol:
                <input
                type="text"
                name="rol"
                value={jugador.rol}
                onChange={handleInputChange}
                required
                />
            </label>
            </div>

            <div>
            <label>
                Rol Secundario:
                <input
                type="text"
                name="rolSecundario"
                value={jugador.rolSecundario}
                onChange={handleInputChange}
                />
            </label>
            </div>

            <div>
            <label>
                Biografía:
                <textarea
                name="biografia"
                value={jugador.biografia}
                onChange={handleInputChange}
                />
            </label>
            </div>

            <div>
            <label>
                Disponibilidad:
                <input
                type="text"
                name="disponibilidad"
                value={jugador.disponibilidad}
                onChange={handleInputChange}
                />
            </label>
            </div>

            <div>
            <label>
                Perfil Tracker:
                <input
                type="text"
                name="perfilTracker"
                value={jugador.perfilTracker}
                onChange={handleInputChange}
                />
            </label>
            </div>

            <div>
            <label>
                Nacionalidad:
                <input
                type="text"
                name="nacionalidad"
                value={jugador.nacionalidad}
                onChange={handleInputChange}
                />
            </label>
            </div>

            <div>
            <label>
                Idioma:
                <input
                type="text"
                name="idioma"
                value={jugador.idioma}
                onChange={handleInputChange}
                />
            </label>
            </div>

            <div>
            <label>
                Idioma Secundario:
                <input
                type="text"
                name="idiomaSecundario"
                value={jugador.idiomaSecundario}
                onChange={handleInputChange}
                />
            </label>
            </div>

            <div>
            <label>
                Twitter:
                <input
                type="text"
                name="twitter"
                value={jugador.twitter}
                onChange={handleInputChange}
                />
            </label>
            </div>

            <div>
            <label>
                Twitch:
                <input
                type="text"
                name="twitch"
                value={jugador.twitch}
                onChange={handleInputChange}
                />
            </label>
            </div>

            <div>
            <label>
                Kick Stream:
                <input
                type="text"
                name="kickStream"
                value={jugador.kickStream}
                onChange={handleInputChange}
                />
            </label>
            </div>

            <div>
            <label>
                YouTube:
                <input
                type="text"
                name="youtube"
                value={jugador.youtube}
                onChange={handleInputChange}
                />
            </label>
            </div>

            <button type="submit">Guardar Cambios</button>
        </form>
    </div>
    )
}

export default EditarPerfilJugador;