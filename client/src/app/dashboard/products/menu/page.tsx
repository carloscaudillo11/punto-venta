import { cookies } from 'next/headers';
import TableMenu from '@/components/Table/TableMenu';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import AddButton from '@/components/ui/AddButton';

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

const MenuPage = async (): Promise<JSX.Element> => {
  const menu = await getMenu();

  return (
    <div className="flex flex-col gap-7 py-2">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold tracking-tight text-gray-700">
          Registrar Menu
        </h1>
        <AddButton />
      </div>
      <div>
        {menu.length === 0 ? (
          <div className="flex items-center gap-2 text-gray-500 justify-center">
            <PencilSquareIcon className="w-5 h-5" />
            <p>No hay datos aún</p>
          </div>
        ) : (
          <TableMenu menu={menu} />
        )}
      </div>
    </div>
  );
};

export default MenuPage;
