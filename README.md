# SmartBooking

<img src="https://raw.githubusercontent.com/carlosxjm/smart-booking/main/public/images/project-screenshot.jpg">

## Introduction:

The purpose of this project is to provide a solution for managing bookings, as part of a technical test for a job application.

## Project Organization:

The project is organized into two main modules: "property" and "bookings". This structure was chosen to facilitate scalability, allowing new features and functionalities to be added in a modular and organized manner.

To manage the global state of the application, useReducer along with useContext from React were used. This combination provides an efficient means of managing shared state between components, ensuring consistent and centralized updates.

## Tooling:

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [React Router](https://reactrouter.com/en/main): Library for managing routes in a React application.
- [React Hook Form](https://react-hook-form.com/): Library for managing forms in React efficiently.
- [React Datepicker](https://reactdatepicker.com/): A flexible and customizable date picker component for React applications, enabling users to select dates easily.
- [Vite](https://vitejs.dev/): A project starter tool that provides a fast development environment and optimized build for modern web applications.
- [Vitest](https://vitest.dev/): Tool for unit testing in Vite projects.
- [React Testing Library](https://testing-library.com/): Testing library for React that encourages good testing practices.

## Requirements:

The dependencies required to run the project locally are:

- Node.js
- npm (or Yarn, if preferred)

## Instructions to Run the Project:

To run the project locally, follow the steps below:

1. Clone the GitHub repository: `https://github.com/carlosxjm/smart-booking`
2. Install project dependencies using the command `npm install`.
3. Run the project with the command `npm start`.
4. Access the application in your browser using the provided local address.

## Running the Project with Docker:

If you prefer, you can run the project using Docker and Docker Compose. To do this, follow the steps below:

1. Make sure you have Docker and Docker Compose installed on your system.
2. Clone the GitHub repository: `https://github.com/carlosxjm/smart-booking`
3. Navigate to the cloned project directory.
4. Run the command `docker-compose up -d` to build and start Docker containers in the background.
5. Access the application in your browser using the provided local address.
