# Project Overview (With the help of ChatGPT)

This project involves the development of a web application with a client-side implemented using Vite and a server-side implemented using Nest. The application relies on SQLite as its database, and you can follow the instructions below to set up and run the project on your local environment.

## Technologies Used

### Client (Vite Project)

- **Vite**: Vite is a build tool that serves the client-side code. It's known for its fast development server and efficient build process.

### Server (Nest Project)

- **NestJS**: Nest is a progressive Node.js framework that provides a robust and structured application architecture for server-side development.

### Database

- **SQLite**: SQLite is a self-contained, serverless, and zero-configuration SQL database engine. In this project, it is used as the database system, and the database file is located within the Prisma folder.

## Project Setup

Follow these steps to set up and run the project on your local machine:

# Client Setup

#### Open a terminal.

#### Navigate to the client project directory:

```shell
cd client
```

#### Install dependencies using npm:

```shell
npm install
```

#### Start the client development server:

```shell
npm run dev
```

# Server Setup

#### Open another terminal.

#### Navigate to the server project directory:

```shell
cd server
```

#### Install server-side dependencies:

```shell
npm install
```

#### Generate Prisma typings (Assuming you have Prisma set up for the database):

```shell
npm run generate
```

#### Start the server in development mode:

```shell
npm run start:dev
```

# Access the Application:

With both the client and server running, you can access the application by opening a web browser and navigating to http://localhost:3000.
Please note that for the database, an SQLite database is being used, and it is located in the Prisma folder within the server project. Prisma is a powerful Object-Relational Mapping (ORM) tool for database interaction, and it handles database operations efficiently.
With these steps, you should have the client and server up and running, allowing you to access the web application via your browser. You can then begin developing and testing your project.
