

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   (https://github.com/Saurabhdixit93/Authenticate-Project)
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file based on the provided `.env.example` and fill in the required variables.

4. Run migrations:

   ```bash
   npx sequelize-cli db:migrate
   ```

5. Start the server:

   ```bash
   npm start
   ```

## Usage

Explain how to use your application. Provide any additional setup or configuration steps if necessary.

## API Endpoints

### 1. User Registration

- **URL:** `/user/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "User Name",
    "phoneNumber": "1234567890",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - `201 Created`: User successfully registered.
  - `400 Bad Request`: Invalid request body.
  - `409 Conflict`: User with the same phone number already exists.

### 2. User Login

- **URL:** `/user/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "phoneNumber": "1234567890",
    "password": "password123"
  }
  ```
- **Response:**
  - `200 OK`: Login successful, returns authentication token.
  - `400 Bad Request`: Invalid request body.
  - `401 Unauthorized`: Invalid credentials.

### 3. Mark Number as Spam

- **URL:** `/contact/spam`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "phoneNumber": "1234567890"
  }
  ```
- **Response:**
  - `200 OK`: Number successfully marked as spam.
  - `400 Bad Request`: Invalid request body.
  - `401 Unauthorized`: Unauthorized access.

### 4. Search by Name

- **URL:** `/contact/search/name`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "John Doe"
  }
  ```
- **Response:**
  - `200 OK`: Returns matching users' details.
  - `404 Not Found`: No matching users found.
  - `401 Unauthorized`: Unauthorized access.

### 5. Search by Phone Number

- **URL:** `/contact/search/phone`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "phoneNumber": "1234567890"
  }
  ```
- **Response:**
  - `200 OK`: Returns matching users' details.
  - `404 Not Found`: No matching users found.
  - `401 Unauthorized`: Unauthorized access.

### 6. Get User Details

- **URL:** `/user/profile`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`: Returns user details.
  - `404 Not Found`: User not found.
  - `401 Unauthorized`: Unauthorized access.

