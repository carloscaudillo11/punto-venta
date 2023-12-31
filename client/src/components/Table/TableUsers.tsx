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
import { type IUser } from '@/types';

const TableUsers = ({ users }: { users: IUser[] }): JSX.Element => {
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedEmail, setSelecteEmail] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const router = useRouter();

  const Delete = async (id: any): Promise<void> => {
    const fetch = async (): Promise<any> => {
      const res = await axios.delete(
        `http://localhost:4000/auth/deleteUser/${id}`,
        { withCredentials: true }
      );
      return res.data;
    };

    const promise = fetch();
    toast.promise(promise, {
      loading: 'Loading...',
      success: () => {
        router.refresh();
        return 'Usuario eliminado exitosamente!';
      },
      error: (err) => {
        return err.response.data.message;
      }
    });
  };

  const isUserSelected = (user: IUser): boolean =>
    (user.role === selectedRole || selectedRole === 'all') &&
    (selectedEmail.includes(user.email) || selectedEmail.length === 0);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users
    .filter((item) => isUserSelected(item))
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    users.filter((item) => isUserSelected(item)).length / itemsPerPage
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
          <Title> Historial de Usuarios </Title>
          <Icon
            icon={InformationCircleIcon}
            variant="simple"
            tooltip="Muestra los usuarios del sistema"
          />
        </Flex>
      </div>
      <div className="flex space-x-2">
        <MultiSelect
          className="max-w-full sm:max-w-xs"
          onValueChange={setSelecteEmail}
          placeholder="Selecciona un elemento"
        >
          {users.map((item) => (
            <MultiSelectItem key={item._id} value={item.name}>
              {item.name}
            </MultiSelectItem>
          ))}
        </MultiSelect>
        <Select
          className="max-w-full sm:max-w-xs"
          defaultValue="all"
          onValueChange={setSelectedRole}
        >
          <SelectItem value="all">Todas</SelectItem>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectItem value="User">User</SelectItem>
        </Select>
      </div>
      <Card className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Apellidos</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentUsers.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.lastname}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
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

export default TableUsers;
