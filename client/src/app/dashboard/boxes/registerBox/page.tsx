import RegisterBox from '@/components/Boxes/RegisterBox/RegisterBox';
import { cookies } from 'next/headers';

const getBoxes = async (): Promise<any> => {
  const cookie = cookies().toString();
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

const RegisterBoxPage = async (): Promise<JSX.Element> => {
  const boxes = await getBoxes();
  return <RegisterBox boxes={boxes} />;
};

export default RegisterBoxPage;
