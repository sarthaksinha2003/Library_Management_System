import React from 'react';
import { forgotPasswordService } from '../../services';
import { showToast } from "@/utils/toast";
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation


const ForgotPassword = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("newPassword");

        const input = { email, password };

        const { status, cls, msg, payload } = await forgotPasswordService(input);

        showToast(msg, cls);

        if (!status) {
            return;
        }

        // Redirect to login page upon successful reset
        navigate('/login'); // Replace '/login' with the actual path to your login page
    }

    return (
        <div className="login-form reset-form">
            <form onSubmit={handleSubmit}>
                <h2>Reset Password</h2>
                <p className="text-secondary text-center">
                    Reset your password
                </p>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        required
                    />
                </div>

                <button className="login-btn" type="submit">
                    Reset
                </button>

            </form>
        </div>
    )
}

export default ForgotPassword;