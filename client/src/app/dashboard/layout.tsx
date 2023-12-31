import { getServerSession } from 'next-auth';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Toaster } from 'sonner';
import { Suspense } from 'react';
import Loading from '@/app/dashboard/loading';

const DashboardLayout = async ({
  children
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> => {
  const session = await getServerSession();
  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <div className="z-0 relative flex h-screen overflow-hidden bg-gray-100">
        <Sidebar />
        <div className="z-0 relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header user={session?.user} />
          <main className="custom-scrollbar overflow-y-auto">
            <div className="mx-auto max-w-screen-3xl">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
export default DashboardLayout;
