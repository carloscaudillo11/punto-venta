'use client';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import {
  Flex,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
  Card
} from '@tremor/react';
import { useState } from 'react';
import { type Transactions } from '@/types';

const TableMenu = ({ ventas }: { ventas: Transactions[] }): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBoxes = ventas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(ventas.length / itemsPerPage);

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const date = (fecha: Date): string => {
    let formattedDate = '';
    if (ventas !== null) {
      const dateString = fecha.toString();
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return (formattedDate = `${day}-${month}-${year}`);
    } else {
      formattedDate = 'N/A';
      return formattedDate;
    }
  };

  return (
    <>
      <div>
        <Flex
          className="space-x-0.5"
          justifyContent="start"
          alignItems="center"
        >
          <Title> Historial de ventas </Title>
          <Icon
            icon={InformationCircleIcon}
            variant="simple"
            tooltip="Muetra las ventas del dia"
          />
        </Flex>
      </div>
      <Card className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Tipo</TableHeaderCell>
              <TableHeaderCell>Descripción</TableHeaderCell>
              <TableHeaderCell>Fecha</TableHeaderCell>
              <TableHeaderCell>Total</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentBoxes.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{date(item.date)}</TableCell>
                <TableCell>${item.total}</TableCell>
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

export default TableMenu;
