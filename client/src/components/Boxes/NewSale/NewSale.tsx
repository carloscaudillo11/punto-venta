'use client';
import {
  Card,
  Text,
  TextInput,
  Title,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Button,
  Bold,
  Select,
  SelectItem,
  TableFoot,
  TableFooterCell,
  NumberInput
} from '@tremor/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import { type Menu } from '@/types';
import React, { useState, useEffect } from 'react';
import axios from '@/app/api/axios';
import { toast } from 'sonner';

const NewSale = ({
  menu,
  boxes
}: {
  menu: Menu[];
  boxes: any;
}): JSX.Element => {
  const [filtro, setFiltro] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState<Menu[]>([]);
  const [productos, setProductos] = useState<any>([]);
  const [inputValue, setInputValue] = useState('');
  const [cantidades, setCantidades] = useState<Record<string, number>>({});
  const [payMethod, setPayMethod] = useState('');
  const [mesa, setMesa] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [iva, setIva] = useState<number>(0);

  const handleInputChange = (e: any): void => {
    setInputValue(e.target.value);
    setFiltro(inputValue);

    const productosFiltrados = menu.filter((producto) =>
      producto.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setProductosFiltrados(productosFiltrados);
  };

  const agregarProducto = (producto: Menu): void => {
    setFiltro('');
    setInputValue('');
    setProductos([...productos, producto]);

    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [producto._id]: prevCantidades[producto._id]
        ? prevCantidades[producto._id] + 1
        : 1
    }));
  };

  const handleDelete = (id: number): void => {
    const nuevosProductos = productos.filter((item: Menu) => item._id !== id);
    setProductos(nuevosProductos);

    setCantidades((prevCantidades) => {
      const nuevasCantidades = { ...prevCantidades };
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete nuevasCantidades[id];
      return nuevasCantidades;
    });
  };

  const handleIncreaseQuantity = (id: number): void => {
    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [id]: (prevCantidades[id] || 0) + 1
    }));
  };

  const handleDecreaseQuantity = (id: number): void => {
    if (cantidades[id] > 1) {
      setCantidades((prevCantidades) => ({
        ...prevCantidades,
        [id]: prevCantidades[id] - 1
      }));
    }
  };

  useEffect(() => {
    const calcularIVA = (subtotal: number): number => {
      const iva = subtotal * 0.16; // 16% de IVA
      return iva;
    };

    const calcularTotal = (subtotal: number, iva: number): number => {
      const total = subtotal + iva;
      return total;
    };

    const calcularSubtotal = (): number => {
      let subtotal = 0;
      productos.forEach((producto: Menu) => {
        subtotal += producto.price * (cantidades[producto._id] || 1);
      });
      return subtotal;
    };
    setSubTotal(calcularSubtotal());
    setIva(calcularIVA(calcularSubtotal()));
    setTotal(
      calcularTotal(calcularSubtotal(), calcularIVA(calcularSubtotal()))
    );
  }, [cantidades, productos]);

  const onSubmit = (e: any): void => {
    e.preventDefault();
    const fetch = async (): Promise<any> => {
      const table = mesa;
      const box = boxes._id;
      const paymethod = payMethod;
      const res = await axios.post(
        '/orders/createOrder',
        { table, box, total, paymethod },
        { withCredentials: true }
      );
      return res.data;
    };
    const promise = fetch();
    toast.promise(promise, {
      loading: 'Loading...',
      success: () => {
        resetStates();
        return 'Orden registrada con exito';
      },
      error: (err) => {
        return err.response.data.message;
      }
    });
  };

  const resetStates = (): void => {
    setFiltro('');
    setProductosFiltrados([]);
    setProductos([]);
    setInputValue('');
    setCantidades({});
    setPayMethod('');
    setMesa(0);
    setTotal(0);
    setSubTotal(0);
    setIva(0);
  };

  return (
    <div className="flex flex-col gap-6 py-2">
      <h1 className="text-xl font-semibold tracking-tight text-gray-700">
        Registrar Venta
      </h1>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="w-full sm:w-8/12">
          <Card className="flex flex-col gap-5 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <Title className="w-full sm:w-3/5">
                <Bold>Productos</Bold>
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
                          agregarProducto(producto);
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
                    <TableHeaderCell>Quitar</TableHeaderCell>
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
                          <Button
                            className="w-8 h-8"
                            variant="secondary"
                            onClick={() => {
                              handleDecreaseQuantity(item._id);
                            }}
                          >
                            -
                          </Button>
                          <div className="w-8 h-8 border rounded-md border-gray-300 flex items-center justify-center">
                            <Text>{cantidades[item._id]}</Text>
                          </div>
                          <Button
                            className="w-8 h-8"
                            variant="secondary"
                            onClick={() => {
                              handleIncreaseQuantity(item._id);
                            }}
                          >
                            +
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
        <div className="w-full sm:w-4/12">
          <Card className="sm:p-8">
            <div className="flex flex-col gap-4">
              <Title>
                <Bold>Resumen de la orden</Bold>
              </Title>
              <Table>
                <TableBody>
                  <TableRow className="flex justify-between">
                    <TableCell>SubTotal</TableCell>
                    <TableCell>
                      <Bold>${subTotal.toFixed(2)}</Bold>
                    </TableCell>
                  </TableRow>
                  <TableRow className="flex justify-between">
                    <TableCell>IVA</TableCell>
                    <TableCell>
                      <Bold>${iva.toFixed(2)}</Bold>
                    </TableCell>
                  </TableRow>
                  <TableRow className="flex justify-between items-center">
                    <TableCell>Metodo de pago</TableCell>
                    <TableCell>
                      <Select value={payMethod} onValueChange={setPayMethod}>
                        <SelectItem value="Efectivo">
                          <Text>Efectivo</Text>
                        </SelectItem>
                        <SelectItem value="Tarjeta">
                          <Text>Tarjeta</Text>
                        </SelectItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow className="flex justify-between items-center">
                    <TableCell>Mesa</TableCell>
                    <TableCell>
                      <NumberInput
                        value={mesa}
                        onValueChange={(value: number) => {
                          setMesa(value);
                        }}
                        min={1}
                        max={10}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow className="flex justify-between">
                    <TableCell>
                      <Title>
                        <Bold>Total</Bold>
                      </Title>
                    </TableCell>
                    <TableCell>
                      <Bold>${total.toFixed(2)}</Bold>
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFoot>
                  <TableRow>
                    <TableFooterCell>
                      <Button
                        className="w-full mt-3"
                        variant="primary"
                        onClick={onSubmit}
                      >
                        Finalizar orden
                      </Button>
                    </TableFooterCell>
                  </TableRow>
                </TableFoot>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewSale;
