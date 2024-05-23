"use client";

import Image from 'next/image';
import { useState } from 'react';

export default function SignUp() {
    const [formulario, setFormulario] = useState({
        FirstName: "",
        LastName: "",
        Phone: "",
        Age: "",
        Correo: "",
        Contraseña: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(formulario);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw
        };

        try {
            const response = await fetch("http://localhost:5134/insertuser", requestOptions);
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-lg">
                <div className="flex justify-center">
                    <Image src="/next.svg" alt="Next.js Logo" width={72} height={16} />
                </div>
                <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                    Create an account
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="FirstName" className="sr-only">First Name</label>
                            <input
                                id="FirstName"
                                name="FirstName"
                                type="text"
                                autoComplete="given-name"
                                required
                                value={formulario.FirstName}
                                onChange={handleChange}
                                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="LastName" className="sr-only">Last Name</label>
                            <input
                                id="LastName"
                                name="LastName"
                                type="text"
                                autoComplete="family-name"
                                required
                                value={formulario.LastName}
                                onChange={handleChange}
                                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Last Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="Phone" className="sr-only">Phone Number</label>
                            <input
                                id="Phone"
                                name="Phone"
                                type="tel"
                                autoComplete="Phone"
                                required
                                value={formulario.Phone}
                                onChange={handleChange}
                                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Phone Number"
                            />
                        </div>
                        <div>
                            <label htmlFor="Age" className="sr-only">Age</label>
                            <input
                                id="Age"
                                name="Age"
                                type="number"
                                autoComplete="Age"
                                required
                                value={formulario.Age}
                                onChange={handleChange}
                                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Age"
                            />
                        </div>
                        <div>
                            <label htmlFor="Correo" className="sr-only">Email</label>
                            <input
                                id="Correo"
                                name="Correo"
                                autoComplete="Correo"
                                required
                                value={formulario.Correo}
                                onChange={handleChange}
                                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="Contraseña" className="sr-only">Password</label>
                            <input
                                id="Contraseña"
                                name="Contraseña"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={formulario.Contraseña}
                                onChange={handleChange}
                                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
