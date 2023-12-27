'use client';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import {
  SignalIcon,
  SignalSlashIcon,
  TrashIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import {
  Badge,
  Icon,
  MultiSelect,
  MultiSelectItem,
  Select,
  SelectItem,
  Title,
  Card
} from '@tremor/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import axios from '@/app/api/axios';
import { useState } from 'react';
import ModalBoxUpdate from '../Modal/ModalBox';
import Paginate from '../ui/Paginate';
import { motion, AnimatePresence } from 'framer-motion';

interface Boxes {
  _id: number;
  name: string;
  status: string;
}

const TableBoxes = ({ boxes }: { boxes: Boxes[] }): JSX.Element => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const router = useRouter();
  const [openModalBoxUpdate, setOpenModalBoxUpdate] = useState<boolean>(false);
  const [box, setBox] = useState<Boxes>({
    _id: 0,
    name: '',
    status: ''
  });

  const Delete = async (id: any): Promise<void> => {
    const fetch = async (): Promise<any> => {
      const res = await axios.delete(
        `http://localhost:4000/box/deleteBox/${id}`,
        { withCredentials: true }
      );
      return res.data;
    };

    const promise = fetch();
    toast.promise(promise, {
      loading: 'Loading...',
      success: () => {
        router.refresh();
        return 'Caja eliminada exitosamente!';
      },
      error: (err) => {
        return err.response.data.message;
      }
    });
  };

  const isSalesPersonSelected = (boxes: Boxes): boolean =>
    (boxes.status === selectedStatus || selectedStatus === 'all') &&
    (selectedNames.includes(boxes.name) || selectedNames.length === 0);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBoxes = boxes
    .filter((item) => isSalesPersonSelected(item))
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    boxes.filter((item) => isSalesPersonSelected(item)).length / itemsPerPage
  );

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const childVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const productVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col gap-6"
    >
      <motion.div
        variants={childVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col gap-2"
      >
        <div className="space-x-0.5 flex justify-start items-center">
          <Title> Historial de Cajas </Title>
          <Icon
            icon={InformationCircleIcon}
            variant="simple"
            tooltip="Muestra las cajas registradas"
          />
        </div>
        <div className="flex space-x-2">
          <MultiSelect
            className="max-w-full sm:max-w-xs"
            onValueChange={setSelectedNames}
            placeholder="Selecciona una caja"
          >
            {boxes.map((item) => (
              <MultiSelectItem key={item._id} value={item.name}>
                {item.name}
              </MultiSelectItem>
            ))}
          </MultiSelect>
          <Select
            className="max-w-full sm:max-w-xs"
            defaultValue="all"
            onValueChange={setSelectedStatus}
          >
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="Abierta">Abierta</SelectItem>
            <SelectItem value="Cerrada">Cerrada</SelectItem>
          </Select>
        </div>
      </motion.div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Estatus
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {currentBoxes.map((item, index) => (
                  <motion.tr
                    key={item._id}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    variants={productVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                      {item.status === 'Abierta' ? (
                        <Badge icon={SignalIcon}>{item.status}</Badge>
                      ) : (
                        <Badge color="red" icon={SignalSlashIcon}>
                          {item.status}
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-4">
                        <button
                          className="flex items-center justify-center focus:outline-none"
                          onClick={() => {
                            setBox(item);
                            setOpenModalBoxUpdate(true);
                          }}
                        >
                          <PencilIcon className="w-5 text-gray-600 hover:text-blue-600" />
                        </button>
                        <button
                          className="flex items-center justify-center focus:outline-none"
                          onClick={() => {
                            toast(`Deseas eliminar la caja ${item.name} `, {
                              action: {
                                label: 'Eliminar',
                                onClick: async () => {
                                  await Delete(item._id);
                                }
                              }
                            });
                          }}
                        >
                          <TrashIcon className="w-5 text-gray-600 hover:text-red-600" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </Card>

      <Paginate
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
      <ModalBoxUpdate
        open={openModalBoxUpdate}
        setOpen={setOpenModalBoxUpdate}
        box={box}
      />
    </motion.div>
  );
};

export default TableBoxes;
