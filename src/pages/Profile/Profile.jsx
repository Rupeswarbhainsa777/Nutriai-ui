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
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto">

                {/* ── Decorative Header ── */}
                <div className="relative overflow-hidden rounded-lg p-8 mb-6 text-center bg-gray-900">
                    <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/[0.03] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/[0.03] pointer-events-none" />

                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-gray-900 bg-gray-100 border border-gray-200">
                        {user?.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>

                    <h1 className="text-xl font-bold text-white mb-1">
                        {user?.name || "Loading..."}
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Manage and view your personal information
                    </p>
                </div>

                {/* Profile Card */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    {user ? (
                        <div>
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
                                <span className="w-1 h-5 rounded-full bg-gray-900"/>
                                <h2 className="text-sm font-semibold text-gray-900">
                                    Personal Information
                                </h2>
                            </div>

                            <div className="divide-y divide-gray-100">
                                <ProfileRow label="Name" value={user.name} icon="👤" />
                                <ProfileRow label="Email" value={user.email} icon="✉️" />
                                <ProfileRow label="Goal" value={user.goal} icon="🎯" />
                                <ProfileRow
                                    label="Dietary Restrictions"
                                    value={user.dietaryRestrictions}
                                    icon="🥗"
                                />
                                <ProfileRow
                                    label="Height"
                                    value={`${user.height} cm`}
                                    icon="📏"
                                />
                                <ProfileRow
                                    label="Weight"
                                    value={`${user.weight} kg`}
                                    icon="⚖️"
                                />
                                <ProfileRow label="Age" value={user.age} icon="🎂" />
                            </div>
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin mx-auto mb-4" />
                            <p className="text-gray-500 text-sm">Loading profile...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProfileRow = ({ label, value, icon }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 hover:bg-gray-50 transition-colors duration-150 group">
            <span className="text-sm font-medium text-gray-500 mb-1 sm:mb-0 flex items-center gap-2">
                <span className="text-sm opacity-60 group-hover:opacity-100 transition-opacity duration-150">{icon}</span>
                {label}
            </span>

            <span className="text-sm text-gray-900 font-medium break-words">
                {value}
            </span>
        </div>
    );
};

export default Profile;