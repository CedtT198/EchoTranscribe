import { useState } from 'react';
import '../../../assets/css/sign.css'
import { SERVER_URL, type ValidationErrors } from '../../../Global';
import { useNavigate, useLocation } from 'react-router-dom';

interface FormData {
    mail?: string;
    password?: string;
}

// function SignIn() {
const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as { message: string };
    const [formData, setFormData] = useState<FormData>({
        mail: "",
        password: ""    
    });

    const [error, setError] = useState<string>("");
    
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${SERVER_URL}/sign/in`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(formData);
            console.log(data);

            if (response.ok) {
                navigate("/home");
            } else {
                setError(data.error || "Unkown error happened.");
            }
        } catch (error) {
            console.error(error);
            setError("Error connecting to the server.");
        }
    };

    return (
        <div id="container" className="container">
            <nav>
                <a href="#"><img src="logo.svg" alt="logo"/></a>
            </nav>
            <div className="form-wrapper">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <input type="text" name="mail" onChange={handleChange} value={formData.mail} required/>
                        <label>Email</label>
                    </div>
                    <div className="form-control">
                        <input type="password" name="password" onChange={handleChange} value={formData.password} required/>
                        <label>Password</label>
                    </div>
                    {state?.message && <p className="success">{state?.message}</p>}
                    {error && <p className='error'>{error}</p>}
                    <button type="submit">Sign In</button>
                    <div className="form-help">
                        <a href="#">Forgot your password ?</a>
                    </div>
                </form>
                <p>New to EchoTranscribe? <a href="/public/sign-up">Sign up now</a></p>
                <small>
                    This page is protected by Google reCAPTCHA
                    to ensure you're not a bot.
                </small>
            </div>
        </div>
    )
};

export default SignIn