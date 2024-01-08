import { cookies } from 'next/headers';
import TableProducts from '@/components/Table/TableProducts';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import AddButton from '@/components/ui/AddButton';

const getProducts = async (): Promise<any> => {
  const cookie = cookies().toString();
  const res = await fetch('http://localhost:4000/products/getProducts', {
    credentials: 'include',
    headers: { Cookie: cookie }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
};

const AccountingPage = async (): Promise<JSX.Element> => {
  const products = await getProducts();

  return (
    <div className="flex flex-col gap-7 py-2">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold tracking-tight text-gray-700">
          Registrar Producto
        </h1>
        <AddButton url="/dashboard/products/accounting/new" />
      </div>
      <div>
        {products.length === 0 ? (
          <div className="flex items-center gap-2 text-gray-500 justify-center">
            <PencilSquareIcon className="w-5 h-5" />
            <p>No hay datos aún</p>
          </div>
        ) : (
          <TableProducts products={products} />
        )}
      </div>
    </div>
  );
};

export default AccountingPage;
