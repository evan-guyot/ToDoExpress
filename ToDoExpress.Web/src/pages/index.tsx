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
        <div className="">
          {user && todoItems ? (
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <button
                className="absolute inline-flex items-center justify-center p-2 bg-blue-500 rounded-md shadow-lg w-9 h-9 dark:bg-gray-800 dark:border-gray-700 "
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
              <h2 className="m-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                Your To Do X
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
            </div>
          ) : (
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                Welcome
              </h2>
              <div className="flex flex-col italic">
                <h4 className="p-4">Welcome to To-Do Express (To-Do-X) - Your Ultimate Task Management Companion!</h4>
                <p className="text-left p-4">
                  Are you tired of juggling multiple to-do lists and struggling to stay organized? Look no further! To-Do Express is here to revolutionize your productivity game.
                  Whether you&#39;re a seasoned task-master or just starting your journey towards efficiency, our lightning-fast and user-friendly web app is designed to simplify your life and make task management a breeze.
                  With To-Do Express, you can effortlessly create, prioritize, and manage your tasks with a few clicks. Say goodbye to post-it notes and scattered reminders; our intuitive interface will keep you in control of your responsibilities.
                </p>
                <h4 className="text-left pl-4 pt-4 font-semibold">Key Features:</h4>
                <ol className="text-left p-4 pl-8 list-decimal">
                  <li>Speed and Simplicity: We understand the value of your time, which is why To-Do Express is optimized for speed. No unnecessary bells and whistles, just a clean and streamlined interface to help you focus on what matters most.</li>
                  <li>Seamless Collaboration: Working on a team project or planning an event? To-Do Express allows you to easily share tasks and collaborate with colleagues, friends, and family. Stay in sync and accomplish goals together.</li>
                  <li>Personalized Organization: Tailor your to-do lists to suit your unique style and preferences. Use tags, due dates, and categories to categorize and prioritize your tasks. Customize your experience to match your workflow.</li>
                  <li>Reminders and Notifications: Never miss a deadline again! To-Do Express offers timely reminders and notifications, ensuring that you stay on top of your commitments. Be it work tasks, personal goals, or upcoming events, we&#39;ve got you covered.</li>
                  <li>Mobile Accessibility: Stay connected and organized on the go! To-Do Express is mobile-friendly, enabling you to manage your tasks anytime, anywhere. Seamlessly transition between devices and stay productive wherever you are.</li>
                </ol>
                <p className="p-4">
                Join our ever-growing community of motivated individuals who have transformed their productivity using To-Do Express. Start today and unlock your full potential.
                Sign up now to experience the power of simplicity and efficiency with To-Do Express. Let us help you conquer your to-do list and supercharge your productivity!
                Remember, every great accomplishment starts with a simple step. Let To-Do Express be your trusted companion on this exciting journey towards success.  
                </p>
                <p className="p-4 font-semibold text-right">Evan Guyot</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </RootLayout>
  );
}
