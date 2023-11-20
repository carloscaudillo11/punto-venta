'use client';
import React from 'react';
import { Button } from '@tremor/react';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

const AddButton = (): JSX.Element => {
  return (
    <Link href="/dashboard/products/menu/new">
      <Button icon={PlusCircleIcon}>Agregar</Button>
    </Link>
  );
};

export default AddButton;
