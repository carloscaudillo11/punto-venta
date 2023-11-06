'use client';
import TableBoxes from '@/components/TableBox/TableBoxes';
import { PlusCircleIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import ModalBox from '@/components/Modal/ModalBox';
import { Button } from '@tremor/react';

const RegisterBox = ({ boxes }: { boxes: any }): JSX.Element => {
  const [openModalBox, setOpenModalBox] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-7 py-2">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold tracking-tight text-gray-700">
          Registrar Caja
        </h1>
        <Button
          icon={PlusCircleIcon}
          onClick={() => {
            setOpenModalBox(true);
          }}
          size="xs"
        >
          Agregar Caja
        </Button>
      </div>
      <div>
        {boxes.length === 0 ? (
          <div className="flex items-center gap-2 text-gray-500 justify-center">
            <PencilSquareIcon className="w-5 h-5" />
            <p>No hay datos aún</p>
          </div>
        ) : (
          <TableBoxes boxes={boxes} />
        )}
      </div>
      <ModalBox open={openModalBox} setOpen={setOpenModalBox} />
    </div>
  );
};

export default RegisterBox;
