import {useEffect, useState} from "react";
import {deleteEntry, deleteMealPlan, getMealPlanById} from "../../service/MealPlanner";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";

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


    useEffect(() => {
        loading();
    }, [myId]);

    if (!details) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-semibold text-green-600">
                    Meal plan has been removed.
                </h1>

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
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto">
                {/* Meal Plan Header */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Meal Plan Details
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <span className="font-semibold text-gray-700">
                                Plan ID:
                            </span>{" "}
                            {details.id}
                        </div>

                        <div>
                            <span className="font-semibold text-gray-700">
                                Week Start Date:
                            </span>{" "}
                            {details.weekStartDate}
                        </div>
                    </div>
                    <button
                        onClick={mealPlaneDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition duration-200 shadow-md hover:shadow-lg"
                    >
                        Delete
                    </button>
                </div>

                {/* Entries */}
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Meal Entries
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {details.entries.map((entry) => (
                        <div
                            key={entry.id}
                            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition duration-300"
                        >
                            <div className="space-y-2">
                                <p>
                                    <span className="font-semibold text-gray-700">
                                        Entry ID:
                                    </span>{" "}
                                    {entry.id}
                                </p>

                                <p>
                                    <span className="font-semibold text-gray-700">
                                        Meal Date:
                                    </span>{" "}
                                    {entry.mealDate}
                                </p>

                                <p>
                                    <span className="font-semibold text-gray-700">
                                        Meal Type:
                                    </span>{" "}
                                    <span
                                        className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                        {entry.mealType}
                                    </span>
                                </p>

                                <div className="border-t pt-3 mt-3">
                                    <p>
                                        <span className="font-semibold text-gray-700">
                                            Recipe ID:
                                        </span>{" "}
                                        {entry.recipe.id}
                                    </p>

                                    <p>
                                        <span className="font-semibold text-gray-700">
                                            Recipe Name:
                                        </span>{" "}
                                        {entry.recipe.name}
                                    </p>
                                </div>
                            </div>
                            <button

                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
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