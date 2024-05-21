"use client"; // Asegúrate de que esta línea esté al inicio del archivo

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Usa next/navigation en lugar de next/router
import { FormEvent } from 'react'; // Importa FormEvent

export default function Login() {
  const router = useRouter(); // Usa el hook useRouter

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    // Aquí puedes agregar la lógica para el inicio de sesión
    // Por ahora, simplemente redireccionamos a otra página, por ejemplo, "/dashboard"
    router.push('/dashboard'); // Redirige a la página deseada
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-lg">
          <div className="flex justify-center">
            <Image src="/next.svg" alt="Next.js Logo" width={72} height={16} />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Sign in to your account
          </h2>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button

                  type="submit"
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {"Don't have an account? "}
              <Link href="/auth">
                <span className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
}
