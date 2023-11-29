'use client';
import React from 'react';
import { Button } from '@tremor/react';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

const AddButton = ({ url }: { url: string }): JSX.Element => {
  return (
    <Link href={url}>
      <Button icon={PlusCircleIcon}>Agregar</Button>
    </Link>
  );
};

export default AddButton;
