import ConnexionModal from "@/components/connexionModal";
import RootLayout from "@/components/layout";
import { getTodosItemsByUser } from "@/functions/firebase_functions";
import { IFirebaseUser, ITodoItem } from "@/interfaces/firebase_interfaces";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import AddElementModal from "@/components/addElementModal";

export default function Connexion() {
  const [user, setUser] = useState<IFirebaseUser | undefined>();
  const [todoItems, setTodoItems] = useState<ITodoItem[]>();
  const [openConnexionModal, setOpenConnexionModal] = useState(false);
  const [openAddElementModal, setOpenAddElementModal] = useState(false);
  const [openRegModal, setOpenRegModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        try {
          const todoItems = await getTodosItemsByUser(user.uid);
          if (todoItems) {
            setTodoItems(todoItems);
          }
        } catch (err) {
          console.error(err);
        }
      }
    }

    if (user) {
      fetchData();
    } else if (sessionStorage.getItem("user") !== null) {
      let user: IFirebaseUser = JSON.parse(sessionStorage.getItem("user")!);
      setUser(user);
    }
  }, [user]);

  function addToItems(item: ITodoItem) {
    todoItems && setTodoItems([...todoItems, item]);
  }

  return (
    <RootLayout navbar>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {!user && (
          <ConnexionModal
            open={openConnexionModal}
            setOpenModal={setOpenConnexionModal}
          />
        )}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {user && todoItems ? (
            <Fragment>
              <button
                className="absolute inline-flex items-center justify-center p-2 bg-blue-500 rounded-md shadow-lg w-9 h-9"
                onClick={() => setOpenAddElementModal(true)}
              >
                <PlusIcon width={24} height={24} color="white" />
              </button>
              <AddElementModal
                open={openAddElementModal}
                setOpenModal={setOpenAddElementModal}
                addToParentItems={addToItems}
                listLength={todoItems.length}
              />
              <h2 className="m-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {user.name}&#39;s To Do
              </h2>
              <ul className="flex flex-col">
                {todoItems.map((todo) => (
                  <li
                    key={todo.title}
                    className="flex flex-col gap-x-2 py-3 px-4 text-sm  bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <p className="text-lg">{todo.title}</p>
                    <p className="text-sm text-gray-500">{todo.description}</p>
                  </li>
                ))}
              </ul>
            </Fragment>
          ) : (
            <Fragment>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Welcome
              </h2>
              <div className="flex flex-col">
                <p>
                  Log in to your account or create one, to manage your To-Do
                  Express.
                </p>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </RootLayout>
  );
}
