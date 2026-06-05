import { useEffect, useState } from "react";
import {
    deleteEntry,
    deleteMealPlan,
    getMealPlanById
} from "../../service/MealPlanner";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MealPlanDetails = () => {
    const mealPlanId = localStorage.getItem("mealPlanId");
    const myId = Number(mealPlanId);
    const [details, setDetails] = useState(null);

    const loading = async () => {
        try {
            const result = await getMealPlanById(myId);
            setDetails(result);
        } catch (e) {
            console.log(e);
        }
    };

    const navigate = useNavigate();

    const mealPlaneDelete = async () => {
        try {
            await deleteMealPlan(myId);
            setDetails(null);

            localStorage.removeItem("mealPlanId");
            toast.success("Meal plan has been removed.");

            setTimeout(() => {
                navigate("/meal-planner");
            }, 1500);
        } catch (e) {
            toast.error(e.message);
        }
    };

    const deleteMealEntry = async (date, type) => {
        try {
            await deleteEntry(myId, date, type);

            toast.success("Meal entry removed.");

            await loading();
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        loading();
    }, [myId]);

    if (!details) {
        return (
            <div>
                <h1>Meal plan has been removed.</h1>

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    pauseOnHover
                />
            </div>
        );
    }

    return (
        <div>
            <h1>Meal Plan Details</h1>

            <p>
                <strong>Plan ID:</strong> {details.id}
            </p>

            <p>
                <strong>Week Start Date:</strong> {details.weekStartDate}
            </p>

            <button onClick={mealPlaneDelete}>Delete</button>

            <h2>Meal Entries</h2>

            {details.entries.map((entry) => (
                <div key={entry.id}>
                    <p>
                        <strong>Entry ID:</strong> {entry.id}
                    </p>

                    <p>
                        <strong>Meal Date:</strong> {entry.mealDate}
                    </p>

                    <p>
                        <strong>Meal Type:</strong> {entry.mealType}
                    </p>

                    <p>
                        <strong>Recipe ID:</strong> {entry.recipe.id}
                    </p>

                    <p>
                        <strong>Recipe Name:</strong> {entry.recipe.name}
                    </p>

                    <button
                        onClick={() =>
                            deleteMealEntry(
                                entry.mealDate,
                                entry.mealType
                            )
                        }
                    >
                        Remove
                    </button>
                </div>
            ))}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
            />
        </div>
    );
};

export default MealPlanDetails;