import './App.css'
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import {AppProvider} from "./contex/AppProvider.jsx";
import Menubar from "./components/Menubar/Menubar.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import MealPlanner from "./pages/mealplanner/MealPlanner.jsx";
import Profile from "./pages/profile/Profile.jsx";
import AIAssistant from "./pages/aiAssistant/AIAssistant.jsx";
import Recipes from "./pages/recipes/Recipes.jsx";
import NotFound from "./pages/Default/NotFound.jsx";
import Login from "./pages/Login/Login.jsx";
import Registration from "./pages/Registration/Registration.jsx";
import Weeklymealplan from "./pages/WeeklyMealPlan/Weeklymealplan.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddOrUpdateEntry from "./pages/AddOrUpdateEntry/AddOrUpdateEntry.jsx";
import MealPlanDetails from "./pages/MealPlanDetails/MealPlanDetails.jsx";
import MealPlanEntries from "./pages/MealPlanEntries/MealPlanEntries.jsx";
import Admin from "./pages/Admin/TestingPage.jsx";
import MealPlannerCombined from "./pages/MealPlannerCombined/MealPlannerCombined.jsx";


function AppContent() {
    const location = useLocation();

    const isAuthPage =
        location.pathname === "/login" ||
        location.pathname === "/reg" ||
        location.pathname === "/";

    const showFullNav = !isAuthPage;

    return (
        <>
            <Menubar/>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            {/* pt-[68px] only applied when full navbar is visible so login/reg are full-screen */}
            <main
                className={`w-full overflow-x-hidden${
                    showFullNav ? " pt-[68px] min-h-[calc(100vh-68px)]" : " min-h-screen"
                }`}
            >
                <Routes>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/meal-planner" element={<MealPlanner/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/ai-assistant" element={<AIAssistant/>}/>
                    <Route path="/recipes" element={<Recipes/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/reg" element={<Registration/>}/>
                    <Route path="/weeklyplan" element={<Weeklymealplan/>}/>
                    <Route path="/addentry" element={<AddOrUpdateEntry/>}/>
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/mealplandetails" element={<MealPlanDetails />} />
                    <Route path="/entries" element={<MealPlanEntries />} />
                    <Route path="/combined" element={<MealPlannerCombined />} />

                    <Route path="/*" element={<NotFound/>}/>
                </Routes>
            </main>
        </>
    );
}

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <AppContent/>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;