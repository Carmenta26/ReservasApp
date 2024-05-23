"use client";

import { useState, useEffect, FormEvent } from 'react';

interface Reservation {
    reservacionID: number;
    NombreCliente: string;
    Contacto: string;
    Fecha: string;
    Hora: string;
    TipoServicio: string;
    DuracionServicio: string;
    RequisitosEspeciales: string;
}

export default function Dashboard() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [form, setForm] = useState<Reservation>({
        reservacionID: 0,
        NombreCliente: '',
        Contacto: '',
        Fecha: '',
        Hora: '',
        TipoServicio: '',
        DuracionServicio: '',
        RequisitosEspeciales: '',
    });



    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await fetch('http://localhost:5134/reservations');
            if (!response.ok) {
                throw new Error('Error fetching reservations');
            }
            const data = await response.json();
            console.log('Fetched reservations:', data);

            const mappedData = data.map((item: any) => ({
                reservacionID: item.reservacionID,
                NombreCliente: item.nombreCliente || '',
                Contacto: item.contacto || '',
                Fecha: item.fecha || '',
                Hora: item.hora || '',
                TipoServicio: item.tipoServicio || '',
                DuracionServicio: item.duracionServicio || '',
                RequisitosEspeciales: item.requisitosEspeciales || '',
            }));

            console.log('Mapped reservations:', mappedData);
            setReservations(mappedData);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const sendReservationToServer = async (reservation: Reservation) => {
        try {
            let url = 'http://localhost:5134/addreserv';
            let method = 'POST';

            // Si hay un índice de reserva seleccionado, cambia la URL y el método HTTP a PUT para actualizar
            if (selectedReservationIndex !== null) {
                url = `http://localhost:5134/updatereservation/${reservation.reservacionID}`;
                method = 'PUT';
                selectedReservationIndex == null
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservation),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error en la solicitud:', errorData);
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();
            console.log('Operación completada con éxito:', data);
            return data;
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            throw error;
        }
    };

    const handleAddReservation = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newReservation = { ...form };

        try {
            await sendReservationToServer(newReservation);
            fetchReservations(); // Fetch the updated list of reservations
            setForm({
                reservacionID: 0,
                NombreCliente: '',
                Contacto: '',
                Fecha: '',
                Hora: '',
                TipoServicio: '',
                DuracionServicio: '',
                RequisitosEspeciales: ''
            });
        } catch (error) {
            console.error('Error al agregar la reservación:', error);
        }
    };

    const handleDeleteReservation = async (index: number) => {
        try {
            // Obtener el ID de la reserva que se va a eliminar
            const reservationIdToDelete = reservations[index].reservacionID;

            // Llamar al endpoint para eliminar la reserva
            const response = await fetch(`http://localhost:5134/deletereservation/${reservationIdToDelete}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la reserva');
            }

            // Si la eliminación fue exitosa, actualizar la lista de reservas
            fetchReservations();
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
        }
    };
    const [selectedReservationIndex, setSelectedReservationIndex] = useState<number | null>(null);

    const handleRowClick = (index: number) => {
        setSelectedReservationIndex(index);
        setForm(reservations[index]); // Set the form data to the selected reservation
    };


    const resetForm = () => {
        setForm({
            reservacionID: 0,
            NombreCliente: '',
            Contacto: '',
            Fecha: '',
            Hora: '',
            TipoServicio: '',
            DuracionServicio: '',
            RequisitosEspeciales: '',
        });
        setSelectedReservationIndex(null); // Reset the selectedReservationIndex to null
    };

    const handleOutsideClick = () => {
        resetForm(); // Reset the form and selectedReservationIndex when clicking outside the table
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col md:flex-row" onClick={handleOutsideClick}>
            <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-4 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 text-black">Agregar Reservación</h2>
                <form onSubmit={handleAddReservation} className="space-y-4 bg-white p-4 md:p-6 rounded shadow-lg" onClick={(e) => e.stopPropagation()}>
                    <div>
                        <label htmlFor="NombreCliente" className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
                        <input
                            id="NombreCliente"
                            name="NombreCliente"
                            type="text"
                            value={form.NombreCliente}
                            onChange={handleInputChange}
                            required
                            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="Contacto" className="block text-sm font-medium text-gray-700">Contacto</label>
                        <input
                            id="Contacto"
                            name="Contacto"
                            type="text"
                            value={form.Contacto}
                            onChange={handleInputChange}
                            required
                            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="Fecha" className="block text-sm font-medium text-gray-700">Fecha</label>
                        <input
                            id="Fecha"
                            name="Fecha"
                            type="date"
                            value={form.Fecha}
                            onChange={handleInputChange}
                            required
                            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="Hora" className="block text-sm font-medium text-gray-700">Hora</label>
                        <input
                            id="Hora"
                            name="Hora"
                            type="time"
                            value={form.Hora}
                            onChange={handleInputChange}
                            required
                            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="TipoServicio" className="block text-sm font-medium text-gray-700">Tipo de Servicio</label>
                        <input
                            id="TipoServicio"
                            name="TipoServicio"
                            type="text"
                            value={form.TipoServicio}
                            onChange={handleInputChange}
                            required
                            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="DuracionServicio" className="block text-sm font-medium text-gray-700">Duración del Servicio</label>
                        <input
                            id="DuracionServicio"
                            name="DuracionServicio"
                            type="text"
                            value={form.DuracionServicio}
                            onChange={handleInputChange}
                            required
                            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="RequisitosEspeciales" className="block text-sm font-medium text-gray-700">Requisitos Especiales</label>
                        <textarea
                            id="RequisitosEspeciales"
                            name="RequisitosEspeciales"
                            value={form.RequisitosEspeciales}
                            onChange={handleInputChange}
                            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Agregar Reservación
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-8">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 text-black">Reservaciones</h2>
                <div className="bg-white p-4 md:p-6 rounded shadow-lg overflow-x-auto" onClick={(e) => e.stopPropagation()}>
                    <table className="min-w-full divide-y divide-gray-200 table-auto">
                        <thead>
                        <tr>
                            <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre del Cliente</th>
                            <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                            <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                            <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Servicio</th>
                            <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración del Servicio</th>
                            <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requisitos Especiales</th>
                            <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {reservations.map((reservation, index) => (
                            <tr key={index} onClick={() => handleRowClick(index)} className="cursor-pointer hover:bg-gray-50">
                                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-black">{reservation.NombreCliente}</td>
                                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-black">{reservation.Contacto}</td>
                                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-black">{reservation.Fecha}</td>
                                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-black">{reservation.Hora}</td>
                                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-black">{reservation.TipoServicio}</td>
                                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-black">{reservation.DuracionServicio}</td>
                                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-black">{reservation.RequisitosEspeciales}</td>
                                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleDeleteReservation(index)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
