# ShopWiz E-Commerce Project

## Overview
ShopWiz is a full-stack e-commerce application that allows users to browse products, add them to the cart, and make purchases. The application also includes an admin panel for managing products, users, and orders.

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **React Router**: A collection of navigational components for React applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Ant Design**: A design system for enterprise-level products.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **React Icons**: A collection of popular icons for React projects.

### Backend
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: A compact, URL-safe means of representing claims to be transferred between two parties.
- **Cloudinary**: A cloud-based service for managing images and videos.
- **Multer**: A middleware for handling `multipart/form-data`, which is primarily used for uploading files.
- **Node Cache**: A caching library for Node.js.

### DevOps and Utilities
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **cookie-parser**: A middleware to parse cookies attached to the client request object.
- **cors**: A middleware to enable Cross-Origin Resource Sharing.
- **morgan**: A HTTP request logger middleware for Node.js.
- **express-rate-limit**: A middleware to limit repeated requests to public APIs and/or endpoints.
- **cluster**: A Node.js module that allows you to create child processes that all share server ports.

## Project Structure

```
ShopWiz/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── helpers/
│   │   ├── redux/
│   │   ├── route/
│   │   ├── screen/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
│   ├── tailwind.config.js
├── server/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── router/
│   ├── .gitignore
│   ├── .env
│   ├── package.json
│   ├── server.js
├── read.md
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/ShopWiz.git
   ```
2. Navigate to the client directory and install dependencies:
   ```sh
   cd ShopWiz/client
   npm install
   ```
3. Navigate to the server directory and install dependencies:
   ```sh
   cd ../server
   npm install
   ```

### Running the Application
1. Start the backend server:
   ```sh
   cd server
   npm start
   ```
2. Start the frontend development server:
   ```sh
   cd ../client
   npm start
   ```

### Environment Variables
Create a `.env` file in the `server` directory and add the following environment variables:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET_TOKEN=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## License
This project is licensed under the MIT License.
