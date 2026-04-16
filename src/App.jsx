import './App.css'
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import MealPlanner from "./pages/mealplanner/MealPlanner.jsx";
import Profile from "./pages/profile/Profile.jsx"; // ✅ fixed folder case
import AIAssistant from "./pages/aiAssistant/AIAssistant.jsx"; // ✅ fixed naming
import Recipes from "./pages/recipes/Recipes.jsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Dashboard/>
        },
        {
            path: "/meal-planner",
            element: <MealPlanner/>
        },
        {
            path: "/profile",
            element: <Profile/>
        },
        {
            path: "/ai-assistant",
            element: <AIAssistant/>
        },
        {
            path: "/recipes",
            element: <Recipes/>
        }
    ]);

    return (
        <RouterProvider router={router}/>
    )
}

export default App;