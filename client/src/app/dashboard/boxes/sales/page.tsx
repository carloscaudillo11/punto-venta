import { cookies } from 'next/headers';
import TableSales from '@/components/Table/TableSales';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

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
  let ventas;
  const cookie = cookies().toString();
  const boxes = await getBoxes();
  if (boxes !== null) {
    const id = boxes._id;
    const res = await fetch(
      `http://localhost:4000/transactions/getSalesByBox/${id}`,
      {
        credentials: 'include',
        headers: { Cookie: cookie }
      }
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    ventas = await res.json();
  } else {
    ventas = null;
  }
  return (
    <div className="flex flex-col gap-7 py-2">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold tracking-tight text-gray-700">
          Ventas del dia
        </h1>
      </div>
      <div>
        {ventas.length === 0 ? (
          <div className="flex items-center gap-2 text-gray-500 justify-center">
            <PencilSquareIcon className="w-5 h-5" />
            <p>No hay datos aún</p>
          </div>
        ) : (
          <TableSales ventas={ventas} />
        )}
      </div>
    </div>
  );
};

export default SalesPage;
