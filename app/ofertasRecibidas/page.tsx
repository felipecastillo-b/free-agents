"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Oferta {
    id: number;
    equipoId: number;
    jugadorId: number;
    mensaje: string;
    estado: string;
    createdAt: string;
    updatedAt: string;
    Equipo: {
        nombre: string;
    };
}

const OfertasRecibidas: React.FC = () => {
    const [ofertas, setOfertas] = useState<Oferta[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchOfertas = async () => {
            try {
                const response = await axios.get('/api/ofertasRecibidas', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                setOfertas(response.data);
            } catch (err) {
                setError('Error al obtener ofertas');
            }
        };

        fetchOfertas();
    }, []);

    const handleRespuesta = async (id: number, estado: string) => {
        try {
            await axios.put(`/api/respuestaOferta/${id}`, { estado }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setOfertas(ofertas.map(oferta => oferta.id === id ? { ...oferta, estado } : oferta));
        } catch (err) {
            setError('Error al actualizar la oferta');
        }
    };

    return (
        <div>
            <h1>Ofertas Recibidas</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {ofertas.map(oferta => (
                    <li key={oferta.id}>
                        <p>Equipo: {oferta.Equipo.nombre}</p>
                        <p>Mensaje: {oferta.mensaje}</p>
                        <p>Estado: {oferta.estado}</p>
                        {oferta.estado === 'Pendiente' && (
                            <div>
                                <button onClick={() => handleRespuesta(oferta.id, 'Aceptada')}>Aceptar</button>
                                <br />
                                <button onClick={() => handleRespuesta(oferta.id, 'Rechazada')}>Rechazar</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OfertasRecibidas;
