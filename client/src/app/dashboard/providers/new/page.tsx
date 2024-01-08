'use client';
import { Card, TextInput, Button, NumberInput } from '@tremor/react';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { type IProvider } from '@/types';
import { toast } from 'sonner';
import axios from '@/app/api/axios';

const NewProviderPage = (): JSX.Element => {
  const router = useRouter();
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IProvider>({
    defaultValues: {
      name: '',
      lastname: '',
      contact: {
        email: '',
        phone: ''
      },
      status: ''
    }
  });

  const onSubmit = (data: IProvider): void => {
    const form = {
      name: data.name,
      lastname: data.lastname,
      contact: {
        email: data.contact.email,
        phone: data.contact.phone
      }
    };
    console.log(form);

    const fetch = async (): Promise<any> => {
      if (params.id) {
        const res = await axios.put(
          `/providers/updateProvider/${params.id.toString()}`,
          form,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        return res.data;
      } else {
        const res = await axios.post('/providers/createProvider', form, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return res.data;
      }
    };

    toast.promise(fetch(), {
      loading: 'Loading...',
      success: () => {
        router.back();
        router.refresh();
        return params.id
          ? 'Elemento Actualizado Correctamente'
          : 'Elemento Registrado Correctamente';
      },
      error: (err) => {
        return err.response.data.message;
      }
    });
  };

  return (
    <div className="flex justify-center p-6 md:p-10">
      <Card className="max-w-2xl">
        <form className="py-4 sm:px-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-15">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Registrar un Proveedor
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Ingresa información clara y concisa del elemento del menu.
              </p>

              <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6 mt-5">
                <div className="col-span-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nombre
                  </label>
                  <div className="mt-2">
                    <TextInput
                      id="name"
                      placeholder=""
                      {...register('name', {
                        required: {
                          value: true,
                          message: 'El nombre es requerido'
                        }
                      })}
                      error={!!errors.name}
                      errorMessage={errors.name?.message}
                      type="text"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Apellidos
                  </label>
                  <div className="mt-2">
                    <TextInput
                      id="lastname"
                      placeholder=""
                      {...register('lastname', {
                        required: {
                          value: true,
                          message: 'Los apellidos son requeridos'
                        }
                      })}
                      error={!!errors.lastname}
                      errorMessage={errors.lastname?.message}
                      type="text"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <TextInput
                      id="email"
                      placeholder=""
                      {...register('contact.email', {
                        required: {
                          value: true,
                          message: 'El correo es requerido'
                        }
                      })}
                      error={!!errors.contact?.email}
                      errorMessage={errors.contact?.email?.message}
                      type="email"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Telefono
                  </label>
                  <div className="mt-2">
                    <NumberInput
                      id="phone"
                      placeholder=""
                      {...register('contact.phone', {
                        required: {
                          value: true,
                          message: 'El telefono es requerido'
                        }
                      })}
                      enableStepper={false}
                      error={!!errors.contact?.phone}
                      errorMessage={errors.contact?.phone?.message}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              size="sm"
              type="button"
              variant="light"
              onClick={() => {
                router.back();
              }}
            >
              Cancelar
            </Button>
            <Button size="sm" type="submit">
              Guardar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewProviderPage;
