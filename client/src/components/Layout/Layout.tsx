'use client';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useState } from 'react';
import { Toaster } from 'sonner';
import { type User } from '@/types';

const Layout = ({
  children,
  user,
  boxes
}: {
  children: React.ReactNode;
  user: User;
  boxes: any;
}): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <div className=" z-0 relative flex h-screen overflow-hidden bg-gray-100">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          boxes={boxes}
        />
        <div className="z-0 relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            user={user}
          />
          <main>
            <div className="mx-auto max-w-screen-2xl p-3 md:p-5 2xl:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
export default Layout;
