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
import ModalBoxUpdate from '../Modal/ModalBox';

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

  return (
    <>
      <div>
        <Flex
          className="space-x-0.5"
          justifyContent="start"
          alignItems="center"
        >
          <Title> Historial de Cajas </Title>
          <Icon
            icon={InformationCircleIcon}
            variant="simple"
            tooltip="Shows sales performance per employee"
          />
        </Flex>
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
      <Card className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Estatus</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentBoxes.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {item.status === 'Abierta' ? (
                    <Badge icon={SignalIcon}>{item.status}</Badge>
                  ) : (
                    <Badge color="red" icon={SignalSlashIcon}>
                      {item.status}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
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
      <ModalBoxUpdate
        open={openModalBoxUpdate}
        setOpen={setOpenModalBoxUpdate}
        box={box}
      />
    </>
  );
};

export default TableBoxes;
