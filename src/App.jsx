import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contex/AppProvider.jsx";
import Menubar from "./components/Menubar/Menubar.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import MealPlanner from "./pages/mealplanner/MealPlanner.jsx";
import Profile from "./pages/profile/Profile.jsx";
import AIAssistant from "./pages/aiAssistant/AIAssistant.jsx";
import Recipes from "./pages/recipes/Recipes.jsx";
import NotFound from "./pages/Default/NotFound.jsx";

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Menubar />
                <main className="min-h-screen w-full overflow-x-hidden bg-white pt-[68px]">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/meal-planner" element={<MealPlanner />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/ai-assistant" element={<AIAssistant />} />
                        <Route path="/recipes" element={<Recipes />} />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;