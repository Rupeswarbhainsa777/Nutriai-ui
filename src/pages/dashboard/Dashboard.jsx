import { useEffect, useState } from "react";
import { getWeeklyView } from "../../service/MealPlanner.js";

import {userDetails} from "../../service/User.js";

const UserData = ()=>{

    const [userData, setUserData] = useState(null);
    const responseId = localStorage.getItem("userId");
    const id = Number(responseId)
    const defaultUser = {
        name: "N/A",
        goal: "N/A",
        dietaryRestrictions: "N/A",
    };
    useEffect(() => {
        userDetails({ id }).then((data) => {
            setUserData(data);
        }).catch((error) => {
            console.error("Error fetching user details:", error);
            setUserData(defaultUser)
        });
    }, [id]);

    return (
        <div>
            <h1>Hii {userData?.name}</h1>
            <h1>Goal {userData?.goal}</h1>
            <span className="text-gray-900">{userData?.dietaryRestrictions}</span>
        </div>
    );
















}















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

    const today = new Date().toISOString().split("T")[0];

    return (
        <div>
            <UserData />

            <div>
                {data?.days?.map((item, idx) =>
                    item.date === today ? (
                        <div key={idx}>
                            <div>
                                <h3>{item.breakfast?.name || "Breakfast not assigned"}</h3>
                                <h4>Breakfast 7:30 AM</h4>
                                <h4>{item.breakfast?.calories || 0} kcal</h4>
                            </div>

                            <div>
                                <h3>{item.lunch?.name || "Lunch not assigned"}</h3>
                                <h4>Lunch 12:00 PM</h4>
                                <h4>{item.lunch?.calories || 0} kcal</h4>
                            </div>

                            <div>
                                <h3>{item.snack?.name || "Snack not assigned"}</h3>
                                <h4>Snack 4:00 PM</h4>
                                <h4>{item.snack?.calories || 0} kcal</h4>
                            </div>

                            <div>
                                <h3>{item.dinner?.name || "Dinner not assigned"}</h3>
                                <h4>Dinner 8:00 PM</h4>
                                <h4>{item.dinner?.calories || 0} kcal</h4>
                            </div>
                        </div>
                    ) : null
                )}
            </div>

            <div>
                {data?.days?.map((day, index) => (
                    <div key={index}>
                        <h3>
                            {new Date(day.date).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                            })}
                        </h3>

                        <p>{day.totalCalories}</p>
                        <p>Calories</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;