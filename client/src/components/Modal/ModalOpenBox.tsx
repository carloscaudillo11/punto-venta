import {
  Fragment,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from '@/app/api/axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { NumberInput, Select, SelectItem } from '@tremor/react';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

const ModalOpenBox = ({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const cancelButtonRef = useRef(null);
  const [boxes, setBoxes] = useState<any[]>([]);
  const [box, setBox] = useState('');
  const router = useRouter();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      startingAmount: 0
    }
  });

  const onSubmit = handleSubmit((data) => {
    const fetch = async (): Promise<any> => {
      const startingAmount = data.startingAmount;
      const res = await axios.post(
        '/boxCon/openBox',
        { startingAmount, box },
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
        return 'Caja Abierta exitosamente!';
      },
      error: (err) => {
        return err.response.data.message;
      }
    });
  });

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
        if (data.length > 0) {
          setBox(data[0]._id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <form onSubmit={onSubmit}>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <span className="sr-only">Cerrar</span>
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
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
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Abrir Caja
                      </Dialog.Title>
                    </div>
                    <div className="mt-2">
                      <Select value={box} onValueChange={setBox}>
                        {boxes.map((item, index) => (
                          <SelectItem value={item._id} key={index}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </Select>
                      <NumberInput
                        {...register('startingAmount', {
                          required: {
                            value: true,
                            message: 'El monto inicial es requerido'
                          }
                        })}
                        error={!!errors.startingAmount}
                        placeholder="Monto Inicial"
                        icon={CurrencyDollarIcon}
                        errorMessage={errors.startingAmount?.message}
                        className="mt-3"
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Abrir
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

export default ModalOpenBox;
