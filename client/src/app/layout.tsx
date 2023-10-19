import './globals.css';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import Providers from '@/context/Providers';

const lato = Lato({
  weight: '400',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Embrujo De Mar',
  description: 'Aplicación web del restaurante embrujo de mar'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="es">
      <body className={lato.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
