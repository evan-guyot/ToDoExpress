"use client";
import ConnexionModal from "@/components/connexionModal";
import RootLayout from "@/components/layout";
import { itemsFromUid, userFromUid } from "@/functions/firebase_functions";
import { ITodo, IUser } from "@/interfaces/firebase_interfaces";
import { useEffect, useState } from "react";

export default function Connexion() {
  const [items, setItems] = useState<ITodo | undefined>();
  const [user, setUser] = useState<IUser | undefined>();
  const [userUid, setUserUid] = useState<string>();

  useEffect(() => {
    async function fetchData() {
      if (userUid) {
        try {
          const itemsData = await itemsFromUid(userUid);
          if (itemsData !== undefined) {
            setItems(itemsData);
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
      console.log("new user Uid is -> ", userUid);
      fetchData();
    }
  }, [userUid]);

  if (items) {
    console.log("size ->", items.items.length);
  }

  return (
    <RootLayout navbar>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {!userUid && <ConnexionModal setUid={setUserUid} />}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Welcome {user && user.name}
          </h2>

          <ul role="list" className="divide-y divide-gray-100">
            {items &&
              items.items.map((item) => (
                <li key={item} className="flex justify-between gap-x-6 py-5">
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {item}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end"></div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </RootLayout>
  );
}
