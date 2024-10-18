import React, { Fragment } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../atom/input";
import Button from "../atom/button";
import { Dialog, Transition } from "@headlessui/react";
import { useCreateGerbang, useGerbangs } from "../../services";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css"; 

interface FormInputs {
  id: number;
  IdCabang: number;
  NamaGerbang: string;
  NamaCabang: string;
}

interface TypeForm {
  show?: boolean | undefined;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}

const GerbangForm: React.FC<TypeForm> = ({ show, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const { mutate, isPending } = useCreateGerbang();
  const { refetch } = useGerbangs();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Gerbang successfully created!", {
          position: "top-left",
          autoClose: 3000,
        });
        refetch();
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error(`ERROR: ${error.message || "An error occurred"}`, {
          position: "top-left",
          autoClose: 3000,
        });
      },
    });
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-99999"
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                {/* Close Button */}
                <button
                  type="button"
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <IoMdClose size={24} />
                </button>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Tambah Gerbang
                </Dialog.Title>

                <div className="mt-4">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                      label="ID"
                      type="number"
                      error={errors.id?.message}
                      {...register("id", { required: "ID is required" })}
                    />
                    <Input
                      label="ID Cabang"
                      type="number"
                      error={errors.IdCabang?.message}
                      {...register("IdCabang", {
                        required: "ID Cabang is required",
                      })}
                    />
                    <Input
                      label="Nama Gerbang"
                      type="text"
                      error={errors.NamaGerbang?.message}
                      {...register("NamaGerbang", {
                        required: "Nama Gerbang is required",
                      })}
                    />
                    <Input
                      label="Nama Cabang"
                      type="text"
                      error={errors.NamaCabang?.message}
                      {...register("NamaCabang", {
                        required: "Nama Cabang is required",
                      })}
                    />
                    <Button
                      isLoading={isPending}
                      type="submit"
                      label="Submit"
                      className="w-full flex items-center justify-center"
                      variant="primary"
                      disabled={isPending} // Disable the button while loading
                    />
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default GerbangForm;
