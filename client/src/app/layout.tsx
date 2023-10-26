import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Providers from '@/context/Providers';

const roboto = Roboto({
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
    <html lang="es" className="h-full">
      <body className={`h-full${roboto.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
