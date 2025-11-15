import { useState } from "react";
import type { FormDataUpdateUser, ValidationErrors} from '../../../components/Global';
import { useLocation } from "react-router-dom";
import { updateUser } from "../../../api/userApi";

function Profile() {
    // alaina ato le donnees mombanle user rehetra
    const location = useLocation();
    const state = location.state as { message: string };
    // 

    const [formData, setFormData] = useState<FormDataUpdateUser>({
        name: "art",
        first_name: "art",
        old_password: "12345678",
        new_password: "12345678",
        confirm_new_password: "12345678"
    });
    
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [errors, setErrors] = useState<ValidationErrors>({});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
        setSuccess("");
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess("");
        setError("");
        setErrors({});

        console.log(formData);
        
        try {
            const response = await updateUser(formData);
            const data = await response.json();

            console.log(data);

            if (response.ok) {
                setSuccess(data.success)
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
        <div className="container">
            <div className="row">
                <div className="col-12 mt-5 align-items-center">
                    <div className="col card py-5">
                        {success &&
                        <div className="alert alert-success text-center" role="alert">
                            {success}
                        </div>}
                        <div className="row align-items-center">
                            <div className="col-md-3 col-xs-12 text-center mb-5">
                                <div className="avatar avatar-xl">
                                    <img src="./assets/avatars/face-1.jpg" alt="User profile picture" className="avatar-img rounded-circle"/>
                                </div>
                                <a href="#" className="text-primary">
                                    <span className="fe fe-edit-2 fe-16 mr-1"></span>Change
                                </a>
                            </div>
                            <div className="col-xs-12 col-md-7 col-lg-7 px-5">
                                <h4 className="mb-1">First name, Name</h4>
                                <p className="mb-3"><span className="badge badge-dark">test@gmail.com</span></p>
                                <div className="mb-4">
                                    <div className="col-12">
                                        <p className="mb-0 text-muted">
                                            <span className="fe fe-calendar fe-16 mr-2"></span>02/02/2022
                                        </p>
                                        <p className="mb-0 text-muted">
                                            <span className="fe fe-map fe-16 mr-2"></span>Country
                                        </p>
                                        <p className="mb-0 text-muted">
                                            <span className="fe fe-map-pin fe-16 mr-2"></span>City + Zip code
                                        </p>
                                        <p className="mb-0 text-muted">
                                            <span className="fe fe-calendar fe-16 mr-2"></span>Joined date
                                        </p>
                                        <p className="mb-0 text-muted">
                                            <span className="fe fe-edit fe-16 mr-2"></span>Last update date
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xs-12 mb-4">
                                <div className="text-center">
                                    <button type="button" className="btn btn-warning" data-toggle="modal" data-target=".modal-full">Update</button>
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
                                                                <input type="text" id="name" name="name" className="form-control form-control-lg" onChange={handleChange} value={formData.name} required/>
                                                            </div>
                                                            <div className="form-group col-6">
                                                                <label htmlFor="first_name">First name *</label>
                                                                <input type="text" id="first_name" name="first_name" className="form-control form-control-lg" onChange={handleChange} value={formData.first_name} required/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="password">Old password *</label>
                                                            <input type="password" id="old_password" name="old_password" className="form-control form-control-lg" onChange={handleChange} value={formData.old_password} required/>
                                                            {errors.password && <p className='text-danger'>{errors.password}</p>}
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="password">New password *</label>
                                                            <input type="password" id="password" name="password" className="form-control form-control-lg" onChange={handleChange} value={formData.new_password} required/>
                                                            {errors.password && <p className='text-danger'>{errors.password}</p>}
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="confirm_password">Confirm new password *</label>
                                                            <input type="password" id="confirm_password" name="confirm_password" className="form-control form-control-lg" onChange={handleChange} value={formData.confirm_new_password} required/>
                                                            {errors.confirm_password && <p className='text-danger'>{errors.confirm_password}</p>}
                                                        </div>
                                                        {error &&
                                                        <div className="alert alert-danger text-center" role="alert">
                                                            <span className="fe fe-minus-circle fe-16 mr-2"></span>{error}.
                                                        </div>}
                                                        <button className="btn btn-lg btn-primary btn-block" type="submit">Update now</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="offset-md-3 offset-lg-3 col-md-6 col-lg-6 col-xs-12 mt-4">
                    <hr />
                    <div className="text-center">
                        <h3>Subscription</h3>
                        <p className="text-muted">Everything about your subscription(s).</p>
                    </div>
                    <div className="card-deck my-4">
                        <div className="card mb-5 shadow">
                            <div className="card-body text-center my-4">
                                <a href="#">
                                    <h3 className="h4 mb-0">Basic</h3>
                                </a>
                                <p className="text-muted">package</p>
                                <span className="h1 mb-0">$9.9</span>
                                <p className="text-muted">year</p>
                                <ul className="list-unstyled">
                                    <li>Lorem ipsum dolor sit amet</li>
                                    <li>Consectetur adipiscing elit</li>
                                    <li>Integer molestie lorem at massa</li>
                                    <li>Eget porttitor lorem</li>
                                </ul>
                                <span className="dot dot-lg bg-success"></span>
                                <span className="text-muted ml-3">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-5">
                <hr />
                    <div className="text-center">
                        <h3>Payments</h3>
                        <p className="text-muted"></p>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr role="row">
                                <th>ID</th>
                                <th>Purchase Date</th>
                                <th>Sub. type</th>
                                <th>Total</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col">1331</th>
                                <td>2020-12-26 01:32:21</td>
                                <td>$16.9</td>
                                <td>Paypal</td>
                                <td><span className="dot dot-lg bg-warning mr-2"></span>Due</td>
                                <td>
                                    <a href="" className="btn text-danger" title="Delete">
                                        <span className="fe fe-trash-2 fe-16 mr-2"></span>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Profile;