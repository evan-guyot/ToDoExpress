"use client";
import ConnexionModal from "@/components/connexionModal";
import RootLayout from "@/components/layout";
import {
  getTodosItemsByUser,
  itemsFromUid,
  userFromUid,
} from "@/functions/firebase_functions";
import { ITodoItem, IUser } from "@/interfaces/firebase_interfaces";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

export default function Connexion() {
  const [user, setUser] = useState<IUser | undefined>();
  const [userUid, setUserUid] = useState<string>();
  const [todoItems, setTodoItems] = useState<ITodoItem[]>();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (userUid) {
        try {
          const todoItems = await getTodosItemsByUser(userUid);
          if (todoItems) {
            setTodoItems(todoItems);
          }

          const itemsData = await itemsFromUid(userUid);
          if (itemsData !== undefined) {
            // setItems(itemsData);
          }
          const userData = await userFromUid(userUid);
          if (userData !== undefined) {
            setUser(userData);
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
    if (userUid) {
      fetchData();
    }
  }, [userUid]);

  return (
    <RootLayout navbar>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {!userUid && (
          <ConnexionModal
            setUid={setUserUid}
            open={openModal}
            setOpenModal={setOpenModal}
          />
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
