# Task Manager

### Tech Stack

-   **Frontend:**

    -   Next.js
    -   React.js
    -   TypeScript
    -   State Management using Redux
    -   Input Validation using Zod
    -   Shadcn UI
    -   Accertinity UI
    -   Tailwind CSS

-   **Backend:**

    -   Node.js
    -   Express
    -   MongoDB
    -   Input Validation using Zod

-   **Deployment:**

    -   Vercel

-   **Version Control**
    -   Git
    -   Github

### Features and Requirements

1.  **User Authentication:**

    -   User authentication (sign up, log in, and logout) using **JWT** (JSON Web Tokens).
    -   Protected routes to ensure that only authenticated users can access the task management features.

2.  **Task Management:**

    -   Users can create, edit, delete, and view tasks.
    -   Each task has the following fields:
        -   Title (string, required)
        -   Description (string, optional)
        -   Status (enum: "To Do", "In Progress", "Completed")
        -   Priority (enum: "Low", "Medium", "High")
        -   Due Date (date, optional)
    -   Tasks can be filterable and sortable by status, priority, and due date.

3.  **Task List Screen:**

    -   Displays a list of tasks with filtering and sorting options.
    -   Allows users to perform **CRUD** operations directly from the list view.

4.  **Backend API:**

    -   Built a backend API using **Node.js** and Express to handle CRUD operations for tasks and user authentication.
    -   Connected to a **MongoDB** database to store user and task data.

5.  **Frontend Features:**

    -   Used **Next.js** to create a responsive and dynamic user interface.
    -   Implemented a task list view
    -   Used state management **Redux** to manage the application state.
    -   Provided a form for creating and editing tasks.
    -   Displays error messages and handle form validation using **Zod**.

6.  **UI Design:**

    -   Used Shadcn to create a modern and visually appealing user interface.
    -   Responsive UI for both desktop and mobile devices

7.  **Deployment:**

    -   Go to vercel.com, connect this repository to a vercel account.
    -   Add in the necessary environment variables.
    -   Click deploy.
    -   Upon successful deployment, every push to the master branch will be an attempt to deploy the code to vercel

8.  **Code Quality:**

    -   Followed best practices for React and MERN stack development.
    -   Write clean, maintainable, and modular code.
    -   Included comments to explain complex logic.
    -   Used **TypeScript** to define types for better maintainability.
