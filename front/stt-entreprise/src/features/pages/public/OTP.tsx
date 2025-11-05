import { useState } from 'react';
import '../../../assets/css/sign.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { sendNewCode, SERVER_URL} from '../../../Global';

interface otpFormData {
    email?: string
    code?: string
}

function OTP() {
    const navigate = useNavigate();
    const location = useLocation();

    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");

    const state = location.state as { message: string };
    const [formData, setFormData] = useState<otpFormData>({
        email: state.formData.mail,
        code: ""
    });

    const newCode = () => {
        console.log("A new code has been sent to "+state.formData.mail);
        sendNewCode(state.formData.mail);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        console.log(formData);

        try {
            const resOtp = await fetch(`${SERVER_URL}/otp/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await resOtp.json();
            console.log(data);

            if (resOtp.ok) {
                // sauvena le user
                await fetch(`${SERVER_URL}/user/save`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(state.formData),
                });
                navigate("/public/home");
            } else {
                setError(data.error || "Unkown error happened.");
            }
        } catch (error) {
            console.error(error);
            setError("Error connecting to the server.");
        }
    };
    
    // const handleSubmit = async (e: React.FormEvent) => {
    //     console.log(formData);

    //     try {
    //         const response = await fetch(`${SERVER_URL}/otp/verify`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(formData),
    //         });

    //         const data = await response.json();
    //         console.log(data);

    //         if (response.ok) {
    //             navigate("/public/home");
    //         } else {
    //             setError(data.error || "Unkown error happened.");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         setError("Error connecting to the server.");
    //     }
    // };

    return (
        <div id="container" className="container">
            <nav>
                <a href="#"><img src="logo.svg" alt="logo"/></a>
            </nav>
            <div className="form-wrapper">
                <h2>Verify code</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <input type="text" name="code" onChange={handleChange} value={formData.code} required/>
                        <label>Code</label>
                    </div>
                    {success && <p className='success'>{success}</p>}
                    {error && <p className='error'>{error}</p>}
                    <button type="submit">Verify</button>
                    <div>
                        <p>Wait {} second(s) to have a new code.</p>
                        <p>Haven't received any code?<a href='#' onClick={newCode}> Send a new one</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default OTP;