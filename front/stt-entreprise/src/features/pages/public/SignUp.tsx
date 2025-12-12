import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { ValidationErrors, FormData } from '../../../components/Global';
import { validate } from '../../../api/signApi';
import { sendCode } from '../../../api/otpApi';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: "art",
        first_name: "art",
        country: "Mada",
        city: "Tana",
        zip: "101",
        address: "Ambotolona",
        mail: "art@gmail.com",
        birthday: "2001-01-01",
        password: "12345678",
        confirm_password: "12345678"
    });

    const [error, setError] = useState<string>("");
    const [errors, setErrors] = useState<ValidationErrors>({});
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            const response = await validate(formData);
            const data = await response.json();

            console.log(data);

            if (response.ok) {
                sendCode(formData.mail);
                navigate("/public/otp", { state: { formData: formData } });
            } else if (data.errors) {
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
        <div className="container wrapper vh-100">
            <div className="row align-items-center h-100">
                <div className='card mx-auto'>
                    <form className="col-10 mx-auto" onSubmit={handleSubmit}>
                        <h1 className="h3 mt-5">Sign up</h1>
                        <p className='text-muted'>Field with (*) is mandatory</p>
                        <div className='row'>
                            <div className="form-group col-6">
                                <label htmlFor="name">Name *</label>
                                <input type="text" id="name" name="name" className="form-control form-control-lg" onChange={handleChange} value={formData.name} required/>
                                {errors.name && <p className='text-danger'>{errors.name}</p>}
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="first_name">First name *</label>
                                <input type="text" id="first_name" name="first_name" className="form-control form-control-lg" onChange={handleChange} value={formData.first_name} required/>
                                {errors.first_name && <p className='text-danger'>{errors.first_name}</p>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="mail">Email address *</label>
                            <input type="email" id="mail" name="mail" className="form-control form-control-lg" onChange={handleChange} value={formData.mail} required/>
                            {errors.mail && <p className='text-danger'>{errors.mail}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthday">Birthday *</label>
                            <input type="date" id="birthday" name="birthday" className="form-control form-control-lg" onChange={handleChange} value={formData.birthday} required/>
                            {errors.birthday && <p className='text-danger'>{errors.birthday}</p>}
                        </div>
                        <div className='row'>
                            <div className="form-group col-4">
                                <label htmlFor="country">Country *</label>
                                <select className="form-control select2" id="country" name="country" value={formData.country}>
                                    <optgroup label="America">
                                    <option value="us">America</option>
                                    </optgroup>
                                    <optgroup label="Europe">
                                    <option value="fr">French</option>
                                    </optgroup>
                                </select>
                                {errors.country && <p className='text-danger'>{errors.country}</p>}
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="city">City *</label>
                                <select className="form-control select2" id="city" name="city" value={formData.city}>
                                    <optgroup label="America">
                                    <option value="us">Pays 1</option>
                                    <option value="us">Pays 2</option>
                                    <option value="us">Pays 3</option>
                                    </optgroup>
                                </select>
                                {errors.city && <p className='text-danger'>{errors.city}</p>}
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="zip">Zip code *</label>
                                <input type="text" id="zip" name="zip" className="form-control input-zip" onChange={handleChange} value={formData.zip} required/>
                                {errors.zip && <p className='text-danger'>{errors.zip}</p>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address *</label>
                            <input type="text" id="address" name="address" className="form-control form-control-lg" onChange={handleChange} value={formData.address} required/>
                            {errors.address && <p className='text-danger'>{errors.address}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password * (Minimum 8 character)</label>
                            <input type="password" id="password" name="password" className="form-control form-control-lg" onChange={handleChange} value={formData.password} required/>
                            {errors.password && <p className='text-danger'>{errors.password}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm_password">Confirm password *</label>
                            <input type="password" id="confirm_password" name="confirm_password" className="form-control form-control-lg" onChange={handleChange} value={formData.confirm_password} required/>
                            {errors.confirm_password && <p className='text-danger'>{errors.confirm_password}</p>}
                        </div>
                        <p className='text-center'>Already have an account? <a href="/public/sign-in">Sign in</a></p>
                        {error &&
                        <div className="alert alert-danger text-center" role="alert">
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

export default SignUp;