import escpos, { Printer } from 'escpos';

const printTicket = (): void => {
  const device = new (escpos as any).Network('192.168.56.1', 9100);
  const options = { encoding: 'GB18030' /* default */ };
  const printer = new Printer(device, options);

  // Abrir la conexión con la impresora
  device.open((error?: Error) => {
    if (error) {
      console.error('Error al abrir la conexión:', error);
      return;
    }

    // Enviar comandos de impresión
    printer
      .text('¡Hola, mundo!\n')
      .cut()
      .close((error?: Error) => {
        if (error) {
          console.error('Error al cerrar la conexión:', error);
        }
      });
  });
};

export default printTicket;
