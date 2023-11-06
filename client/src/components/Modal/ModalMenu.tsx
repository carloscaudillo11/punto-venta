import {
  Fragment,
  useRef,
  type Dispatch,
  type SetStateAction,
  useEffect
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from '@/app/api/axios';
import { toast } from 'sonner';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { type Menu } from '@/types';

const ModalMenu = ({
  open,
  setOpen,
  menu
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  menu?: Menu;
}): JSX.Element => {
  const cancelButtonRef = useRef(null);
  const router = useRouter();
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: ''
    }
  });

  useEffect(() => {
    if (menu !== undefined) {
      setValue('name', menu.name);
    }
  }, [menu, setValue]);

  const onSubmit = (data: any): void => {
    if (menu === undefined) {
      const fetch = async (): Promise<any> => {
        const name = data.name;
        const res = await axios.post(
          '/box/createBox',
          { name },
          { withCredentials: true }
        );
        return res.data;
      };
      const promise = fetch();
      toast.promise(promise, {
        loading: 'Loading...',
        success: () => {
          setOpen(false);
          router.refresh();
          reset();
          return 'Caja registrada exitosamente!';
        },
        error: (err) => {
          return err.response.data.message;
        }
      });
    } else {
      const fetch = async (): Promise<any> => {
        const name = data.name;
        const res = await axios.put(
          `/box/updateBox/${menu._id}`,
          { name },
          { withCredentials: true }
        );
        return res.data;
      };
      toast.promise(fetch(), {
        loading: 'Loading...',
        success: () => {
          setOpen(false);
          router.refresh();
          reset();
          return 'Caja actualizada exitosamente!';
        },
        error: (err) => {
          return err.response.data.message;
        }
      });
    }
  };

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-30 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-xl">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => {
                        setOpen(false);
                      }}
                      ref={cancelButtonRef}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {menu !== undefined
                        ? 'Actualizar Menu'
                        : 'Registrar Menu'}
                    </h3>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('name', {
                          required: 'El nombre de caja es requerido'
                        })}
                        className={`border border-gray-300 p-2 w-full mb-3 focus:border-blue-600 focus:border-2 ${
                          errors.name
                            ? 'border-red-600 border-2'
                            : 'focus:border-blue-600 focus:border-2'
                        }`}
                        placeholder="Nombre de la caja"
                      />
                      {errors.name && (
                        <div className="flex gap-1 p-1">
                          <ExclamationCircleIcon className="text-red-500 w-4 h-4" />
                          <span className="text-red-500 text-xs">
                            {errors.name.message}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      {menu !== undefined ? 'Actualizar' : 'Registrar'}
                    </button>
                  </div>
                </div>
              </form>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ModalMenu;
