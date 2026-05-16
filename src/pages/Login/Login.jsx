import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../../service/Auth.js";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(formData);

            // Save only user information (JWT removed for now)
            localStorage.setItem("user", JSON.stringify(data.user));

            setMessage("Login successful!");

            // Redirect to dashboard
            navigate("/dashboard");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Login Page</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Login</button>
            </form>

            <p>{message}</p>

            <p>
                Don't have an account? <Link to="/reg">Register</Link>
            </p>
        </div>

    )
}
export default Login;