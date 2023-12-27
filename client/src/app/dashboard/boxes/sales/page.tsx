import { cookies } from 'next/headers';
import TableOrders from '@/components/Table/TableOrders';
import {
  PencilSquareIcon,
  InformationCircleIcon,
  InboxIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import AnimatePresence from '@/components/ui/AnimatePrecence';
import H1Motion from '@/components/ui/H1Motion';
import DivMotion from '@/components/ui/DivMotion';

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
        headers: { Cookie: cookie },
        cache: 'no-cache'
      }
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    orders = await res.json();
  } else {
    orders = null;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  const childVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {orders !== null ? (
        <DivMotion
          key="open"
          className="flex flex-col gap-7 py-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'tween', duration: 0.5 }}
        >
          <div className="flex justify-between">
            <H1Motion
              className="text-xl font-bold tracking-tight text-gray-700"
              variants={childVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ventas Del Dia
            </H1Motion>
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
        </DivMotion>
      ) : (
        <DivMotion
          key="closed"
          className="flex flex-col gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'tween', duration: 0.5 }}
        >
          <H1Motion
            className="text-3xl font-bold tracking-tight text-gray-900"
            variants={childVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Abrir una Caja
          </H1Motion>
          <DivMotion
            className="flex justify-center items-center py-3"
            variants={childVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <DivMotion
              className="p-6 rounded-lg border border-gray-300 w-full"
              variants={childVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex justify-center">
                <p className="mb-4 flex gap-2 text-center text-amber-500 text-sm font-semibold">
                  <InformationCircleIcon className="w-5 h-5" />
                  Para iniciar una orden, primero debe aperturar una caja
                </p>
              </div>
              <div className="flex justify-center">
                <Link
                  href="/dashboard/boxes/open"
                  className="flex items-center gap-2 text-sm justify-center px-3 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <InboxIcon className="w-5 h-5" />
                  Abrir Caja
                </Link>
              </div>
            </DivMotion>
          </DivMotion>
        </DivMotion>
      )}
    </AnimatePresence>
  );
};

export default SalesPage;
