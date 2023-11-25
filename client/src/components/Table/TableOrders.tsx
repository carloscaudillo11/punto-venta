'use client';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import {
  Flex,
  Icon,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
  Card,
  Text,
  Metric
} from '@tremor/react';
import { useEffect, useState } from 'react';
import { type Order } from '@/types';

const TableOrders = ({ orders }: { orders: Order[] }): JSX.Element => {
  const [selectedPaymethod, setSelectedPaymethod] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [salesCard, setSalesCard] = useState<number>(0);
  const [salesCash, setSalesCash] = useState<number>(0);
  const itemsPerPage = 4;

  const isOrderSelected = (order: Order): boolean =>
    order.paymethod === selectedPaymethod || selectedPaymethod === 'all';

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBoxes = orders
    .filter((item) => isOrderSelected(item))
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    orders.filter((item) => isOrderSelected(item)).length / itemsPerPage
  );

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (orders !== null) {
      try {
        const totalSalesCard = orders.reduce(
          (accumulator: any, order: { total: any; paymethod: any }) =>
            accumulator + (order.paymethod === 'Tarjeta' ? order.total : 0),
          0
        );
        const totalSalesCash = orders.reduce(
          (accumulator: any, order: { total: any; paymethod: any }) =>
            accumulator + (order.paymethod === 'Efectivo' ? order.total : 0),
          0
        );
        setSalesCard(totalSalesCard);
        setSalesCash(totalSalesCash);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }
  }, [orders, selectedPaymethod]);

  const date = (date: any): string => {
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const newdate = day + '/' + month + '/' + year;
    return newdate;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-5 md:flex-row md:justify-between">
        <Card className="max-w-2xl" decoration="top">
          <Text>Ventas en Efectivo</Text>
          <Metric>$ {salesCash.toFixed(2)}</Metric>
        </Card>
        <Card className="max-w-2xl" decoration="top">
          <Text>Ventas con Tarjeta</Text>
          <Metric>$ {salesCard.toFixed(2)}</Metric>
        </Card>
      </div>

      <div>
        <Flex
          className="space-x-0.5"
          justifyContent="start"
          alignItems="center"
        >
          <Title> Historial de Ordenes </Title>
          <Icon
            icon={InformationCircleIcon}
            variant="simple"
            tooltip="Muestra los productos del menu"
          />
        </Flex>

        <div className="flex space-x-2">
          <Select
            className="max-w-full sm:max-w-xs"
            defaultValue="all"
            onValueChange={setSelectedPaymethod}
          >
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Efectivo">Efectivo</SelectItem>
            <SelectItem value="Tarjeta">Tarjeta</SelectItem>
          </Select>
        </div>
      </div>

      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Mesa</TableHeaderCell>
              <TableHeaderCell>Fecha</TableHeaderCell>
              <TableHeaderCell>Metodo de pago</TableHeaderCell>
              <TableHeaderCell>Total</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentBoxes.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.table}</TableCell>
                <TableCell>{date(item.date)}</TableCell>
                <TableCell>{item.paymethod}</TableCell>
                <TableCell>${item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

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
  );
};

export default TableOrders;
