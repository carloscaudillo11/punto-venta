'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SidebarLinkGroup from './SidebarLinkGroup';
import Image from 'next/image';
import {
  ArrowLeftIcon,
  RectangleGroupIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  BuildingStorefrontIcon,
  BanknotesIcon,
  ShoppingCartIcon,
  TagIcon,
  TruckIcon,
  UsersIcon,
  PresentationChartLineIcon,
  InboxIcon,
  InboxStackIcon,
  InboxArrowDownIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';
import axios from '@/app/api/axios';
import { useProjectContext } from '@/context/ProjectProvider';

const Sidebar = (): JSX.Element => {
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const storedSidebarExpanded = 'true';
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );
  const [boxes, setBoxes] = useState<any[]>([]);
  const { setSidebarOpen, sidebarOpen } = useProjectContext();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent): void => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    const fetch = async (): Promise<any> => {
      const res = await axios.get('/box/getBoxes', {
        withCredentials: true
      });
      return res.data;
    };

    const promise = fetch();
    promise
      .then((data) => {
        setBoxes(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: RectangleGroupIcon },
    {
      name: 'Cajas',
      icon: BuildingStorefrontIcon,
      submenu:
        boxes.length > 0
          ? [
              {
                name: 'Aperturar Caja',
                href: '/dashboard/boxes/open',
                icon: InboxIcon
              },
              {
                name: 'Mis Ventas',
                href: '/dashboard/boxes/sales',
                icon: PresentationChartLineIcon
              },
              {
                name: 'Nueva Venta',
                href: '/dashboard/boxes/newSale',
                icon: InboxArrowDownIcon
              },
              {
                name: 'Registrar Caja',
                href: '/dashboard/boxes/registerBox',
                icon: InboxStackIcon
              }
            ]
          : [
              {
                name: 'Registrar Caja',
                href: '/dashboard/boxes/registerBox',
                icon: InboxStackIcon
              }
            ]
    },
    {
      name: 'Productos',
      icon: TagIcon,
      submenu: [
        { name: 'Menu', href: '/dashboard/products/menu', icon: BookOpenIcon },
        {
          name: 'Contables',
          href: '/dashboard/products/accounting',
          icon: ClipboardDocumentListIcon
        }
      ]
    },
    { name: 'Proveedores', href: '/dashboard/providers', icon: TruckIcon },
    {
      name: 'Compras',
      href: '/dashboard/purchases',
      icon: ShoppingCartIcon
    },
    { name: 'Usuarios', href: '/dashboard/users', icon: UsersIcon },
    {
      name: 'Transacciones',
      href: '/dashboard/transactions',
      icon: BanknotesIcon
    }
  ];

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white border duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center sm:justify-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 border-b ">
        <Link href="/">
          <Image width={156} height={32} src={'/images/logo.png'} alt="Logo" />
        </Link>

        <button
          ref={trigger}
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="custom-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-3 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-4">
              {navigation.map((item, index) =>
                item.submenu ? (
                  <SidebarLinkGroup
                    activeCondition={pathname === item.href}
                    key={index}
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <div
                            className={`relative flex items-center gap-2.5 rounded-md py-2 px-3 duration-300 ease-in-out hover:bg-gray-100 text-gray-600 font-normal`}
                            onClick={() => {
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <item.icon className="w-5 h-5 text-gray-600 " />
                            {item.name}
                            {open ? (
                              <ChevronDownIcon className="w-5 h-5 text-gray-600 absolute right-4" />
                            ) : (
                              <ChevronUpIcon className="w-5 h-5 text-gray-600 absolute right-4" />
                            )}
                          </div>
                          {item.submenu.map((subitem, index) => (
                            <div
                              key={index}
                              className={`translate transform overflow-hidden ${
                                !open && 'hidden'
                              }`}
                            >
                              <ul className="mt-3 flex flex-col pl-6">
                                <li>
                                  <Link
                                    href={subitem.href}
                                    className={`relative flex items-center gap-2.5 rounded-md py-2 px-4 duration-300 ease-in-out   ${
                                      pathname === subitem.href
                                        ? 'bg-cyan-700 text-white font-medium'
                                        : 'hover:bg-gray-100 text-gray-600 font-normal'
                                    } `}
                                  >
                                    <subitem.icon
                                      className={`w-5 h-5 ${
                                        pathname === subitem.href
                                          ? 'text-white'
                                          : 'text-gray-600'
                                      }`}
                                    />
                                    {subitem.name}
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          ))}
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                ) : (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`relative flex items-center gap-2.5 rounded-md py-2 px-3 duration-300 ease-in-out  ${
                        pathname === item.href
                          ? 'bg-cyan-700 text-white font-medium'
                          : 'hover:bg-gray-100 text-gray-600 font-normal'
                      }`}
                    >
                      <item.icon
                        className={`w-5 h-5 ${
                          pathname === item.href
                            ? 'text-white'
                            : 'text-gray-600'
                        }`}
                      />
                      {item.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
