import { logIn } from "@/functions/firebase_functions";
import { Dialog } from "@headlessui/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Fragment, MutableRefObject, useState } from "react";
import { ErrorDisplay } from "../errorDisplay";
import { IError } from "@/interfaces/general_interfaces";

export default function ConnexionModalContent(props: {
  setOpenModal: (state: boolean) => void;
  setRegistration: (state: boolean) => void;
  cancelRef: MutableRefObject<null>;
}) {
  const { setOpenModal, setRegistration, cancelRef } = props;
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<IError | undefined>(undefined);

  async function logInFirebase(email: string, password: string) {
    try {
      await logIn(email, password);
    } catch (error) {
      setError({
        mainMessage: "Autentication error",
        subMessages: undefined,
      });
    }
  }

  return (
    <Fragment>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="flex items-start flex-col">
          <div className="flex flex-row">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <ArrowRightOnRectangleIcon
                className="h-6 w-6 text-blue-600"
                aria-hidden="true"
              />
            </div>
            <div className="self-center ml-2">
              <Dialog.Title
                as="h3"
                className="text-base font-semibold leading-6 text-gray-900"
              >
                Log in to your account
              </Dialog.Title>
            </div>
          </div>

          <div className="w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              {error && <ErrorDisplay error={error} setError={setError} />}
              <div className="mt-2">
                <label
                  htmlFor="mail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  E-mail
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5  px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="text-sm mt-6 float-right">
                <p className="font-semibold text-gray-500">
                  You need an account ?{" "}
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                    onClick={() => setRegistration(true)}
                  >
                    Register now !
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
          onClick={() => logInFirebase(email, password)}
        >
          Log in
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => setOpenModal(false)}
          ref={cancelRef}
        >
          Cancel
        </button>
      </div>
    </Fragment>
  );
}
