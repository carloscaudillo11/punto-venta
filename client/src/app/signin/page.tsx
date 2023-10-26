'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import Spinner from '@/components/Spinner';

const LoginPage = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [sessionStatus, router]);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password
    });
    if (res?.error) {
      setLoading(false);
      toast.error(res.error);
    }
  });
  return (
    <>
      {sessionStatus === 'loading' && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blue-700 bg-opacity-20 z-50">
          <Spinner />
        </div>
      )}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blue-700 bg-opacity-20 z-50">
          <Spinner />
        </div>
      )}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0 bg-white z-0">
        <Toaster position="top-center" richColors />
        <Image
          src="/images/logo.png"
          width={130}
          height={130}
          alt="Logo"
          quality={100}
          className="flex items-center mb-6 mx-auto w-auto h-auto"
          priority={true}
        />
        <div className="w-full bg-white rounded-lg border border-gray-300 md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              Ingresa a tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Correo Electronico
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'El correo es requerido',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Correo invalido'
                    }
                  })}
                  className={` border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5 ${
                    errors.email
                      ? 'border-red-600 border-2'
                      : 'focus:border-blue-600 focus:border-2'
                  }`}
                  placeholder="name@company.com"
                />
                {errors.email && (
                  <div className="flex gap-1 p-1">
                    <ExclamationCircleIcon className="text-red-500 w-4 h-4" />
                    <span className="text-red-500 text-xs">
                      {errors.email.message}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Contraseña
                </label>
                <input
                  type="password"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'La contraseña es requerida'
                    }
                  })}
                  placeholder="••••••••"
                  className={` border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5 ${
                    errors.password
                      ? 'border-red-600 border-2'
                      : 'focus:border-blue-600 focus:border-2'
                  }`}
                />
                {errors.password && (
                  <div className="flex gap-1 p-1">
                    <ExclamationCircleIcon className="text-red-500 w-4 h-4" />
                    <span className="text-red-500 text-xs">
                      {errors.password.message}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500">Recordarme</label>
                  </div>
                </div>
                <Link
                  href="#"
                  className="text-sm font-semibold md:tracking-wide tracking-normal text-cyan-700 "
                >
                  ¿Olvidaste la contraseña?
                </Link>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-slate-950 hover:bg-cyan-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Acceder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
