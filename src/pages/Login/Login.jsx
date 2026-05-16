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
        <h1>Login</h1>
    )
}
export default Login;