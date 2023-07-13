import { IError } from "@/interfaces/general_interfaces";

export function ErrorDisplay(props: {
  error: IError;
  setError: (error: IError | undefined) => void;
}) {
  const { error, setError } = props;

  return (
    <div
      id="alert-2"
      className="flex items-center p-2 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <div className="ml-3 text-sm">
        <span className="font-medium">{error.mainMessage}</span>
        {error.subMessages && (
          <ul className="mt-1.5 ml-4 list-disc list-inside">
            {error.subMessages.map((subMessage, index) => {
              return <li key={index}>{subMessage}</li>;
            })}
          </ul>
        )}
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 mr-0.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 hover:bg-red-200 inline-flex items-center justify-center h-6 w-6 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
        data-dismiss-target="#alert"
        aria-label="Close"
        onClick={() => setError(undefined)}
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}
