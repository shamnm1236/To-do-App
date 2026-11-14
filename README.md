# To-Do List App (MongoDB, Express, React Native, Node.js)

```
todo-app/
├── backend/
│   ├── server.js            # Express app + MongoDB connection
│   ├── models/Todo.js       # Mongoose schema
│   └── routes/todos.js      # CRUD routes
└── frontend/                # Expo (React Native)
    ├── App.js
    └── src/
        ├── config.js        # API base URL
        ├── theme.js
        ├── api/todoApi.js   # fetch wrappers
        ├── pages/HomePage.js
        └── components/      # TodoForm, TodoItem, TodoList
```

## API

| Method | Route            | Body                         | Purpose        |
|--------|------------------|------------------------------|----------------|
| POST   | /api/todos       | `{ title }`                  | Create         |
| GET    | /api/todos       |                              | Read all       |
| GET    | /api/todos/:id   |                              | Read one       |
| PUT    | /api/todos/:id   | `{ title?, completed? }`     | Update         |
| DELETE | /api/todos/:id   |                              | Delete         |

## Run it

### 1. Backend
Make sure MongoDB is running locally (or use a MongoDB Atlas URI).

```bash
cd backend
npm install
cp .env.example .env     # edit MONGO_URI if needed
npm run dev              # http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npx expo install --fix   # aligns package versions with your Expo SDK
npx expo start
```
Press `a` (Android emulator), `i` (iOS simulator), or scan the QR code with Expo Go.

**Using a real phone?** Open `frontend/src/config.js` and set `OVERRIDE_URL` to
`http://<your-computer-LAN-IP>:5000`. Phone and computer must be on the same Wi-Fi.
