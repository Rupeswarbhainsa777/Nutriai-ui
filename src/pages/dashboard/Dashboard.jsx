import {useEffect, useState} from "react";
import {getWeeklyView} from "../../service/MealPlanner.js";

const Dashboard = () => {
    const mealPlanId = localStorage.getItem("mealPlanId");
    const id = Number(mealPlanId);
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

    return (

        <div>


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