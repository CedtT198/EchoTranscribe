import { useState } from 'react';
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
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await signin(formData);
            const data = await response.json();

            console.log(formData);
            console.log(data);

            if (response.ok) {
                navigate("/public/Layout");
            } else {
                setError(data.error || "Unkown error happened.");
            }
        } catch (error) {
            console.error(error);
            setError("Error connecting to the server.");
        }
    };

    return (
        <div className="container wrapper vh-100">
            <div className="row align-items-center h-100">
                <div className='card mx-auto'>
                    <form className="col-10 mx-auto" onSubmit={handleSubmit}>
                        <h1 className="h3 mt-5">Sign in</h1>
                        <p className='text-muted'>Field with (*) is mandatory</p>
                        <div className='row'>
                            <div className="form-group col-12 ">
                                <label htmlFor="mail">Email address *</label>
                                <input type="email" id="mail" name="mail" className="form-control form-control-lg" onChange={handleChange} value={formData.mail} required/>
                            </div>
                            <div className="form-group col-12 ">
                                <label htmlFor="password">Password *</label>
                                <input type="password" id="password" name="password" className="form-control form-control-lg" onChange={handleChange} value={formData.password} required/>
                            </div>
                        </div>
                        <p className='text-center'>New to EchoTranscribe? <a href="/public/sign-up">Sign up now</a></p>
                        {error && <div className="alert alert-danger text-center" role="alert">
                            <span className="fe fe-minus-circle fe-16 mr-2"></span>{error}.
                        </div>}
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
                        <p className="mt-5 mb-3 text-muted text-center">© 2025</p>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default SignIn