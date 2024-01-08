'use client';
import { motion } from 'framer-motion';
import { useState } from 'react'; // Agregamos useState
import { useProjectContext } from '@/context/ProjectProvider';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';

const Path = (props: any): any => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const Header = (props: { user: any }): JSX.Element => {
  const { setSidebarOpen, sidebarOpen } = useProjectContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar la apertura y cierre del menú

  const toggleMenu = (): void => {
    setSidebarOpen(!sidebarOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header
      className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1"
      initial={false}
      animate={sidebarOpen ? 'open' : 'closed'}
    >
      <div className="flex flex-grow items-center sm:justify-end justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden ">
          <motion.button
            onClick={toggleMenu}
            className="z-99999 block rounded-sm border border-gray-200 bg-white p-1.5 shadow-sm lg:hidden"
          >
            <svg width="23" height="23" viewBox="0 0 23 23">
              <Path
                variants={{
                  closed: { d: 'M 2 2.5 L 20 2.5' },
                  open: { d: 'M 3 16.5 L 17 2.5' }
                }}
              />
              <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.1 }}
              />
              <Path
                variants={{
                  closed: { d: 'M 2 16.346 L 20 16.346' },
                  open: { d: 'M 3 2.5 L 17 16.346' }
                }}
              />
            </svg>
          </motion.button>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DropdownNotification />
          </ul>
          <DropdownUser user={props.user} />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
