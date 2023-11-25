import { printer, types } from 'node-thermal-printer';

const printerTicket = () => {
  // Configurar la impresora térmica
  const printe = new printer({
    type: types.EPSON,
    interface: 'tcp://192.168.1.23',
  });

  // Definir el contenido del ticket
  const content = [
    '¡Bienvenido a Mi Tienda!',
    '------------------------',
    'Producto 1: $10.00',
    'Producto 2: $20.00',
    '------------------------',
    'Total: $30.00',
    'Gracias por tu compra',
  ];

  printe.alignCenter();
  printe.setTextDoubleHeight();
  printe.setTextDoubleWidth();
  printe.bold(true);
  printe.println('TICKET DE COMPRA');
  printe.bold(false);
  printe.setTextNormal();
  content.forEach((line) => printe.println(line));

  printe.cut();
  printe.execute();
};

export default printerTicket;