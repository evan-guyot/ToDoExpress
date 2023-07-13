import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import RegistrationModalContent from "./contents/registrationModalContent";
import ConnexionModalContent from "./contents/connexionModalContent";

export default function ConnexionModal(props: {
  open: boolean;
  setOpenModal: (state: boolean) => void;
}) {
  const { open, setOpenModal } = props;
  const [registration, setRegistration] = useState<boolean>(false);
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpenModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {registration ? (
                  <RegistrationModalContent
                    setOpenModal={setOpenModal}
                    setRegistration={setRegistration}
                    cancelRef={cancelButtonRef}
                  />
                ) : (
                  <ConnexionModalContent
                    setOpenModal={setOpenModal}
                    setRegistration={setRegistration}
                    cancelRef={cancelButtonRef}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
