import TableUsers from '@/components/Table/TableUsers';
import { cookies } from 'next/headers';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import AddButton from '@/components/ui/AddButton';

const getUsers = async (): Promise<any> => {
  const cookie = cookies().toString();
  const res = await fetch('http://localhost:4000/auth/getUsers', {
    credentials: 'include',
    headers: { Cookie: cookie }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
};

const UsersPage = async (): Promise<JSX.Element> => {
  const users = await getUsers();
  return (
    <div className="flex flex-col gap-7 py-2 p-6 md:p-10">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold tracking-tight text-gray-700">
          Registrar Usuario
        </h1>
        <AddButton url="/dashboard/users/new" />
      </div>
      <div>
        {users.length === 0 ? (
          <div className="flex items-center gap-2 text-gray-500 justify-center">
            <PencilSquareIcon className="w-5 h-5" />
            <p>No hay datos aún</p>
          </div>
        ) : (
          <TableUsers users={users} />
        )}
      </div>
    </div>
  );
};

export default UsersPage;
