'use client';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import {
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
import { type Menu } from '@/types';
import Paginate from '../ui/Paginate';
import ImageWithSkeleton from '../ui/ImageWithSkeleton';
import { motion } from 'framer-motion';

const TableMenu = ({ menu }: { menu: Menu[] }): JSX.Element => {
  console.log(menu);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  const Delete = async (id: any): Promise<void> => {
    const fetch = async (): Promise<any> => {
      const res = await axios.delete(
        `http://localhost:4000/menu/deleteMenuElement/${id}`,
        { withCredentials: true }
      );
      return res.data;
    };

    const promise = fetch();
    toast.promise(promise, {
      loading: 'Loading...',
      success: () => {
        router.refresh();
        return 'Elemento eliminada exitosamente!';
      },
      error: (err) => {
        return err.response.data.message;
      }
    });
  };

  const isMenuSelected = (menu: Menu): boolean =>
    (menu.category_Menu === selectedCategory || selectedCategory === 'all') &&
    (selectedNames.includes(menu.name) || selectedNames.length === 0);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMenu = menu
    .filter((item) => isMenuSelected(item))
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    menu.filter((item) => isMenuSelected(item)).length / itemsPerPage
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

  return (
    <motion.div
      className="flex flex-col gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <motion.div
        variants={childVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col gap-1"
      >
        <div className="space-x-0.5 flex justify-start items-center">
          <Title> Historial de Menu </Title>
          <Icon
            icon={InformationCircleIcon}
            variant="simple"
            tooltip="Muestra los productos del menu"
          />
        </div>
        <div className="flex space-x-2">
          <MultiSelect
            className="max-w-full sm:max-w-xs whitespace-normal"
            onValueChange={setSelectedNames}
            placeholder="Filtrar"
          >
            {menu.map((item) => (
              <MultiSelectItem key={item._id} value={item.name}>
                {item.name}
              </MultiSelectItem>
            ))}
          </MultiSelect>
          <Select
            className="max-w-full sm:max-w-xs"
            defaultValue="all"
            onValueChange={setSelectedCategory}
          >
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="Platillo">Platillo</SelectItem>
            <SelectItem value="Bebida Preparada">Bebida Preparada</SelectItem>
          </Select>
        </div>
      </motion.div>
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Imagen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {currentMenu.map((item, index) => (
                <tr
                  key={item._id}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  {item.image && (
                    <td className="px-6 py-4">
                      <ImageWithSkeleton
                        src={item.image.url}
                        alt={item.name}
                        width={600}
                        height={600}
                        className="w-20 h-10"
                      />
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-normal text-xs  text-gray-500">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-xs text-gray-500">
                    {item.category_Menu}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-xs text-gray-500">
                    ${item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-xs text-gray-500">
                    <div className="flex gap-4">
                      <button
                        className="flex items-center justify-center focus:outline-none"
                        onClick={() => {
                          router.push(
                            `/dashboard/products/menu/edit/${item._id}`
                          );
                        }}
                      >
                        <PencilIcon className="w-4 text-gray-600 hover:text-blue-600" />
                      </button>
                      <button
                        className="flex items-center justify-center focus:outline-none"
                        onClick={() => {
                          toast(`Deseas eliminar ${item.name} `, {
                            action: {
                              label: 'Eliminar',
                              onClick: async () => {
                                await Delete(item._id);
                              }
                            }
                          });
                        }}
                      >
                        <TrashIcon className="w-4 text-gray-600 hover:text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Paginate
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </motion.div>
  );
};

export default TableMenu;
