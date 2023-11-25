import OpenBox from '@/components/Boxes/OpenBox/OpenBox';
import { cookies } from 'next/headers';
export const dynamic = 'force-dynamic';

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
  let ventas;
  const cookie = cookies().toString();
  const boxes = await getBoxes();
  if (boxes !== null) {
    const id = boxes._id;
    const res = await fetch(
      `http://localhost:4000/transactions/getSalesByBox/${id}`,
      {
        credentials: 'include',
        headers: { Cookie: cookie }
      }
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    ventas = await res.json();
  } else {
    ventas = null;
  }
  return <OpenBox boxes={boxes} ventas={ventas} />;
};

export default OpenBoxPage;
