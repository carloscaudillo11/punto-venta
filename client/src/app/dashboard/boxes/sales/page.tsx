import { cookies } from 'next/headers';
import TableOrders from '@/components/Table/TableOrders';
import {
  PencilSquareIcon,
  InformationCircleIcon,
  InboxIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
export const dynamic = 'force-dynamic';

const getBoxes = async (): Promise<any> => {
  const cookie = cookies().toString();
  const res = await fetch('http://localhost:4000/boxCon/getBoxes', {
    credentials: 'include',
    headers: { Cookie: cookie }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
};

const SalesPage = async (): Promise<JSX.Element> => {
  let orders;
  const cookie = cookies().toString();
  const boxes = await getBoxes();
  if (boxes !== null) {
    const id = boxes._id;
    const res = await fetch(
      `http://localhost:4000/orders/getOrdersByBox/${id}`,
      {
        credentials: 'include',
        headers: { Cookie: cookie }
      }
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    orders = await res.json();
  } else {
    orders = null;
  }
  return (
    <>
      {orders !== null ? (
        <div className="flex flex-col gap-7 py-2">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold tracking-tight text-gray-700">
              Ventas del dia
            </h1>
          </div>
          <div>
            {orders.length === 0 ? (
              <div className="flex items-center gap-2 text-gray-500 justify-center">
                <PencilSquareIcon className="w-5 h-5" />
                <p>No hay datos aún</p>
              </div>
            ) : (
              <TableOrders orders={orders} />
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Abrir una Caja
          </h1>
          <div className="flex justify-center items-center py-3">
            <div className="p-6 rounded-lg border border-gray-300 w-full">
              <div className="flex justify-center">
                <p className="mb-4 flex gap-2 text-center text-amber-500 text-sm font-semibold">
                  <InformationCircleIcon className="w-5 h-5" />
                  Para iniciar una orden, primero debe aperturar una caja
                </p>
              </div>
              <div className="flex justify-center">
                <Link
                  href="/dashboard/boxes/open"
                  className="flex items-center gap-2 justify-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <InboxIcon className="w-5 h-5" />
                  Abrir Caja
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SalesPage;
