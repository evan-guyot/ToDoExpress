# ToDoExpress

ToDoExpress is an online ToDo application built with Next.js, React, TypeScript, and Tailwind CSS. It allows users to create an account, manage their to-do lists, and stay organized.

## Features

- ### User authentication
- [x] User authentication: Users can sign up
- [x] User authentication: Users can log in
- [x] User authentication: Users can log out

- ### Create and manage to-do lists
- [ ] Create and manage to-do lists: Users can add tasks to the to-do list
- [ ] Create and manage to-do lists: Users can edit tasks in the to-do list
- [ ] Create and manage to-do lists: Users can delete tasks from the to-do list
- [ ] Mark tasks as complete: Users can mark tasks as complete
- [ ] Filter and sort tasks: Users can filter tasks by status (complete/incomplete)
- [ ] Filter and sort tasks: Users can sort tasks by various criteria
- [ ] Create and manage to-do lists: Users can manage multiple to-do lists

- ### Design
- [x] User side SIP : The application is a Single Page Application
- [x] Responsive design: The application is optimized for different devices
- [x] Responsive design: The application is optimized for different screen sizes
- [ ] Responsive design: The application is optimized for a seamless experience

## Technologies Used

- [Next.js](https://nextjs.org/): A React framework for building server-side rendered and statically generated web applications.
- [React](https://react.dev/): A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
- [Firebase](https://firebase.google.com/): A google cloud-based platform for building web and mobile applications.

## Getting Started

To get started with ToDoExpress, follow the instructions below:

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 14 or above)
- npm (version 6 or above) or Yarn (version 1 or above)

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/ToDoExpress.git
   ```

2. Install the dependencies:
   ```shell
   npm install
   ```
3. Create a Firebase project and set up a Firestore database. That contains the following collections :

   - `users`
   - `todos`
   - `todos_items`

4. Create a `.env.local` file in the root of the project and add the following environment variables:

   ```makefile
   NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
   ```

5. Start the development server:
   ```shell
   npm run dev
   ```
6. Open your browser and visit `http://localhost:3000` to see the application.

## License

This project is licensed under the [MIT License](LICENSE).

---

Happy organizing with ToDoExpress! If you have any questions, feel free to reach out to me or open an issue in the repository.
