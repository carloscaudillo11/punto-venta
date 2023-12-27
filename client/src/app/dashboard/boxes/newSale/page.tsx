import { cookies } from 'next/headers';
import { InboxIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import NewSale from '@/components/Boxes/NewSale/NewSale';
import H1Motion from '@/components/ui/H1Motion';
import DivMotion from '@/components/ui/DivMotion';
import AnimatePresence from '@/components/ui/AnimatePrecence';

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
      {box !== null ? (
        <NewSale menu={menu} boxes={box} />
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
            Registrar Venta
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

export default NewSalePage;
