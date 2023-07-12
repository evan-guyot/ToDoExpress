import { addItemTodo } from "@/functions/firebase_functions";
import { IFirebaseUser, ITodoItem } from "@/interfaces/firebase_interfaces";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";

export default function AddElementModal(props: {
  open: boolean;
  setOpenModal: (state: boolean) => void;
  addToParentItems: (item: ITodoItem) => void;
  listLength: number;
}) {
  const { open, setOpenModal, addToParentItems, listLength } = props;
  const cancelButtonRef = useRef(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addItem = () => {
    console.log(title.trim().length);
    console.log(description.trim().length);
    if (
      title.trim().length > 0 &&
      description.trim().length > 0 &&
      sessionStorage.getItem("user")
    ) {
      let uid = (JSON.parse(sessionStorage.getItem("user")!) as IFirebaseUser)
        .uid;

      let todoItem = {
        title: title,
        order: listLength,
        description: description,
      };

      addItemTodo(uid, todoItem);
      addToParentItems(todoItem);
      setOpenModal(false);
      setTitle("");
      setDescription("");
    }
  };

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg m-auto">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex items-start flex-col">
                    <div className="w-full text-center  sm:mt-0 sm:text-left">
                      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="mt-2">
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Titre
                          </label>
                          <div className="mt-2">
                            <input
                              id="title"
                              name="title"
                              type="title"
                              autoComplete="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              required
                              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Description
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="description"
                              name="description"
                              rows={5}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              required
                              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={() => addItem()}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpenModal(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
