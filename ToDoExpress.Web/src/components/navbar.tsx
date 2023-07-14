import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { IFirebaseUser } from "@/interfaces/firebase_interfaces";
import { logOut } from "@/functions/firebase_functions";
import ConnexionModal from "./connexionModal";
import { ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [user, setUser] = useState<IFirebaseUser | undefined>();
  const [openConnexionModal, setOpenConnexionModal] = useState<boolean>(false);

  useEffect(() => {
    if (!user && sessionStorage.getItem("user") !== null) {
      setUser(JSON.parse(sessionStorage.getItem("user")!));
    }
  }, [user]);

  return (
    <Fragment>
      <header className="bg-white dark:bg-gray-800">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
                <h1 className="font-mono font-bold text-2xl border-double drop-shadow-2xl border-4 border-sky-500 p-2 rounded-lg bg-white hover:bg-blue-100 dark:text-white dark:bg-gray-900 hover:dark:bg-slate-950">To-Do-X</h1>
            </Link>
          </div>
          <div className="lg:flex lg:flex-1 lg:justify-end">
            {user ? (
              <Link
                href="#"
                className="text-blue-600"
                onClick={() => logOut()}
              >
              <ArrowLeftOnRectangleIcon width={24} height={24} />
              </Link>
            ) : (
              <Link
                href="#"
                className="text-blue-600"
                onClick={() => setOpenConnexionModal(true)}
              >
                <ArrowRightOnRectangleIcon width={24} height={24} />
              </Link>
            )}
          </div>
        </nav>
      </header>
      {/* Modals */}
      <ConnexionModal
        open={openConnexionModal}
        setOpenModal={setOpenConnexionModal}
      />
    </Fragment>
  );
}
