
"use client";

import { useState, FormEvent } from 'react';

interface Reservation {
    NombreCliente: string;
    Contacto: string;
    Fecha: string;
    Hora: string;
    TipoServicio: string;
    DuracionServicio: string;
    RequisitosEspeciales: string;
}

export default function Page() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [form, setForm] = useState<Reservation>({
        NombreCliente: '',
        Contacto: '',
        Fecha: '',
        Hora: '',
        TipoServicio: '',
        DuracionServicio: '',
        RequisitosEspeciales: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleAddReservation = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setReservations([...reservations, form]);
        setForm({
            NombreCliente: '',
            Contacto: '',
            Fecha: '',
            Hora: '',
            TipoServicio: '',
            DuracionServicio: '',
            RequisitosEspeciales: ''
        });
    };

    const handleDeleteReservation = (index: number) => {
        const newReservations = reservations.filter((_, i) => i !== index);
        setReservations(newReservations);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex">
            <div className="w-1/2 pr-8">
                <h2 className="text-3xl font-extrabold mb-6 text-black">Agregar Reservación</h2>
                <form onSubmit={handleAddReservation} className="space-y-4 bg-white p-6 rounded shadow-lg">
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
            <div className="w-1/2 pl-8">
                <h2 className="text-3xl font-extrabold mb-6 text-black">Reservaciones</h2>
                <div className="bg-white p-6 rounded shadow-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre del Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Servicio</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {reservations.map((reservation, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-black">{reservation.NombreCliente}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-black ">{reservation.Contacto}</td>
                                <td className="px-6 py-4 whitespace-nowra text-black" >{reservation.Fecha}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-black" >{reservation.Hora}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-black">{reservation.TipoServicio}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-black">{reservation.DuracionServicio}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
