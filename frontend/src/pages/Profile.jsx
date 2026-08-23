import "./Profile.css";

import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";

import {
    Camera,
    Mail,
    Phone,
    MapPin,
    Calendar,
    User,
    HeartPulse,
} from "lucide-react";

const Profile = () => {

    
    const [isEditing, setIsEditing] = useState(false);

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        bloodGroup: "",
        address: "",
        avatar: "",
    });

   

    const handleChange = (e) => {

        setUser({

            ...user,

            [e.target.name]: e.target.value,

        });

    };

    const handleSave = () => {

        // Backend API call yaha hogi

        console.log(user);

        alert("Profile Updated Successfully");

        setIsEditing(false);

    };

    useEffect(() => {

        // Backend se baad me data aayega

        setUser({

            name: "Rakesh Prajapat",

            email: "rakesh@gmail.com",

            phone: "+91 7231942192",

            gender: "Male",

            dob: "20 June 2005",

            bloodGroup: "B+",

            address: "Jaipur, Rajasthan",

            avatar: "https://i.pravatar.cc/250",

        });

    }, []);

 return (

    <DashboardLayout user={user}>

        <div className="profile-page">

            <div className="profile-header">

                <h1>My Profile</h1>

                <p>
                    Manage your personal healthcare information.
                </p>

            </div>

            <div className="profile-container">

                {/* Left Card */}

                <div className="profile-card">

                    <div className="profile-image">

                        <img
                            src={user.avatar}
                            alt="profile"
                        />

                        <button>
                            <Camera size={18} />
                        </button>

                    </div>

                    <h2>{user.name}</h2>

                    <p>{user.email}</p>

                    <span className="profile-badge">
                        Patient
                    </span>

                </div>

                {/* Right Card */}

                <div className="profile-details">

                    <h2>Personal Information</h2>

                    <div className="profile-grid">

                        <div className="profile-field">

                            <label>Full Name</label>

                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                disabled={!isEditing}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="profile-field">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                disabled={!isEditing}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="profile-field">

                            <label>Phone</label>

                            <input
                                type="text"
                                name="phone"
                                value={user.phone}
                                disabled={!isEditing}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="profile-field">

                            <label>Gender</label>

                            <input
                                type="text"
                                name="gender"
                                value={user.gender}
                                disabled={!isEditing}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="profile-field">

                            <label>Date of Birth</label>

                            <input
                                type="text"
                                name="dob"
                                value={user.dob}
                                disabled={!isEditing}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="profile-field">

                            <label>Blood Group</label>

                            <input
                                type="text"
                                name="bloodGroup"
                                value={user.bloodGroup}
                                disabled={!isEditing}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="profile-field full-width">

                            <label>Address</label>

                            <input
                                type="text"
                                name="address"
                                value={user.address}
                                disabled={!isEditing}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="profile-actions">

                        {isEditing ? (

                            <button
                                className="save-btn"
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>

                        ) : (

                            <button
                                className="edit-btn"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>

                        )}

                    </div>

                </div>

            </div>

        </div>

    </DashboardLayout>

);
};

export default Profile;