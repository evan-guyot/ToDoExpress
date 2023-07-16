import { ITodoItem } from "@/interfaces/firebase_interfaces";

export default function ToDoItem(props: {
  toDoItem: ITodoItem;
  deleteItem: (index: number) => void;
  index: number;
}) {
  const { toDoItem, deleteItem, index } = props;

  return (
    <li
      key={index}
      className="flex flex-row gap-x-2 py-3 px-4 text-sm  bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
    >
      <div className="flex-col">
        <p className="text-lg">{toDoItem.title}</p>
        <p className="text-sm text-gray-500">{toDoItem.description}</p>
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 mr-0.5 p-1.5 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 hover:bg-red-200 inline-flex items-center justify-center h-6 w-6 dark:text-red-400 dark:hover:dark:bg-red-900/50"
        data-dismiss-target="#alert"
        aria-label="Close"
        onClick={() => deleteItem(index)}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </li>
  );
}
