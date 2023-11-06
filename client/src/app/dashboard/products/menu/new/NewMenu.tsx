'use client';
import { PhotoIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Card, Select, SelectItem } from '@tremor/react';
import { useForm } from 'react-hook-form';
import { type DragEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type FormData } from '@/types';
import { toast } from 'sonner';
import axios from '@/app/api/axios';

const NewMenu = (): JSX.Element => {
  const router = useRouter();
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
      const res = await axios.post('/menu/createMenuElement', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return res.data;
    };
    const promise = fetch();
    toast.promise(promise, {
      loading: 'Loading...',
      success: () => {
        router.back();
        return 'Elemento registrado exitosamente!';
      },
      error: (err) => {
        return err.response.data.message;
      }
    });
  };

  useEffect(() => {
    setValue('category_Menu', category);
  }, [category, setValue]);

  return (
    <div className="flex justify-center">
      <Card className="max-w-4xl">
        <form className="py-4 sm:px-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-15">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Registrar un nuevo elemento del menu
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
                    <input
                      type="text"
                      {...register('name', {
                        required: 'El nombre es requerido'
                      })}
                      id="name"
                      className={`border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2 ${
                        errors.name
                          ? 'border-red-600 border-2'
                          : 'focus:border-blue-600 focus:border-2'
                      }`}
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

                <div className="sm:col-span-3">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Precio
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      {...register('price', {
                        required: 'El precio es requerido'
                      })}
                      id="price"
                      className={`border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2 ${
                        errors.price
                          ? 'border-red-600 border-2'
                          : 'focus:border-blue-600 focus:border-2'
                      }`}
                    />
                    {errors.price && (
                      <div className="flex gap-1 p-1">
                        <ExclamationCircleIcon className="text-red-500 w-4 h-4" />
                        <span className="text-red-500 text-xs">
                          {errors.price.message}
                        </span>
                      </div>
                    )}
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
                    <textarea
                      id="description"
                      rows={3}
                      {...register('description', {
                        required: 'La descripción es requerida'
                      })}
                      className={`border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2 ${
                        errors.description
                          ? 'border-red-600 border-2'
                          : 'focus:border-blue-600 focus:border-2'
                      }`}
                      defaultValue={''}
                    />
                    {errors.description && (
                      <div className="flex gap-1 p-1">
                        <ExclamationCircleIcon className="text-red-500 w-4 h-4" />
                        <span className="text-red-500 text-xs">
                          {errors.description.message}
                        </span>
                      </div>
                    )}
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
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => {
                router.back();
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewMenu;
