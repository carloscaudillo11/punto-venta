'use client';
import {
  InboxIcon,
  InformationCircleIcon,
  TvIcon,
  SignalIcon,
  CalculatorIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/solid';
import ModalOpenBox from '@/components/Modal/ModalOpenBox';
import { useEffect, useState } from 'react';
import { Card, Metric, Text, Button, Badge, Icon } from '@tremor/react';
import { toast } from 'sonner';
import axios from '@/app/api/axios';
import { useRouter } from 'next/navigation';

const OpenBox = ({
  boxes,
  ventas
}: {
  boxes: any;
  ventas: any;
}): JSX.Element => {
  const [openModalForm, setOpenModalForm] = useState<boolean>(false);
  const [sales, setSales] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (boxes !== null) {
      try {
        const totalSales = ventas.reduce(
          (accumulator: any, sale: { total: any }) => accumulator + sale.total,
          0
        );
        setSales(totalSales);
        setTotal(boxes.startingAmount + totalSales);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }
  }, [boxes, ventas]);

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

  const corteCaja = async (): Promise<void> => {
    try {
      const { box, _id: id } = boxes;
      const finalAmount = total;

      const response = await axios.put(
        `/boxCon/closeBox/${id}`,
        { box, finalAmount },
        { withCredentials: true }
      );

      toast.success('Corte de caja exitoso!');
      router.refresh();
      console.log(response.data); // Puedes manejar o loggear la respuesta si es necesario
    } catch (error) {
      if (error instanceof Error)
        toast.error(error.message || 'Error en el corte de caja');
    }
  };

  return (
    <>
      {boxes !== null ? (
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            #{boxes.box.name}
          </h1>
          <div className="flex justify-center items-center py-3">
            <div className="p-6 rounded-lg border border-gray-300 w-full">
              <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center">
                <div className="flex gap-4">
                  <TvIcon className="w-10 h-15 text-blue-700" />
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-3">
                      <p className="text-gray-700 text-md font-semibold">
                        {boxes.box.name}
                      </p>
                      <Badge icon={SignalIcon}>{boxes.status}</Badge>
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
                  <Button icon={InboxIcon} onClick={corteCaja}>
                    Corte de Caja
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 md:flex-row md:justify-between">
            <Card className="max-w-md" decoration="top">
              <div className="flex gap-8">
                <div className="flex items-center justify-center">
                  <Icon
                    icon={CurrencyDollarIcon}
                    color="blue"
                    variant="solid"
                    tooltip="Saldo Inicial"
                    size="sm"
                  />
                </div>
                <div>
                  <Text>Saldo Inicial</Text>
                  <Metric>$ {boxes.startingAmount}</Metric>
                </div>
              </div>
            </Card>
            <Card className="max-w-md" decoration="top">
              <div className="flex gap-8">
                <div className="flex items-center justify-center">
                  <Icon
                    icon={ArrowTrendingUpIcon}
                    color="blue"
                    variant="solid"
                    tooltip="Ventas"
                    size="sm"
                  />
                </div>
                <div>
                  <Text>Ventas</Text>
                  <Metric>$ {sales.toFixed(2)}</Metric>
                </div>
              </div>
            </Card>
            <Card className="max-w-md" decoration="top">
              <div className="flex gap-8">
                <div className="flex items-center justify-center">
                  <Icon
                    icon={CalculatorIcon}
                    color="blue"
                    variant="solid"
                    tooltip="Total a Rendir"
                    size="sm"
                  />
                </div>
                <div>
                  <Text>Total a Rendir</Text>
                  <Metric>$ {total.toFixed(2)}</Metric>
                </div>
              </div>
            </Card>
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
                <Button
                  icon={InboxIcon}
                  onClick={() => {
                    setOpenModalForm(true);
                  }}
                >
                  Abrir Caja
                </Button>
              </div>
            </div>
          </div>
          <ModalOpenBox open={openModalForm} setOpen={setOpenModalForm} />
        </div>
      )}
    </>
  );
};

export default OpenBox;
