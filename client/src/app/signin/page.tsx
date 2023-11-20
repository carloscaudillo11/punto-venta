'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import Spinner from '@/components/Loader/Spinner';
import { TextInput } from '@tremor/react';

const SignIn = (): JSX.Element => {
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
      <Toaster position="top-center" richColors />
      {sessionStatus === 'loading' || loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0 bg-white z-0">
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
                  <TextInput
                    {...register('email', {
                      required: 'El correo es requerido',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Correo invalido'
                      }
                    })}
                    placeholder="name@company.com"
                    error={!!errors.email}
                    errorMessage={errors.email?.message}
                    type="email"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Contraseña
                  </label>
                  <TextInput
                    {...register('password', {
                      required: {
                        value: true,
                        message: 'La contraseña es requerida'
                      }
                    })}
                    placeholder="••••••••"
                    error={!!errors.password}
                    errorMessage={errors.password?.message}
                    type="password"
                  />
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
      )}
    </>
  );
};

export default SignIn;
