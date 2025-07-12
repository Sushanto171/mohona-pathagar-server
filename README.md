
# 📚 Mohona Pathagar - Library Management API

A Library Management REST API built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**. This project allows managing book inventories, borrowing records, and provides flexible filtering and summary features.

---

## 🚀 Features

- Create, Read, Update, and Delete (CRUD) for books
- Borrow books with availability control
- Aggregated summary of borrowed books
- Filtering and sorting books
- Schema validations and custom error handling
- Business logic enforcement using Mongoose middleware and static/instance methods
- Structured and modular code using Feature-Based Architecture

---

## 🛠️ Technologies Used

- **Express.js** (REST API)
- **TypeScript** (Type Safety)
- **MongoDB with Mongoose** (Database & ODM)
- **Feature-based folder structure**
- **Mongoose Middleware** (pre, post hooks)
- **Aggregation Pipeline**

---

## 📁 Project Structure

```
src/
├── book/
│   ├── book.controllers.ts       # Controller functions for book routes
│   ├── book.interfaces.ts        # TypeScript interfaces for Book model
│   ├── book.model.ts             # Mongoose schema/model for Book
│   └── book.routes.ts            # Book API route definitions
│
├── borrow/
│   ├── borrow.controllers.ts     # Controller functions for borrow routes
│   ├── borrow.interfaces.ts      # TypeScript interfaces for Borrow model
│   ├── borrow.model.ts           # Mongoose schema/model for Borrow
│   └── borrow.routes.ts          # Borrow API route definitions
│
├── config/
│   └── index.ts                     # import env variables
│
├── routes/
│   └── index.ts                  # Combines all routes
│
├── app.ts                        # Express app initialization
└── server.ts                     # Server entry point
```

---

## 📦 Installation & Setup

1. Clone the repo:
    ```bash
    git clone https://github.com/Sushanto171/mohona-pathagar-server.git
    cd mohona-pathagar
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set environment variables in a `.env` file:
    ```
    PORT=5000
    DATABASE_URL=your_mongodb_connection_string
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

---

## 🔗 Live Deployment

The server is live and running at:
🌐 [https://mohona-pathagar-server.vercel.app](https://mohona-pathagar-server.vercel.app)

You can use tools like **Postman** or **Thunder Client** to test the endpoints.

---

## 🔗 API Endpoints

### 📘 Book Endpoints

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| POST   | `/api/books`          | Create a new book            |
| GET    | `/api/books`          | Get all books (with filters) |
| GET    | `/api/books/:bookId`  | Get book by ID               |
| PUT    | `/api/books/:bookId`  | Update book                  |
| DELETE | `/api/books/:bookId`  | Delete book                  |

### 📕 Borrow Endpoints

| Method | Endpoint     | Description                     |
|--------|--------------|---------------------------------|
| POST   | `/api/borrow`| Borrow a book                   |
| GET    | `/api/borrow`| Get summary of borrowed books   |

---

## 🧠 Business Logic Highlights

- **Book Availability Update**: Automatically sets `available` to `false` if copies become 0, and `true` otherwise.
- **Cascade Delete**: On deleting a book, all related borrow records are deleted automatically.

---


## 🧑‍💻 Author

**Sushanto Kumar**  
GitHub: [https://github.com/Sushanto171](https://github.com/Sushanto171)
