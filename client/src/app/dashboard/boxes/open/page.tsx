import OpenBox from '@/components/Boxes/OpenBox/OpenBox';
import { cookies } from 'next/headers';

const getBoxes = async (): Promise<any> => {
  const cookie = cookies().toString();
  const res = await fetch('http://localhost:4000/boxCon/getBoxes', {
    credentials: 'include',
    headers: { Cookie: cookie }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
};

const OpenBoxPage = async (): Promise<JSX.Element> => {
  const boxes = await getBoxes();
  return <OpenBox boxes={boxes} />;
};

export default OpenBoxPage;
