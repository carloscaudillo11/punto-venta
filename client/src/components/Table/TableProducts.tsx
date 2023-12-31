'use client';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import {
  Flex,
  Icon,
  MultiSelect,
  MultiSelectItem,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
  Card
} from '@tremor/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import axios from '@/app/api/axios';
import { useState } from 'react';
import { type Products } from '@/types';

const TableProducts = ({ products }: { products: Products[] }): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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

  const isMenuSelected = (products: Products): boolean =>
    (products.category === selectedCategory || selectedCategory === 'all') &&
    (selectedNames.includes(products.name) || selectedNames.length === 0);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products
    .filter((item) => isMenuSelected(item))
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    products.filter((item) => isMenuSelected(item)).length / itemsPerPage
  );

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>
        <Flex
          className="space-x-0.5"
          justifyContent="start"
          alignItems="center"
        >
          <Title> Historial de Products </Title>
          <Icon
            icon={InformationCircleIcon}
            variant="simple"
            tooltip="Muestra los productos del menu"
          />
        </Flex>
      </div>
      <div className="flex space-x-2">
        <MultiSelect
          className="max-w-full sm:max-w-xs"
          onValueChange={setSelectedNames}
          placeholder="Selecciona un elemento"
        >
          {products.map((item) => (
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
          <SelectItem value="Bebida">Bebida</SelectItem>
          <SelectItem value="Bebida Alcoholica">Bebida Alcoholica</SelectItem>
        </Select>
      </div>
      <Card className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Imagen</TableHeaderCell>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Categoria</TableHeaderCell>
              <TableHeaderCell>Proveedor</TableHeaderCell>
              <TableHeaderCell>Cantidad</TableHeaderCell>
              <TableHeaderCell>Precio</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentProducts.map((item) => (
              <TableRow key={item._id}>
                {item.image && (
                  <TableCell>
                    <img
                      src={item.image.url}
                      alt={item.name}
                      className="w-25 h-15 rounded-lg"
                    />
                  </TableCell>
                )}
                <TableCell>{item.name}</TableCell>
                <TableCell className="break-words">{item.category}</TableCell>
                <TableCell>${item.provider}</TableCell>
                <TableCell>${item.amount}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <button
                      className="flex items-center justify-center focus:outline-none"
                      onClick={() => {
                        router.push(
                          `/dashboard/products/menu/edit/${item._id}`
                        );
                      }}
                    >
                      <PencilIcon className="w-5 text-gray-600 hover:text-blue-600" />
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
                      <TrashIcon className="w-5 text-gray-600 hover:text-red-600" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <div className="mt-6">
        <nav className="flex justify-center">
          <ul className="flex items-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className="mx-1">
                <button
                  onClick={() => {
                    paginate(index + 1);
                  }}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === index + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default TableProducts;
