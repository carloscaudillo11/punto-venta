'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = (): JSX.Element => {
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const handledsubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: formData.get('email') as string,
        password: formData.get('password') as string
      });
      if (res?.error) setError(res?.error);
      if (res?.ok) router.push('/dashboard');
    } catch (error) {
      console.error(error);
      setError('Error al iniciar sesión');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0 bg-gray-50">
      {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
      <Image
        src="/images/logo.png"
        width={150}
        height={150}
        alt="Logo"
        quality={100}
        className="flex items-center mb-6 mx-auto w-auto h-auto"
        priority={true}
      />
      <div className="w-full bg-white rounded-lg shadow-md border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
            Ingresa a tu cuenta
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handledsubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Correo Electronico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-blue-600 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-blue-600 block w-full p-2.5"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500">
                    Recordarme
                  </label>
                </div>
              </div>
              <Link
                href="#"
                className="text-sm font-medium text-sky-700 hover:underline"
              >
                ¿Olvidaste la contraseña?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-slate-950 hover:bg-sky-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
