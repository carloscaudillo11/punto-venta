'use client';
import { PhotoIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import {
  Card,
  Select,
  SelectItem,
  NumberInput,
  TextInput,
  Textarea,
  Button
} from '@tremor/react';
import { useForm } from 'react-hook-form';
import { type DragEvent, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { type FormData } from '@/types';
import { toast } from 'sonner';
import axios from '@/app/api/axios';

const NewProviderPage = (): JSX.Element => {
  const router = useRouter();
  const params = useParams();
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File | undefined>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: '',
      category_Menu: '',
      price: 0,
      image: null
    }
  });

  const onDragOverHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const onDropHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setValue('image', file);
      setFile(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files[0];
      setValue('image', file);
      setFile(file);
    }
  };

  const onSubmit = (data: FormData): void => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('category_Menu', data.category_Menu);
    if (data.image) {
      formData.append('image', data.image);
    }
    const fetch = async (): Promise<any> => {
      if (params.id) {
        const res = await axios.put(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `/menu/updateMenuElement/${params.id}`,
          formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        return res.data;
      } else {
        const res = await axios.post('/menu/createMenuElement', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return res.data;
      }
    };
    const promise = fetch();
    toast.promise(promise, {
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

  useEffect(() => {
    setValue('category_Menu', category);
  }, [category, setValue]);

  useEffect(() => {
    if (params.id) {
      const fetch = async (): Promise<any> => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const res = await axios.get(`/menu/getMenuElement/${params.id}`, {
          withCredentials: true
        });
        return res.data;
      };
      const promise = fetch();
      promise
        .then((data) => {
          setValue('name', data.name);
          setValue('description', data.description);
          setValue('price', data.price);
          setValue('category_Menu', data.category_Menu);
          setCategory(data.category_Menu);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.id, setValue]);

  return (
    <div className="flex justify-center">
      <Card className="max-w-4xl">
        <form className="py-4 sm:px-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-15">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Registrar un Proveedor
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Ingresa información clara y concisa del elemento del menu.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nombre
                  </label>
                  <div className="mt-2">
                    <TextInput
                      id="name"
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

                <div className="sm:col-span-3">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Precio
                  </label>
                  <div className="mt-2">
                    <NumberInput
                      id="price"
                      {...register('price', {
                        required: {
                          value: true,
                          message: 'El monto inicial es requerido'
                        }
                      })}
                      error={!!errors.price}
                      icon={CurrencyDollarIcon}
                      errorMessage={errors.price?.message}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Descripción
                  </label>
                  <div className="mt-2">
                    <Textarea
                      rows={3}
                      id="description"
                      {...register('description', {
                        required: 'La descripción es requerida'
                      })}
                      error={!!errors.description}
                      errorMessage={errors.description?.message}
                      placeholder=""
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Escribe una descripcion para el producto.
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Categoria
                  </label>
                  <div className="mt-2">
                    <Select
                      value={category}
                      onValueChange={setCategory}
                      id="category"
                    >
                      <SelectItem value="Bebida Preparada">
                        Bebida Preparada
                      </SelectItem>
                      <SelectItem value="Platillo">Platillo</SelectItem>
                    </Select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Imagen
                  </label>
                  <div
                    className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                    onDragOver={(e) => {
                      onDragOverHandler(e);
                    }}
                    onDrop={(e) => {
                      onDropHandler(e);
                    }}
                  >
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          {file ? (
                            <span>{file.name}</span>
                          ) : (
                            <span>Arrastra una imagen aquí</span>
                          )}
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={(e) => {
                              handleFileUpload(e);
                            }}
                          />
                        </label>
                        <p className="pl-1">o arrastra y suelta</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF de hasta 10MB
                      </p>
                    </div>
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
