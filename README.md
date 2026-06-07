# 🥗 NutriAI UI

A modern, AI-powered nutrition web application built with **React 19**, **Vite 8**, and **Tailwind CSS v4**. NutriAI helps users manage their diet through intelligent meal planning, recipe discovery, weekly schedule visualization, and an AI nutrition assistant — all wrapped in a clean, responsive interface.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [API Services](#api-services)
- [State Management](#state-management)
- [Authentication Flow](#authentication-flow)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Backend Integration](#backend-integration)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

NutriAI UI is the frontend layer of the NutriAI platform. It communicates with a Java-based Spring Boot backend running at `http://localhost:1003`. The application provides user authentication (JWT-based), a nutritional dashboard, recipe management (full CRUD), weekly meal planning with a calendar-style weekly view, individual meal entry management, and an AI assistant interface for personalized nutrition guidance.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | User registration and login with JWT token stored in `localStorage` |
| 📊 **Dashboard** | Nutritional overview for the logged-in user |
| 🍽️ **Recipes** | Browse, add, update, and delete recipes via REST API |
| 📅 **Meal Planner** | Create weekly meal plans linked to a user ID and start date |
| 🗓️ **Weekly View** | Visual day-by-day calendar grid with per-day calorie totals and meal type breakdown |
| 📋 **Meal Plan Details** | View and manage all entries within a plan — delete individual entries or the entire plan |
| ➕ **Add / Update Entry** | Search recipes by name and log a meal for a specific date and type (Breakfast / Lunch / Dinner / Snack) |
| 📑 **Meal Plan Entries** | Read-only listing of all entries in a plan with recipe images and nutrition chips |
| 🤖 **AI Assistant** | Chat interface for AI-powered nutrition advice and meal suggestions |
| 👤 **Profile** | Dedicated user profile page |
| 🧭 **Responsive Navbar** | Fixed navigation with scroll-aware shadow and mobile hamburger drawer |
| 🌙 **Dark Mode Ready** | Global dark mode state managed via React Context |
| 🔔 **Toast Notifications** | Action feedback for all CRUD operations via `react-toastify` |

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite` plugin) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Notifications** | [react-toastify v11](https://fkhadra.github.io/react-toastify/) |
| **Language** | JavaScript (ES Modules) |
| **Linting** | ESLint 9 with `eslint-plugin-react-hooks` & `eslint-plugin-react-refresh` |
| **Backend** | Java Spring Boot (external, runs on port `1003`) |

---

## 📁 Project Structure

```
NutriAI UI/
├── index.html                        # HTML entry point
├── vite.config.js                    # Vite + Tailwind plugin config
├── package.json
├── eslint.config.js
└── src/
    ├── main.jsx                      # React app bootstrap
    ├── App.jsx                       # Root component — routing & layout
    ├── App.css
    ├── index.css
    ├── components/
    │   └── Menubar/
    │       ├── Menubar.jsx           # Fixed top navigation bar (desktop + mobile drawer)
    │       └── Menubar.css
    ├── contex/                       # Global React Context
    │   ├── AppContext.jsx            # Context object
    │   └── AppProvider.jsx           # Provider with darkMode state
    ├── pages/
    │   ├── Login/
    │   │   ├── Login.jsx             # User sign-in form
    │   │   └── Login.css
    │   ├── Registration/
    │   │   ├── Registration.jsx      # New user registration form
    │   │   └── Registration.css
    │   ├── dashboard/
    │   │   └── Dashboard.jsx         # User nutritional dashboard
    │   ├── recipes/
    │   │   ├── Recipes.jsx           # Browse & manage recipes (CRUD)
    │   │   └── recipes.css
    │   ├── mealplanner/
    │   │   ├── MealPlanner.jsx       # Create a new weekly meal plan
    │   │   └── mealplanner.css
    │   ├── WeeklyMealPlan/
    │   │   └── Weeklymealplan.jsx    # Day-by-day weekly calendar grid
    │   ├── MealPlanDetails/
    │   │   └── MealPlanDetails.jsx   # View/manage entries & delete plan
    │   ├── MealPlanEntries/
    │   │   └── MealPlanEntries.jsx   # Read-only card list of all entries
    │   ├── AddOrUpdateEntry/
    │   │   └── AddOrUpdateEntry.jsx  # Log a meal entry (date + type + recipe search)
    │   ├── aIAssistant/
    │   │   ├── AIAssistant.jsx       # AI nutrition chat interface
    │   │   └── aIAssistant.css
    │   ├── Profile/
    │   │   └── Profile.jsx           # User profile page
    │   ├── Default/
    │   │   └── NotFound.jsx          # 404 catch-all page
    │   └── TestingPages/
    │       └── TestingPage.jsx       # Developer sandbox page
    └── service/                      # API layer (fetch-based REST calls with JWT)
        ├── Auth.js                   # Registration & Login
        ├── User.js                   # Fetch user by ID
        ├── Recipes.js                # Full CRUD for recipes
        └── MealPlanner.js            # Full CRUD for meal plans & entries
```

---

## 🗺 Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `Login` | Default route — renders the login page |
| `/login` | `Login` | User sign-in (navbar hidden) |
| `/reg` | `Registration` | New user registration (navbar hidden) |
| `/dashboard` | `Dashboard` | User nutritional overview |
| `/recipes` | `Recipes` | Browse and manage recipes |
| `/meal-planner` | `MealPlanner` | Create a new weekly meal plan |
| `/weeklyplan` | `Weeklymealplan` | Visual weekly calendar view with calorie totals |
| `/mealplandetails` | `MealPlanDetails` | View plan metadata, manage & delete meal entries |
| `/entries` | `MealPlanEntries` | Read-only card listing of all entries with nutrition info |
| `/addentry` | `AddOrUpdateEntry` | Log a meal entry (recipe search + date + meal type) |
| `/ai-assistant` | `AIAssistant` | AI nutrition chat interface |
| `/profile` | `Profile` | User profile page |
| `/test` | `TestingPage` | Developer sandbox (hidden from navigation) |
| `/*` | `NotFound` | 404 catch-all |

> **Note:** The Navbar is hidden on `/`, `/login`, and `/reg` routes. All other routes render the fixed top `Menubar` with `padding-top: 68px` applied to the main content area.

---

## 🔌 API Services

All services live in `src/service/` and communicate with the backend base URL: `http://localhost:1003`. All requests (except Auth) include a `Bearer` token from `localStorage`.

### `Auth.js` — `/api/auth`
| Function | Method | Endpoint | Description |
|---|---|---|---|
| `registration(credentials)` | `POST` | `/api/auth/reg` | Register a new user |
| `loginUser(credentials)` | `POST` | `/api/auth/login` | Authenticate user, stores `token`, `userId`, `name`, `email` in `localStorage` |

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

### `MealPlanner.js` — `/api/meal-plans`
| Function | Method | Endpoint | Description |
|---|---|---|---|
| `createMealPlan(userId, weekStartDate)` | `POST` | `/api/meal-plans/create?userId&weekStartDate` | Create a weekly meal plan |
| `getMealPlanById(mealPlanId)` | `GET` | `/api/meal-plans/:id` | Fetch a meal plan with all its entries |
| `getMealPlanEntries(mealPlanId)` | `GET` | `/api/meal-plans/:id/entries` | Fetch all entries for a meal plan |
| `addOrUpdateEntry(mealPlanId, mealDate, mealType, recipeId)` | `POST` | `/api/meal-plans/:id/entries` | Add or update a meal entry |
| `deleteEntry(mealPlanId, mealDate, mealType)` | `DELETE` | `/api/meal-plans/:id/entries?mealDate&mealType` | Delete a specific meal entry |
| `deleteMealPlan(mealPlanId)` | `DELETE` | `/api/meal-plans/:id` | Delete an entire meal plan |
| `getWeeklyView(mealPlanId)` | `GET` | `/api/meal-plans/:id/weekly-view` | Fetch a day-by-day structured weekly view with calorie totals |

---

## 🧠 State Management

Global state is handled via the **React Context API**:

- **`AppContext`** — Creates the context object (`src/contex/AppContext.jsx`).
- **`AppProvider`** — Wraps the entire app and exposes:
  - `darkMode` (boolean) — current theme state
  - `toggleDarkMode()` — toggle function

Access global state in any component:
```jsx
import { useContext } from "react";
import { AppContext } from "../../contex/AppContext";

const { darkMode, toggleDarkMode } = useContext(AppContext);
```

Session data (user identity & active meal plan) is persisted in `localStorage`:

| Key | Description |
|---|---|
| `token` | JWT Bearer token for authenticated API requests |
| `userId` | Logged-in user's ID |
| `name` | Logged-in user's display name |
| `email` | Logged-in user's email |
| `mealPlanId` | Currently active meal plan ID (used across planner pages) |

---

## 🔐 Authentication Flow

1. User submits credentials on `/login` or registers at `/reg`.
2. On success, `loginUser()` stores `token`, `userId`, `name`, and `email` in `localStorage`.
3. All subsequent API calls in `Recipes.js` and `MealPlanner.js` read `token` from `localStorage` and attach it as `Authorization: Bearer <token>`.
4. The Navbar is hidden on auth routes (`/`, `/login`, `/reg`) to provide a clean full-screen experience.

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
| Meal Plans & Entries | `http://localhost:1003/api/meal-plans` |

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

*Built  by [Rupeswar Bhainsa](https://github.com/Rupeswarbhainsa777)*
