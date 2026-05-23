# 🥗 NutriAI UI

A modern, AI-powered nutrition web application built with **React 19**, **Vite**, and **Tailwind CSS v4**. NutriAI helps users manage their diet through intelligent meal planning, recipe discovery, and an AI nutrition assistant — all wrapped in a clean, responsive interface.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [API Services](#api-services)
- [State Management](#state-management)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Backend Integration](#backend-integration)

---

## Overview

NutriAI UI is the frontend layer of the NutriAI platform. It communicates with a Java-based Spring Boot backend running at `http://localhost:1003`. The application provides user authentication, a nutritional dashboard, recipe management (CRUD), weekly meal planning, and an AI assistant interface for personalized nutrition guidance.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | User registration and login with JWT-style form flow |
| 📊 **Dashboard** | Overview of user statistics, sales, recent orders & notifications |
| 🍽️ **Recipes** | Browse, add, update, and delete recipes via REST API |
| 📅 **Meal Planner** | Create weekly meal plans linked to a user ID and start date |
| 🤖 **AI Assistant** | Chat interface for AI-powered nutrition advice and meal suggestions |
| 👤 **Profile** | Dedicated user profile page |
| 🧭 **Responsive Navbar** | Fixed navigation with scroll-aware shadow and mobile hamburger drawer |
| 🌙 **Dark Mode Ready** | Global dark mode state managed via React Context |

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite` plugin) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Language** | JavaScript (ES Modules) |
| **Linting** | ESLint 9 with `eslint-plugin-react-hooks` & `eslint-plugin-react-refresh` |
| **Backend** | Java Spring Boot (external, runs on port `1003`) |

---

## 📁 Project Structure

```
NutriAI UI/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite + Tailwind plugin config
├── package.json
├── eslint.config.js
└── src/
    ├── main.jsx                # React app bootstrap
    ├── App.jsx                 # Root component — routing & layout
    ├── App.css
    ├── index.css
    ├── components/
    │   └── Menubar/
    │       ├── Menubar.jsx     # Fixed top navigation bar (desktop + mobile drawer)
    │       └── Menubar.css
    ├── contex/                 # Global React Context
    │   ├── AppContext.jsx      # Context object
    │   └── AppProvider.jsx     # Provider with darkMode state
    ├── pages/
    │   ├── Login/
    │   │   ├── Login.jsx
    │   │   └── Login.css
    │   ├── Registration/
    │   │   ├── Registration.jsx
    │   │   └── Registration.css
    │   ├── dashboard/
    │   │   └── Dashboard.jsx
    │   ├── recipes/
    │   │   ├── Recipes.jsx
    │   │   └── recipes.css
    │   ├── mealplanner/
    │   │   ├── MealPlanner.jsx
    │   │   └── mealplanner.css
    │   ├── aIAssistant/
    │   │   ├── AIAssistant.jsx
    │   │   └── aIAssistant.css
    │   ├── Profile/
    │   │   └── Profile.jsx
    │   └── Default/
    │       └── NotFound.jsx    # 404 fallback page
    └── service/                # API layer (fetch-based REST calls)
        ├── Auth.js             # Registration & Login
        ├── User.js             # Fetch user by ID
        ├── Recipes.js          # Full CRUD for recipes
        └── MealPlanner.js      # Create meal plans
```

---

## 🗺 Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `Login` | Default route — redirects to login |
| `/login` | `Login` | User sign-in (navbar hidden) |
| `/reg` | `Registration` | New user registration (navbar hidden) |
| `/dashboard` | `Dashboard` | Stats overview with user data, sales, orders & notifications |
| `/recipes` | `Recipes` | Browse and manage recipes |
| `/meal-planner` | `MealPlanner` | Create a weekly meal plan |
| `/ai-assistant` | `AIAssistant` | AI nutrition chat interface |
| `/profile` | `Profile` | User profile page |
| `/*` | `NotFound` | 404 catch-all |

> **Note:** The Navbar is hidden on `/`, `/login`, and `/reg` routes. All other routes render the fixed top `Menubar`.

---

## 🔌 API Services

All services live in `src/service/` and communicate with the backend base URL: `http://localhost:1003`.

### `Auth.js` — `/api/auth`
| Function | Method | Endpoint | Description |
|---|---|---|---|
| `registration(credentials)` | `POST` | `/api/auth/reg` | Register a new user |
| `loginUser(credentials)` | `POST` | `/api/auth/login` | Authenticate existing user |

### `User.js` — `/api/user`
| Function | Method | Endpoint | Description |
|---|---|---|---|
| `userDetails({ id })` | `GET` | `/api/user/:id` | Fetch user profile by ID |

### `Recipes.js` — `/api/recipe`
| Function | Method | Endpoint | Description |
|---|---|---|---|
| `getAllRecipes()` | `GET` | `/api/recipe/getall` | Fetch all recipes |
| `getRecipeById(id)` | `GET` | `/api/recipe/:id` | Fetch a single recipe |
| `addRecipe(recipeData)` | `POST` | `/api/recipe/add` | Add a new recipe |
| `updateRecipe(id, data)` | `PUT` | `/api/recipe/update/:id` | Update an existing recipe |
| `deleteRecipe(id)` | `DELETE` | `/api/recipe/delete/:id` | Delete a recipe |

### `MealPlanner.js` — `/api/meal-plan`
| Function | Method | Endpoint | Description |
|---|---|---|---|
| `createMealPlan(plan)` | `POST` | `/api/meal-plan/create` | Create a weekly meal plan |

---

## 🧠 State Management

Global state is handled via the **React Context API**:

- **`AppContext`** — Creates the context object.
- **`AppProvider`** — Wraps the entire app and exposes:
  - `darkMode` (boolean) — current theme state
  - `toggleDarkMode()` — toggle function

Access global state in any component:
```jsx
import { useContext } from "react";
import { AppContext } from "../../contex/AppContext";

const { darkMode, toggleDarkMode } = useContext(AppContext);
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+
- The NutriAI Spring Boot backend running on port `1003`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Rupeswarbhainsa777/Nutriai-ui.git
cd Nutriai-ui

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **`http://localhost:5173`** (default Vite port).

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Build the production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the codebase |

---

## 🔗 Backend Integration

The frontend expects the **NutriAI Spring Boot backend** to be running at:

```
http://localhost:1003
```

Ensure the backend server is up before launching the UI. All API calls in `src/service/` will fail with network errors if the backend is unreachable.

Key API base paths:

| Service | Base URL |
|---|---|
| Auth | `http://localhost:1003/api/auth` |
| User | `http://localhost:1003/api/user` |
| Recipes | `http://localhost:1003/api/recipe` |
| Meal Planner | `http://localhost:1003/api/meal-plan` |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is for educational and personal use. Feel free to fork and build upon it.

---

*Built with ❤️ by [Rupeswar Bhainsa](https://github.com/Rupeswarbhainsa777)*
