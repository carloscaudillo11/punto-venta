import Link from 'next/link';

const NotFoundPage = (): JSX.Element => {
  return (
    <div className="h-full">
      <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-slate-950">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pagina no encontrada
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Lo siento, No pudimos encontrar la pagina
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-slate-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Volver al Inicio
            </Link>
            <Link href="/" className="text-sm font-semibold text-gray-900">
              {' '}
              Contactar a soporte <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
