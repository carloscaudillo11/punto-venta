'use client';
import {
  Card,
  Text,
  Metric,
  TextInput,
  Title,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Button
} from '@tremor/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import { type Menu } from '@/types';
import React, { useState } from 'react';

const NewSale = ({ menu }: { menu: Menu[] }): JSX.Element => {
  const [filtro, setFiltro] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState<Menu[]>([]);
  const [productos, setProductos] = useState<any>([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: any): void => {
    setInputValue(e.target.value);
    setFiltro(inputValue);

    const productosFiltrados = menu.filter((producto) =>
      producto.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setProductosFiltrados(productosFiltrados);
  };

  const handleDelete = (id: number): void => {
    const nuevosProductos = productos.filter((item: Menu) => item._id !== id);
    setProductos(nuevosProductos);
  };

  return (
    <div className="flex flex-col gap-6 py-2">
      <h1 className="text-xl font-semibold tracking-tight text-gray-700">
        Registrar Venta
      </h1>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="w-full sm:w-3/5">
          <Card className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <Title className="w-full sm:w-3/5 text-slate-600">
                Productos
              </Title>
              <div className="w-full sm:w-2/5 flex flex-col mt-2">
                <TextInput
                  icon={MagnifyingGlassIcon}
                  placeholder="Buscar..."
                  onChange={handleInputChange}
                  value={inputValue}
                />
                <div
                  className={`flex flex-col ${
                    filtro !== '' ? 'border rounded-md border-gray-300 p-2' : ''
                  }`}
                >
                  {filtro &&
                    productosFiltrados.map((producto) => (
                      <div
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                        key={producto._id}
                        onClick={() => {
                          setFiltro('');
                          setInputValue('');
                          setProductos([...productos, producto]);
                        }}
                      >
                        <Text>{producto.name}</Text>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Imagen</TableHeaderCell>
                    <TableHeaderCell>Nombre</TableHeaderCell>
                    <TableHeaderCell>Categoria</TableHeaderCell>
                    <TableHeaderCell>Precio</TableHeaderCell>
                    <TableHeaderCell>Cantidad</TableHeaderCell>
                    <TableHeaderCell>Eliminar</TableHeaderCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {productos.map((item: Menu) => (
                    <TableRow key={item._id}>
                      {item.image && (
                        <TableCell>
                          <img
                            src={item.image.url}
                            alt={item.name}
                            className="w-full sm:w-25 h-15 rounded-sm"
                          />
                        </TableCell>
                      )}
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="break-words">
                        {item.category_Menu}
                      </TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Button className="w-8 h-8" variant="secondary">
                            +
                          </Button>
                          <div className="w-8 h-8 border rounded-md border-gray-300 flex items-center justify-center">
                            <Text>1</Text>
                          </div>
                          <Button className="w-8 h-8" variant="secondary">
                            -
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <button
                          className="flex items-center justify-center focus:outline-none"
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        >
                          <TrashIcon className="w-5 text-gray-600 hover:text-red-600" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
        <div className="w-full sm:w-2/5">
          <Card className="h-96">
            <Text>Title</Text>
            <Metric>KPI 2</Metric>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewSale;
