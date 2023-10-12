# **CRIO Task Manager API Documentation**

The CRIO Task Manager API provides endpoints for managing tasks and users. This documentation outlines the available routes and how to use them. The API is built using Express and MongoDB.

## **Base URL**

- The base URL for the API is `http://localhost:3001/` when running locally. For a deployed version, the base URL would be different, depending on the hosting platform.

## **Authentication**

- This API does not include authentication.

---

## **Users**

### **Create User**

- **URL:** `/api/users/create`
- **Method:** `POST`
- **Request Body:**

```json
{
  "username": "User's Name"
}
```

- **Success Response:**
  - **Code:** `201 Created`
  - **Response Body:**

```json
{
  "message": "User Created Successfully!!!",
  "users": {
    "_id": "User's ID",
    "username": "User's Name"
  }
}
```

- **Error Response:**
  - **Code:** `500 Internal Server Error`
  - **Response Body:**

```json
{
  "error": "Error Message"
}
```

### **Read All Users**

- **URL:** `/api/users/`
- **Method:** `GET`
- **Success Response:**
  - **Code:** `200 OK`
  - **Response Body:**

```json
{
  "message": "Users Found",
  "users": [
    {
      "_id": "User's ID",
      "username": "User's Name"
    }
    // More Users...
  ]
}
```

- **Error Response:**
  - **Code:** `404 Not Found`
  - **Response Body:**

```json
{
  "message": "No users found!!!!"
}
```

### **Read Single User**

- **URL:** `/api/users/:userId`
- **Method:** `GET`
- **URL Parameters:**
  - `userId`: The ID of the user you want to retrieve.
- **Success Response:**
  - **Code:** `200 OK`
  - **Response Body:**

```json
{
  "message": "User Found",
  "user": {
    "_id": "User's ID",
    "username": "User's Name"
  }
}
```

- **Error Response:**
  - **Code:** `404 Not Found`
  - **Response Body:**

```json
{
  "message": "No user found!!!!"
}
```

### **Update User**

- **URL:** `/api/users/:userId`
- **Method:** `PATCH`
- **URL Parameters:**
  - `userId`: The ID of the user you want to update.
- **Request Body:**

```json
{
  "username": "Updated User's Name"
}
```

- **Success Response:**
  - **Code:** `200 OK`
  - **Response Body:**

```json
{
  "message": "User Updated Successfully",
  "updatedUser": {
    "_id": "User's ID",
    "username": "Updated User's Name"
  }
}
```

- **Error Response:**
  - **Code:** `404 Not Found`
  - **Response Body:**

```json
{
  "message": "No user with that Id exists"
}
```

- **Error Response:**
  - **Code:** `500 Internal Server Error`
  - **Response Body:**

```json
{
  "error": "Error Message"
}
```

### **Delete User**

- **URL:** `/api/users/:userId`
- **Method:** `DELETE`
- **URL Parameters:**
  - `userId`: The ID of the user you want to delete.
- **Success Response:**
  - **Code:** `200 OK`
  - **Response Body:**

```json
{
  "message": "User deleted successfully",
  "result": {
    "_id": "User's ID",
    "username": "User's Name"
  }
}
```

- **Error Response:**
  - **Code:** `404 Not Found`
  - **Response Body:**

```json
{
  "message": "User not found"
}
```

- **Error Response:**
  - **Code:** `500 Internal Server Error`
  - **Response Body:**

```json
{
  "error": "Error Message"
}
```

---

## **Tasks**

### **Create Task**

- **URL:** `/api/tasks/create`
- **Method:** `POST`
- **Request Body:**

```json
{
  "name": "Task Name",
  "description": "Task Description",
  "assignee": "User's ID",
  "status": "Task Status",
  "category": "Task Category"
}
```

- **Success Response:**
  - **Code:** `201 Created`
  - **Response Body:**

```json
{
  "message": "Task Created Successfully!!!",
  "createdTask": {
    "_id": "Task's ID",
    "name": "Task Name",
    "description": "Task Description",
    "assignee": "User's ID",
    "status": "Task Status",
    "category": "Task Category"
  }
}
```

- **Error Response:**
  - **Code:** `500 Internal Server Error`
  - **Response Body:**

```json
{
  "error": "Error Message"
}
```

### **Read All Tasks**

- **URL:** `/api/tasks/`
- **Method:** `GET`
- **Success Response:**
  - **Code:** `200 OK`
  - **Response Body:**

```json
{
  "message": "All tasks Found",
  "tasks": [
    {
      "_id": "Task's ID",
      "name": "Task Name",
      "description": "Task Description",
      "assignee": {
        "_id": "User's ID",
        "username": "User's Name"
      },
      "status": "Task Status",
      "category": "Task Category"
    }
    // More Tasks...
  ]
}
```

- **Error Response:**
  - **Code:** `404 Not Found`
  - **Response Body:**

```json
{
  "message": "No tasks found!!!!"
}
```

### **Read Single Task**

- **URL:** `/api/tasks/:taskId`
- **Method:** `GET`
- **URL Parameters:**
  - `taskId`: The ID of the task you want to retrieve.
- **Success Response:**
  - **Code:** `200 OK`
  - **Response Body:**

```json
{
  "message": "Task Found",
  "task": {
    "_id": "Task's ID",
    "name": "Task Name",
    "description": "Task Description",
    "assignee": {
      "_id": "User's ID",
      "username": "User's Name"
    },
    "status": "Task Status",
    "category": "Task Category"
  }
}
```

- **Error Response:**
  - **Code:** `404 Not Found`
  - **Response Body:**

```json
{
  "message": "No task found!!!!
  }
```
