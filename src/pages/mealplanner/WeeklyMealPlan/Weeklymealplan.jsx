import { useEffect, useState } from "react";
import { getWeeklyView } from "../../../service/MealPlanner.js";

const WeeklyMealPlan = () => {
    const id = 22;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getWeeklyView(id);

                // if axios response -> use response.data
                setData(response.data || response);

                console.log("Weekly Data:", response.data || response);
            } catch (error) {
                console.error("Error fetching weekly view:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <h3>Loading...</h3>;
    if (!data) return <h3>No data found</h3>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Weekly Meal Plan</h2>
            <p><b>Meal Plan ID:</b> {data.mealPlanId}</p>
            <p><b>Week Start Date:</b> {data.weekStartDate}</p>

            <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
                {data.days.map((day, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            borderRadius: "10px"
                        }}
                    >
                        <h3>Date: {day.date}</h3>

                        <p><b>Breakfast:</b> {day.breakfast?.name || "Not Assigned"}</p>
                        <p><b>Lunch:</b> {day.lunch?.name || "Not Assigned"}</p>
                        <p><b>Snack:</b> {day.snack?.name || "Not Assigned"}</p>
                        <p><b>Dinner:</b> {day.dinner?.name || "Not Assigned"}</p>

                        <p style={{ marginTop: "10px" }}>
                            <b>Total Calories:</b> {day.totalCalories}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyMealPlan;