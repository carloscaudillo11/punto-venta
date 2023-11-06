import React from 'react';
import { cookies } from 'next/headers';
import Menu from './Menu';

const MenuPage = async (): Promise<JSX.Element> => {
  const cookie = cookies().toString();

  const getMenu = async (): Promise<any> => {
    const res = await fetch('http://localhost:4000/menu/getMenu', {
      credentials: 'include',
      headers: { Cookie: cookie }
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data;
  };
  const menu = await getMenu();
  return <Menu menu={menu} />;
};

export default MenuPage;
