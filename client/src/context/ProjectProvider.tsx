'use client';
import { createContext, useContext, useState } from 'react';

interface ContextProps {
  boxesOpen: any;
  setBoxesOpen: React.Dispatch<React.SetStateAction<any>>;
}

const Context = createContext<ContextProps | undefined>(undefined);

export const useProjectContext = (): ContextProps => {
  const context = useContext(Context);
  if (!context) throw new Error('useTasks must be used within a TasksProvider');
  return context;
};

export const ContextProvider = ({
  children
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [boxesOpen, setBoxesOpen] = useState<any>([]);

  return (
    <Context.Provider
      value={{
        boxesOpen,
        setBoxesOpen
      }}
    >
      {children}
    </Context.Provider>
  );
};
