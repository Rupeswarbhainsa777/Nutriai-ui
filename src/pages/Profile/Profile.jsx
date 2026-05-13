import "./profile.css";
import { useEffect, useState } from "react";
import { userDetails } from "../../service/User.js";

const Profile = () => {
    const [user, setUser] = useState(null);
    const id = 1; // Replace with dynamic user id if needed
    const defaultUser = {
        name: "N/A",
        email: "N/A",
        goal: "N/A",
        dietaryRestrictions: "N/A",
        height: "N/A",
        weight: "N/A",
        age: "N/A",
    };
    useEffect(() => {
        userDetails({ id }).then((data) => {
            setUser(data);
        }).catch((error) => {
            console.error("Error fetching user details:", error);
            setUser(defaultUser)
        });
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 border-b-4 border-indigo-500 pb-4">
                    Profile
                </h1>

                {user ? (
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-indigo-50 hover:border-indigo-400 transition duration-300">
                            <span className="font-semibold text-gray-600">Name:</span>
                            <span className="text-gray-900">{user.name}</span>
                        </div>

                        <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-indigo-50 hover:border-indigo-400 transition duration-300">
                            <span className="font-semibold text-gray-600">Email:</span>
                            <span className="text-gray-900">{user.email}</span>
                        </div>

                        <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-indigo-50 hover:border-indigo-400 transition duration-300">
                            <span className="font-semibold text-gray-600">Goal:</span>
                            <span className="text-gray-900">{user.goal}</span>
                        </div>

                        <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-indigo-50 hover:border-indigo-400 transition duration-300">
                            <span className="font-semibold text-gray-600">Dietary Restrictions:</span>
                            <span className="text-gray-900">{user.dietaryRestrictions}</span>
                        </div>

                        <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-indigo-50 hover:border-indigo-400 transition duration-300">
                            <span className="font-semibold text-gray-600">Height:</span>
                            <span className="text-gray-900">{user.height} cm</span>
                        </div>

                        <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-indigo-50 hover:border-indigo-400 transition duration-300">
                            <span className="font-semibold text-gray-600">Weight:</span>
                            <span className="text-gray-900">{user.weight} kg</span>
                        </div>

                        <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-indigo-50 hover:border-indigo-400 transition duration-300">
                            <span className="font-semibold text-gray-600">Age:</span>
                            <span className="text-gray-900">{user.age}</span>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-lg py-10">
                        Loading...
                    </p>
                )}
            </div>
        </div>
    );
};

export default Profile;