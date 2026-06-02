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
       <h3></h3>
    );
};

export default WeeklyMealPlan;