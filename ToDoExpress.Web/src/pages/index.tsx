import ConnexionModal from "@/components/connexionModal";
import RootLayout from "@/components/layout";
import { getTodosItemsByUser } from "@/functions/firebase_functions";
import { IFirebaseUser, ITodoItem } from "@/interfaces/firebase_interfaces";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

export default function Connexion() {
  const [user, setUser] = useState<IFirebaseUser | undefined>();
  const [todoItems, setTodoItems] = useState<ITodoItem[]>();
  const [openModal, setOpenModal] = useState(false);

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

  return (
    <RootLayout navbar>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {!user && (
          <ConnexionModal open={openModal} setOpenModal={setOpenModal} />
        )}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {user ? (
            <Fragment>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Welcome {user.name}
              </h2>
              <ul className="flex flex-col">
                {todoItems &&
                  todoItems.map((todo) => (
                    <li
                      key={todo.title}
                      className="flex flex-col gap-x-2 py-3 px-4 text-sm  bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    >
                      <p className="text-lg">{todo.title}</p>
                      <p className="text-sm text-gray-500">
                        {todo.description}
                      </p>
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
                  Please{" "}
                  <Link
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    href=""
                    onClick={() => setOpenModal(true)}
                  >
                    Log in
                  </Link>{" "}
                  to your account to manage your To-Do Express.{" "}
                </p>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </RootLayout>
  );
}
