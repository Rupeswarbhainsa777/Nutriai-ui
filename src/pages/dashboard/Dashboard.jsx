import {useEffect, useState} from "react";
import {getWeeklyView} from "../../service/MealPlanner.js";

const Dashboard = () => {
    let mealPlanId = localStorage.getItem("mealPlanId");
    let id = Number(mealPlanId);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getWeeklyView(id);
                setData(response.data || response);
            } catch (err) {
                console.error("Error fetching weekly view:", err);
                setError("Failed to load your weekly meal plan. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);
    console.log(data)
    const today = new Date().toISOString().split("T")[0];
    console.log(today);

    return (

        <div>
            {data?.days?.map((item, idx) =>
                item.date === today ? (
                    <div key={idx} className="space-y-3">

                        <div className="bg-yellow-50 p-3 rounded-lg border">
                            <h3>{item.breakfast?.name || "Breakfast not assigned"}</h3>
                        </div>

                        <div className="bg-green-50 p-3 rounded-lg border">
                            <h3>{item.lunch?.name || "Lunch not assigned"}</h3>
                        </div>

                        <div className="bg-orange-50 p-3 rounded-lg border">
                            <h3>{item.snack?.name || "Snack not assigned"}</h3>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg border">
                            <h3>{item.dinner?.name || "Dinner not assigned"}</h3>
                        </div>

                    </div>
                ) : null
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data?.days?.map((day, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded-xl shadow border border-gray-100"
                    >
                        <h3 className="font-semibold text-gray-700">
                            {new Date(day.date).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                            })}
                        </h3>

                        <p className="text-2xl font-bold text-green-600 mt-2">
                            {day.totalCalories}
                        </p>

                        <p className="text-sm text-gray-500">Calories</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Dashboard;