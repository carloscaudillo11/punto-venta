'use client';
import {
  InformationCircleIcon,
  BanknotesIcon,
  CreditCardIcon
} from '@heroicons/react/24/solid';
import {
  Flex,
  Icon,
  Select,
  SelectItem,
  Title,
  Card,
  Text,
  Metric
} from '@tremor/react';
import { useEffect, useState } from 'react';
import { type Order } from '@/types';
import { motion } from 'framer-motion';
import Paginate from '../ui/Paginate';

const TableOrders = ({ orders }: { orders: Order[] }): JSX.Element => {
  const [selectedPaymethod, setSelectedPaymethod] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [salesCard, setSalesCard] = useState<number>(0);
  const [salesCash, setSalesCash] = useState<number>(0);
  const itemsPerPage = 5;

  const isOrderSelected = (order: Order): boolean =>
    order.paymethod === selectedPaymethod || selectedPaymethod === 'all';

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders
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
      className="flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <motion.div
        className="flex flex-col gap-5 md:flex-row md:justify-between"
        variants={childVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="max-w-2xl" decoration="top">
          <div className="flex gap-8">
            <div className="flex items-center justify-center">
              <Icon
                icon={BanknotesIcon}
                color="blue"
                variant="solid"
                tooltip="Ventas en Efectivo"
                size="sm"
              />
            </div>
            <div>
              <Text>Ventas en Efectivo</Text>
              <Metric>$ {salesCash.toFixed(2)}</Metric>
            </div>
          </div>
        </Card>
        <Card className="max-w-2xl" decoration="top">
          <div className="flex gap-8">
            <div className="flex items-center justify-center">
              <Icon
                icon={CreditCardIcon}
                color="blue"
                variant="solid"
                tooltip="Ventas con Tarjeta"
                size="sm"
              />
            </div>
            <div>
              <Text>Ventas con Tarjeta</Text>
              <Metric>$ {salesCard.toFixed(2)}</Metric>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        variants={childVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
      >
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
      </motion.div>

      <div className="overflow-x-auto">
        <Card>
          <table className="w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  N° Mesa
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Metodo de pago
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                    Mesa {item.table}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                    {date(item.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                    {item.paymethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                    ${item.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
      <Paginate
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </motion.div>
  );
};

export default TableOrders;
