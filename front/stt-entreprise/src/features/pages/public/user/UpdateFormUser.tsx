import { useState } from "react";
import { type User, updateUser } from "../../../../api/user";
import { useToast } from "../../../../auth/ToastProvider";
import axios from "axios";
import { countries } from "../../../../others/utils";

type Props = {
  user: User;
};

export default function UpdateFormUser({user}: Props) {
    const {setError, setSuccess} = useToast();
    const [formData, setFormData] = useState<User>(user);

    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    selectedCity;
    const cities = countries.find(c => c.country === selectedCountry)?.cities ?? [];
        
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === "country") {
            setFormData(prev => ({...prev, city: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await updateUser(formData);
            const data = res.data;
            console.log(res);
            console.log(data);

            if (data.success) {
                setSuccess(data.success);
                window.location.reload();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // console.log("Status:", error.response?.status); 
                setError("Message: "+ error.response?.data?.error); 
            } else {
                setError("Unknown error: "+error);
            }
        }
    };

    return(
        <>
            <div className="text-center mt-4">
                <button type="button" className="btn btn-warning text-white" data-toggle="modal" data-target=".modal-full">Update</button>
            </div>
            
            <div className="modal fade modal-full"  role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <button aria-label="" type="button" className="close px-2" data-dismiss="modal" aria-hidden="true">
                    <span className="fe fe-x" aria-hidden="true"></span>
                </button>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content container wrapper vh-100">
                        <div className="row align-items-center h-100">
                            <div className='card mx-auto'>
                                <form className="col-10 mx-auto mb-5" onSubmit={handleSubmit}>
                                    <h1 className="h3 mt-5">Update your information</h1>
                                    <p className='text-muted'>Field with (*) is mandatory</p>
                                    <div className='row'>
                                        <div className="form-group col-6">
                                            <label htmlFor="name">Name *</label>
                                            <input type="text" id="name" name="name" className="form-control form-control-lg" onChange={handleChange} value={formData.name} />
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="first_name">First name *</label>
                                            <input type="text" id="first_name" name="first_name" className="form-control form-control-lg" onChange={handleChange} value={formData.first_name} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="birthday">Birthday *</label>
                                        <input type="date" id="birthday" name="birthday" className="form-control form-control-lg" onChange={handleChange} value={formData.birthday} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="country">Country *</label>
                                        <select name="country" id="country" className="form-control form-control-lg" onChange={(e) => {
                                            handleChange(e);
                                            setSelectedCountry(e.target.value);
                                            setSelectedCity("");
                                            }} value={formData.country} 
                                        >
                                            <option>Select a Country</option>
                                            {countries.map(c => (
                                                <option key={c.country} value={c.country}>
                                                {c.country}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="city">City *</label>
                                        <select name="city" id="city" className="form-control form-control-lg"
                                            onChange={(e) => {
                                                handleChange(e);
                                                setSelectedCity(e.target.value
                                            )}}
                                            disabled={!selectedCountry} value={formData.city}
                                        >
                                            <option>Select a city</option>
                                                {cities.map(city => (
                                                    <option key={city} value={city}>
                                                    {city}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="zip">Zip *</label>
                                        <input type="zip" id="zip" name="zip" className="form-control form-control-lg" onChange={handleChange} value={formData.zip} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Address *</label>
                                        <input type="text" id="address" name="address" className="form-control form-control-lg" onChange={handleChange} value={formData.address} />
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block" type="submit">Update now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}