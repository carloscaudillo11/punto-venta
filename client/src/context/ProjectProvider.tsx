'use client';
import { createContext, useContext, useState } from 'react';

interface ContextProps {
  sidebarOpen: any;
  setSidebarOpen: React.Dispatch<React.SetStateAction<any>>;
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
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{
        sidebarOpen,
        setSidebarOpen
      }}
    >
      {children}
    </Context.Provider>
  );
};
