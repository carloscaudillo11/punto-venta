'use client';
import TableBoxes from '@/components/Table/TableBoxes';
import { PlusCircleIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import ModalBox from '@/components/Modal/ModalBox';
import { Button } from '@tremor/react';
import { AnimatePresence, motion } from 'framer-motion';

const RegisterBox = ({ boxes }: { boxes: any }): JSX.Element => {
  const [openModalBox, setOpenModalBox] = useState<boolean>(false);

  const childVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 py-2">
        <motion.div
          variants={childVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-between"
        >
          <motion.h1
            variants={childVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl font-semibold tracking-tight text-gray-700"
          >
            Registrar Caja
          </motion.h1>
          <Button
            icon={PlusCircleIcon}
            onClick={() => {
              setOpenModalBox(true);
            }}
            size="xs"
          >
            Agregar Caja
          </Button>
        </motion.div>
        <AnimatePresence>
          {boxes.length === 0 ? (
            <motion.div
              key="open"
              variants={childVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-2 text-gray-500 justify-center"
            >
              <PencilSquareIcon className="w-5 h-5" />
              <p>No hay datos aún</p>
            </motion.div>
          ) : (
            <motion.div
              key="close"
              variants={childVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <TableBoxes boxes={boxes} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ModalBox open={openModalBox} setOpen={setOpenModalBox} />
    </>
  );
};

export default RegisterBox;
