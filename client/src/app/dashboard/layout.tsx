import Navbar from '@/components/Navbar';
import { getServerSession } from 'next-auth/next';

const DashboardLayout = async ({
  children
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> => {
  const session = await getServerSession();
  return (
    <>
      <Navbar user={session?.user} />
      <main>{children}</main>
    </>
  );
};
export default DashboardLayout;
