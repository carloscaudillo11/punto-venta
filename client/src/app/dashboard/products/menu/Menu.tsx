'use client';
import TableMenu from '@/components/TableBox/TableMenu';
import { PlusCircleIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { Button } from '@tremor/react';
import { type Menu } from '@/types';
import { useRouter } from 'next/navigation';

const MenuElements = ({ menu }: { menu: Menu[] }): JSX.Element => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-7 py-2">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold tracking-tight text-gray-700">
          Registrar Menu
        </h1>
        <Button
          icon={PlusCircleIcon}
          onClick={() => {
            router.push('/dashboard/products/menu/new');
          }}
          size="xs"
        >
          Agregar elemento
        </Button>
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

export default MenuElements;
