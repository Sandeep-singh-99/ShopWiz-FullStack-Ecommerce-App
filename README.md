# 🛍️ ShopWiz - Full-Stack E-commerce App

ShopWiz is a powerful and scalable full-stack e-commerce web application built with the MERN stack. It features secure user authentication, product management, real-time cart, Paytm payment integration, and modern UI/UX using Ant Design.

---


  <img src="./screenshot/Screenshot%202025-10-02%20090040.png" alt="image1" />
  <img src="./screenshot/Screenshot%202025-10-02%20090225.png" alt="image2" width="400"/>



  <img src="./screenshot/Screenshot%202025-10-02%20090858.png" alt="image3" />
  <img src="./screenshot/Screenshot%202025-10-02%20090918.png" alt="image4" />



## ✨ Features

- 🛒 User-friendly e-commerce interface with dynamic product listing and search
- 🔍 Search products by name, category, and price range with instant results
- 🔐 JWT-based authentication using HTTP-only cookies and bcrypt
- 🧑‍💼 Admin panel to manage products and users
- 📦 Cart and order management with persistent state
- 💳 Integrated Paytm payment gateway for secure transactions
- ☁️ Image uploads via ImageKit (Cloudinary supported too)
- ⚡ Performance optimized with clustering and Node.js cache
- 🛡️ Rate limiting and CORS protection for security
- 🎨 Responsive UI with Ant Design + TailwindCSS
- 📦 Backend APIs with Express and MongoDB

---

## 🛠️ Tech Stack

### 📌 Frontend
- **React** with **Vite**
- **Redux Toolkit** & **React-Redux**
- **React Router DOM**
- **Ant Design** (AntD)
- **Tailwind CSS**
- **Axios** (with interceptors)
- **Search UI** with filters and Ant Design components

### 📌 Backend
- **Node.js**, **Express.js**
- **MongoDB** with **Mongoose**
- **JWT + HTTP-only Cookies** for secure auth
- **bcrypt.js** for password hashing
- **Paytm Payment Gateway**
- **Multer** for image/file uploads
- **Node Cache**, **Express Rate Limit**
- **CORS**, **Helmet** for security
- **Cluster** for multi-core performance
- **Search API** supporting keywords, category filters, and pagination


## 🔍 Search Functionality

- Search products by **keywords** (e.g., "iPhone")  
- Filter by **category, price, and availability**  
- Pagination for large product lists  
- Optimized **MongoDB queries with indexes** for faster search  

**Example API endpoint:**

```http
GET /api/products/search?keyword=iphone&category=electronics&page=1&limit=20
```

### ☁️ Services & Env Variables
```env
PORT=
MONGO_URI=your_mongodb_uri
JWT_SECRET_TOKEN=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_secret
IMAGEKIT_URL_ENDPOINT=your_imagekit_url
PAYTM_MERCHANT_ID=your_paytm_id
PAYTM_MERCHANT_KEY=your_paytm_key
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
