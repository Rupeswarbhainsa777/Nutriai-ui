import "./profile.css";
import { useEffect, useState } from "react";
import { userDetails } from "../../service/User.js";

const Profile = () => {
    const [user, setUser] = useState(null);
    const responseId = localStorage.getItem("userId");
    const id = Number(responseId);

    console.log(id);

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
        userDetails({ id })
            .then((data) => {
                setUser(data);
            })
            .catch((error) => {
                console.error("Error fetching user details:", error);
                setUser(defaultUser);
            });
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-semibold text-gray-900">
                        Profile
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Manage and view your personal information
                    </p>
                </div>

                {/* Profile Card */}
                <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                    {user ? (
                        <div>
                            <div className="px-6 py-5 border-b border-gray-200">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Personal Information
                                </h2>
                            </div>

                            <div className="divide-y divide-gray-200">
                                <ProfileRow label="Name" value={user.name} />
                                <ProfileRow label="Email" value={user.email} />
                                <ProfileRow label="Goal" value={user.goal} />
                                <ProfileRow
                                    label="Dietary Restrictions"
                                    value={user.dietaryRestrictions}
                                />
                                <ProfileRow
                                    label="Height"
                                    value={`${user.height} cm`}
                                />
                                <ProfileRow
                                    label="Weight"
                                    value={`${user.weight} kg`}
                                />
                                <ProfileRow label="Age" value={user.age} />
                            </div>
                        </div>
                    ) : (
                        <div className="py-16 text-center text-gray-500">
                            Loading...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProfileRow = ({ label, value }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-5 hover:bg-gray-50 transition-colors duration-200">
            <span className="text-sm font-medium text-gray-600 mb-1 sm:mb-0">
                {label}
            </span>

            <span className="text-sm text-gray-900 font-medium break-words">
                {value}
            </span>
        </div>
    );
};

export default Profile;