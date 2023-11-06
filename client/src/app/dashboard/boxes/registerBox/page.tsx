import RegisterBox from './RegisterBox';
import { cookies } from 'next/headers';

const RegisterBoxPage = async (): Promise<JSX.Element> => {
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
  const boxes = await getBoxes();
  return <RegisterBox boxes={boxes} />;
};

export default RegisterBoxPage;
