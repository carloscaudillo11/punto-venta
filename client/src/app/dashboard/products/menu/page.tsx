import { cookies } from 'next/headers';
import TableMenu from '@/components/Table/TableMenu';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import AddButton from '@/components/ui/AddButton';
import AnimatePresence from '@/components/ui/AnimatePrecence';
import H1Motion from '@/components/ui/H1Motion';
import DivMotion from '@/components/ui/DivMotion';

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
    },
    exit: { opacity: 0, y: 20 }
  };

  return (
    <DivMotion
      className="flex flex-col gap-4 py-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ type: 'tween', duration: 0.5 }}
    >
      <DivMotion
        className="flex justify-between"
        variants={childVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <H1Motion
          className="text-xl font-bold tracking-tight text-gray-700"
          variants={childVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Registrar Menu
        </H1Motion>
        <AddButton url="/dashboard/products/menu/new" />
      </DivMotion>
      <AnimatePresence mode="wait">
        {menu.length === 0 ? (
          <DivMotion
            className="flex items-center gap-2 text-gray-500 justify-center"
            variants={childVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <PencilSquareIcon className="w-5 h-5" />
            <p>No hay datos aún</p>
          </DivMotion>
        ) : (
          <DivMotion
            variants={childVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <TableMenu menu={menu} />
          </DivMotion>
        )}
      </AnimatePresence>
    </DivMotion>
  );
};

export default MenuPage;
