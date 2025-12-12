import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyCode, sendCode } from '../../../api/otpApi';
import { saveUser } from '../../../api/userApi';

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

    const newCode = async () => {
        setError("");
        console.log("A new code has been sent to "+state.formData.mail);
        
        try {
            const resOtp = await sendCode(state.formData.mail);
            const data = await resOtp.json();
            console.log(data);

            if (resOtp.ok) {
                setSuccess(data.success);
            } else {
                setError(data.error || "Unkown error happened.");
            }
        } catch (error) {
            console.error(error);
            setError("Error connecting to the server.");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setSuccess("");
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        console.log(formData);

        try {
            const resOtp = await verifyCode(formData);
            const data = await resOtp.json();
            console.log(data);

            if (resOtp.ok) {
                // sauvena le user
                saveUser(state.formData);
                navigate("/public/layout");
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
        <div className="wrapper vh-100">
            <div className="row align-items-center h-100">
                <div className='card mx-auto'>
                    <form className="col-10 mx-auto text-center" onSubmit={handleSubmit}>
                        <div className="mx-auto text-center my-4">
                            <h2 className="my-3">Verify code</h2>
                        </div>
                        <div className="alert" role="alert">
                            A verification code has been sent to your email <em className='font-weight-bolder'>{state.formData.mail}</em>. <br />Please check and write down the code.
                        </div>
                        {success &&
                        <div className="alert alert-success" role="alert">
                            {success}
                        </div>}
                        {error &&
                        <div className="alert alert-danger" role="alert">
                            <span className="fe fe-minus-circle fe-16 mr-2 text-center"></span>{error}.
                        </div>}
                        <div className="form-group">
                            <label htmlFor="code" className="sr-only">Code</label>
                            <input type="number" id="code" name="code" onChange={handleChange} value={formData.code} className="form-control form-control-lg" placeholder="Enter code" required/>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block mb-4" type="submit">Verify</button>
                        <p>Haven't received the code?<a href='#' onClick={newCode}> Click here for a new one</a></p>
                        <p className="mt-5 mb-3 text-muted">© 2025</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OTP;