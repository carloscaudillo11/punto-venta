import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/context/Providers';
import { ContextProvider } from '@/context/ProjectProvider';

const font = Inter({ subsets: ['latin'] });

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
      <body className={`${font.className}`}>
        <Providers>
          <ContextProvider>{children}</ContextProvider>
        </Providers>
      </body>
    </html>
  );
}
