import { cookies } from 'next/headers';
import { InboxIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import NewSale from '@/components/Boxes/NewSale/NewSale';

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

const getMenu = async (): Promise<any> => {
  const cookie = cookies().toString();
  const res = await fetch('http://localhost:4000/menu/getMenu', {
    credentials: 'include',
    headers: { Cookie: cookie }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
};

const NewSalePage = async (): Promise<JSX.Element> => {
  const box = await getBoxes();
  const menu = await getMenu();

  return (
    <>
      {box !== null ? (
        <NewSale menu={menu} boxes={box} />
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
                  className="flex items-center gap-2 justify-center px-3 py-2 text-sm bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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

export default NewSalePage;
