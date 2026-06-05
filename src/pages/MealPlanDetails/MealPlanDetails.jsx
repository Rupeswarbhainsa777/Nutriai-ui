import {useEffect, useState} from "react";
import {
    getMealPlanById,
    // getMealPlanEntries,
    // deleteEntry,
    // deleteMealPlan,
} from "../../service/MealPlanner";

const MealPlanDetails = () => {
    let myId = 22;
    const [details, setDetails] = useState(null);

    const loading = async () => {
        try {
            const result = await getMealPlanById(myId);
            setDetails(result);
        } catch (e) {
            console.log(e)
        }

    }
    useEffect(() => {
        loading();
    }, [myId])
    console.log(details);
    if (!details) {
        return <h1>Loading...</h1>;
    }
    return (
        <div>
            <h2>Id : { details.id }</h2>
            <h2>weekStartDate : {details.weekStartDate}</h2>

            {
                details.entries.map((entry, index) => (
                    <div key={index}>
                        <h2>id:{entry.id}</h2>
                        <h2>mealDate:{entry.mealDate}</h2>
                        <h2>mealType:{entry.mealType}</h2>
                        <h2>recipe id :{entry.recipe.id}</h2>
                        <h2>recipe id :{entry.recipe.name}</h2>
                    </div>
                ))

            }



        </div>
    );
};

export default MealPlanDetails;