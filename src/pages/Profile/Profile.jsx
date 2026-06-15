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
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white py-10 px-4">
            <div className="max-w-3xl mx-auto">

                {/* ── Decorative Header ── */}
                <div className="relative overflow-hidden rounded-3xl p-8 mb-8 text-center shadow-[0_4px_6px_rgba(0,0,0,0.02),0_12px_40px_rgba(34,197,94,0.12)]"
                     style={{background: "linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #15803d 100%)"}}>
                    <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/8 blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/8 blur-xl pointer-events-none" />

                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-green-700 shadow-lg border-4 border-white/20"
                         style={{background: "linear-gradient(135deg, #f0fdf4, #dcfce7)"}}>
                        {user?.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-1"
                        style={{fontFamily: "'Playfair Display', Georgia, serif"}}>
                        {user?.name || "Loading..."}
                    </h1>
                    <p className="text-green-100/70 text-sm">
                        Manage and view your personal information
                    </p>
                </div>

                {/* Profile Card */}
                <div className="bg-white border border-stone-100/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02),0_8px_32px_rgba(0,0,0,0.04)]">
                    {user ? (
                        <div>
                            <div className="px-7 py-5 border-b border-stone-100 flex items-center gap-2.5">
                                <span className="w-1 h-5 rounded-full bg-gradient-to-b from-green-400 to-green-600"/>
                                <h2 className="text-base font-bold text-stone-800">
                                    Personal Information
                                </h2>
                            </div>

                            <div className="divide-y divide-stone-50">
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
                            <div className="w-10 h-10 rounded-full border-[3px] border-green-100 border-t-green-500 animate-spin mx-auto mb-4" />
                            <p className="text-stone-400 text-sm">Loading profile...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProfileRow = ({ label, value, icon }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-7 py-5 hover:bg-stone-50/60 transition-colors duration-300 group">
            <span className="text-sm font-medium text-stone-400 mb-1 sm:mb-0 flex items-center gap-2">
                <span className="text-base opacity-60 group-hover:opacity-100 transition-opacity duration-200">{icon}</span>
                {label}
            </span>

            <span className="text-sm text-stone-800 font-semibold break-words">
                {value}
            </span>
        </div>
    );
};

export default Profile;