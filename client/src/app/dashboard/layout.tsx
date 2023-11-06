import Layout from '@/components/Layout/Layout';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import Loading from './loading';
import { type User } from '@/types';

const DashboardLayout = async ({
  children
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> => {
  const cookie = cookies().toString();
  const getBoxes = async (): Promise<any> => {
    const res = await fetch('http://localhost:4000/box/getBoxes', {
      credentials: 'include',
      headers: { Cookie: cookie }
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data;
  };
  const session = await getServerSession();
  const boxes = await getBoxes();
  return (
    <Layout user={session?.user} boxes={boxes}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </Layout>
  );
};
export default DashboardLayout;
