import { useNavigate } from 'react-router-dom';
import '../../../assets/css/sign.css'
import { useState } from 'react';
import { SERVER_URL, type ValidationErrors } from '../../../Global';

interface FormData {
    name: string,
    first_name: string,
    mail: string,
    birthday: string,
    password: string,
    confirm_password: string
}

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        first_name: "",
        mail: "",
        birthday: "",
        password: "",
        confirm_password: ""
    });

    const [error, setError] = useState<string>("");
    const [errors, setErrors] = useState<ValidationErrors>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setErrors({});

        console.log(formData);

        try {
            const response = await fetch(`${SERVER_URL}/sign/up`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                navigate("/public/sign-in", { state: { message: data.success } });
            } else if (data.errors) {
                console.log("ie misy erreur")
                setErrors(data.errors);
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
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <input type="text" name="name" onChange={handleChange} value={formData.name} required/>
                        <label>Name</label>
                        {errors.name && <p className='error'>{errors.name}</p>}
                    </div>
                    <div className="form-control">
                        <input type="text" name="first_name" onChange={handleChange} value={formData.first_name} required/>
                        <label>First name</label>
                        {errors.first_name && <p className='error'>{errors.first_name}</p>}
                    </div>
                    <div className="form-control">
                        <input type="text" name="mail" onChange={handleChange} value={formData.mail} required/>
                        <label>Email</label>
                        {errors.mail && <p className='error'>{errors.mail}</p>}
                    </div>
                    <div className="form-control">
                        <small>Birthday</small>
                        <input type="date" name="birthday" onChange={handleChange} value={formData.birthday} required/>
                        {errors.birthday && <p className='error'>{errors.birthday}</p>}
                    </div><br />
                    <div className="form-control">
                        <input type="password" name="password" onChange={handleChange} value={formData.password} required/>
                        <label>Password</label>
                        {errors.password && <p className='error'>{errors.password}</p>}
                    </div>
                    <div className="form-control">
                        <input type="password" name="confirm_password" onChange={handleChange} value={formData.confirm_password} required/>
                        <label>Confirm Password</label>
                        {errors.confirm_password && <p className='error'>{errors.confirm_password}</p>}
                    </div>
                    {error && <p className='error'>{error}</p>}
                    <button type="submit">Sign up</button>
                </form>
                <p>Already have an account? <a href="/public/sign-in">Sign in</a></p>
                <small>
                    This page is protected by Google reCAPTCHA
                    to ensure you're not a bot.
                </small>
            </div>
        </div>
    )
};

export default SignUp