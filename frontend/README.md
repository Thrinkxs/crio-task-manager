# CRIO TASK MANAGER

**Project Technical Explanation:**

The CRIO Task Manager is a web-based task management system that allows users to create, read, update, and delete tasks and users. It provides a user-friendly interface for managing tasks and users. The project uses the MERN stack, which consists of MongoDB, Express.js, React.js, and Node.js. Let's break down the technical aspects and design patterns used in this project:

1. **MERN Stack:**

   - **MongoDB:** A NoSQL database is used for storing task and user data.
   - **Express.js:** A Node.js web application framework is used for building the server-side application and defining the API routes.
   - **React.js:** A JavaScript library for building the user interface is used for the frontend.
   - **Node.js:** A JavaScript runtime is used for the server-side environment.

2. **Design Patterns:**

   - **Model-View-Controller (MVC):** The project follows the MVC architectural pattern. The model (MongoDB models) represents the data, the views (React components) handle the presentation and user interface, and the controllers (Express routes) manage the application's logic.

3. **Entity-Relationship Diagram (ERD):**

   | Entity | Attributes                                          | Relationships |
   | ------ | --------------------------------------------------- | ------------- |
   | User   | \_id, username                                      | task.assignee |
   | Task   | \_id, name, description, assignee, status, category | user.username |

   - In the above ERD, there are two main entities: "User" and "Task." Users can perform CRUD operations on both users and tasks. Each entity has a unique identifier ("\_id"), and "User" has a "username" attribute, while "Task" has attributes like "name," "description," "assignee," "status," and "category."

4. **Code Structure:**

   - The project has a clear code structure:

     - React components are organized in the `components` and `pages` directories.
     - APIs for tasks and users are defined in Express routes in the route folder inside the backend.
     - Database models for users and tasks are specified in MongoDB models using mongoose, in the backend, model folder.
     - Custom hooks for fetching data are created for users and tasks.
     - The `App` component is the entry point that defines the application's routing.

       - Front-end:

       The project includes various React components for the front-end:

       Dashboard: This component displays a simple dashboard with a welcome message. It does not interact with the server but serves as a user interface for the application.

       SideBar: This component represents the sidebar menu that allows users to navigate between different sections of the application.

       Home: This component displays a welcome message and the current time. It automatically updates the time every second. Again, it's a user interface component without server interactions.

       Tasks: This component manages tasks, including creating, editing, deleting, and displaying them. It communicates with the server to fetch, create, update, or delete tasks.

       Users: This component manages user data, including creating, editing, deleting, and displaying users. It also communicates with the server to perform CRUD (Create, Read, Update, Delete) operations on user data.

       - Back-end:

       The back-end is built using Node.js and Express and includes routes and controllers for managing tasks and users. It interacts with a MongoDB database using Mongoose for data storage. The back-end routes for tasks and users include the following operations:

       Create User/Task: Creates a new user or task and saves it to the database.

       Read All Users/Tasks: Retrieves all users or tasks from the database.

       Read User/Task by ID: Retrieves a specific user or task from the database based on the ID.

       Update User/Task: Updates an existing user or task in the database.

       Delete User/Task: Deletes a user or task from the database.

5. **Frontend Technologies:**

   - The frontend is built using React.js, and various packages and libraries are utilized:
     - Material-UI's DataGrid is used for displaying and managing task and user data in a tabular format.
     - Chakra UI is used for creating modals and UI components.
     - Axios is used for making API requests to the backend.
     - React Router is used for handling client-side routing.

6. **Real-time Updates:**

   - Real-time updates are implemented for both tasks and users. Data is fetched and updated at regular intervals (every 5 seconds) from the server. This ensures that the user always has access to the latest data.
     Data Fetching and Storage:

     Both the Users and Tasks components use custom hooks, useUserData and useTaskData, to fetch data from the API endpoints. These hooks also store data in the local storage and set up periodic data fetching.

7. **Create, Read, Update, Delete (CRUD):**

   - The application supports CRUD operations for both tasks and users. Users can create new tasks and users, read existing data, update information, and delete records. These operations are performed via API endpoints and reflected in the UI. please check the API documentation in the backend end README.md file.

8. **User-Friendly Interface:**
   - The user interface is designed to be user-friendly with intuitive actions. Users can edit and delete tasks and users from within the DataGrid component. Additionally, modals are used for creating and editing tasks and users.

**Advantages of the Choices Made:**

1. **MERN Stack:**

   - The MERN stack is well-suited for building web applications, providing a full-stack solution with a unified language (JavaScript/TypeScript) for both the frontend and backend.
   - MongoDB, a NoSQL database, is flexible and can handle unstructured data like task descriptions.

2. **MVC Pattern:**

   - The use of the MVC pattern promotes code organization, separation of concerns, and maintainability.

3. **Real-time Updates:**

   - Real-time updates ensure that users always have access to the most up-to-date information, enhancing the user experience.

4. **Modular and Reusable Components:**

   - React's component-based architecture makes it easy to create reusable UI components, resulting in a more maintainable and efficient codebase.

5. **Third-Party Libraries:**

   - Using libraries like Material-UI, Chakra UI, Axios, and React Router allows for quicker development and access to pre-built UI components.

6. **Client-Side Routing:**

   - Client-side routing provided by React Router ensures a smoother and more responsive user experience.

7. **CRUD Operations:** The use of RESTful API endpoints and controllers follows a standard and clean approach to handling CRUD operations.

8. **Local Storage Caching:** The project caches data in the local storage, improving performance by reducing unnecessary API calls.
   Overall, the CRIO Task Manager project combines modern technologies, best practices, and user-friendly design to provide a robust task management solution.
