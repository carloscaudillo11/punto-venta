'use client';
import {
  InboxIcon,
  InformationCircleIcon,
  TvIcon
} from '@heroicons/react/24/solid';
import ModalOpenBox from '@/components/Modal/ModalOpenBox';
import { useState } from 'react';
import { Card, Metric, Text, Button } from '@tremor/react';

const OpenBox = ({ boxes }: { boxes: any }): JSX.Element => {
  const [openModalForm, setOpenModalForm] = useState<boolean>(false);
  let formattedDate = '';
  if (boxes !== null) {
    const dateString = boxes.date;
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    formattedDate = `${day}-${month}-${year}`;
  } else {
    formattedDate = 'N/A';
  }

  return (
    <>
      {boxes !== null ? (
        <div className="flex flex-col gap-3">
          <ModalOpenBox open={openModalForm} setOpen={setOpenModalForm} />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            #{boxes.box.name}
          </h1>
          <div className="flex justify-center items-center py-3">
            <div className="p-6 rounded-lg border border-gray-300 w-full">
              <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center">
                <div className="flex gap-4">
                  <TvIcon className="w-10 h-15 text-blue-700" />
                  <div className="flex flex-col">
                    <div className="flex gap-3">
                      <p className="text-gray-700 text-md font-semibold">
                        {boxes.box.name}
                      </p>
                      <p className="text-green-700 text-sm font-medium bg-green-200 px-1 rounded-md">
                        {boxes.status}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="text-gray-500 text-sm font-medium">
                        Responsable:
                      </p>
                      <p className="text-gray-700 text-sm font-semibold">
                        {boxes.user.name} {boxes.user.lastname}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="text-gray-500 text-sm font-medium">
                        Fecha:
                      </p>
                      <p className="text-gray-700 text-sm font-semibold">
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    icon={InboxIcon}
                    onClick={() => {
                      setOpenModalForm(true);
                    }}
                  >
                    Corte de Caja
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 md:flex-row md:justify-between">
            <Card className="max-w-md" decoration="top">
              <Text>Saldo Inicial</Text>
              <Metric>$ {boxes.startingAmount}</Metric>
            </Card>
            <Card className="max-w-md" decoration="top">
              <Text>Ventas</Text>
              <Metric>$ 0.0</Metric>
            </Card>
            <Card className="max-w-md" decoration="top">
              <Text>Total a Rendir</Text>
              <Metric>$ calculando..</Metric>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <ModalOpenBox open={openModalForm} setOpen={setOpenModalForm} />
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
                <button
                  onClick={() => {
                    setOpenModalForm(true);
                  }}
                  className="flex items-center gap-2 justify-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <InboxIcon className="w-5 h-5" />
                  Abrir Caja
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OpenBox;
