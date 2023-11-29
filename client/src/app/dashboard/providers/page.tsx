import TableProviders from '@/components/Table/TableProviders';
import { cookies } from 'next/headers';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import AddButton from '@/components/ui/AddButton';

const getProviders = async (): Promise<any> => {
  const cookie = cookies().toString();
  const res = await fetch('http://localhost:4000/providers/getProviders', {
    credentials: 'include',
    headers: { Cookie: cookie }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
};

const ProvidersPage = async (): Promise<JSX.Element> => {
  const providers = await getProviders();
  return (
    <div className="flex flex-col gap-7 py-2">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold tracking-tight text-gray-700">
          Registro Proveedores
        </h1>
        <AddButton url='"/dashboard/providers/new"' />
      </div>
      <div>
        {providers.length === 0 ? (
          <div className="flex items-center gap-2 text-gray-500 justify-center">
            <PencilSquareIcon className="w-5 h-5" />
            <p>No hay datos aún</p>
          </div>
        ) : (
          <TableProviders providers={providers} />
        )}
      </div>
    </div>
  );
};

export default ProvidersPage;
