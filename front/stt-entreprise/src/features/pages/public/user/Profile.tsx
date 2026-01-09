import { useEffect, useState } from "react";
import type { FormDataUpdateUser, ValidationErrors} from '../../../../components/Global';
// import { useLocation } from "react-router-dom";
import { deleteUser, getMyProfile, updateUser } from "../../../../api/user";
import { useAuth0 } from "@auth0/auth0-react";
import AutoLogout from "../../../../components/AutoLogout";
import Loading from "../../../../components/others/Loading";
import { useAuth } from "../../../../auth/useAuth";

function Profile() {
    // profiile
    const { user, isAuthenticated, isLoading: auth0Loading } = useAuth0();
    
    const [profileLoading, setProfileLoading] = useState(true);

    const [userData, setUserData] = useState<any>(null);
    useEffect(() => {
        if (auth0Loading || !isAuthenticated) return;

        const fetchUserData = async () => {
            try {
                setProfileLoading(true);
                const res = await getMyProfile();
                setUserData(res.data);
            } catch (error) {
                console.log((error as Error).message);
            } finally {
                setProfileLoading(false);
            }
        }

        fetchUserData()
    }, [auth0Loading, isAuthenticated]);
    
    // const location = useLocation();
    // const state = location.state as { message: string };
    // END USER PROFILE


    // update user
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
            const res = await updateUser(formData);
            const data = res.data;
            console.log(data);

            if (data.success) {
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

    // danger zone
    // const { logoutAuth0 } = useAuth();
    const deleteAccount = async () => {
        try {
            const res = await deleteUser(user.sub);
            const data = res.data;
            console.log("deleted: "+data); 
            // logoutAuth0();
            <AutoLogout shouldLogout={data} />
        } catch (error) {
            console.log((error as Error).message);
        }
    }

    // const blockAccount = async () => {
    //     await blockUser(user?.sub);
    // }
    // END DANGER ZONE

    if (auth0Loading || profileLoading) {
        return <Loading />;
    }
    return (
        <div className="container">
            <p className="page-title h2 mb-0">Profile</p>
            <p className="tect-muted">All about your personal information and subscription activities.</p>
            <div className="row">
                {/* info */}
                <div className="col-12 mt-5 align-items-center mb-5">
                    <div className="col card py-5">
                        {success &&
                        <div className="alert alert-success text-center" role="alert">
                            {success}
                        </div>}
                        <div className="row align-items-center">
                            <div className="col-md-3 col-lg-3 col-xs-12 text-center my-4">
                                <div className="avatar avatar-xl">
                                    <img src="./assets/avatars/face-1.jpg" alt="User profile picture" className="avatar-img rounded-circle"/>
                                </div>
                                <a href="#" className="text-primary">
                                    <span className="fe fe-edit-2 fe-16 mr-1"></span>Change
                                </a>
                            </div>
                            <div className="col-xs-12 col-md-4 col-lg-4 px-4">
                                <h4 className="mb-1">{userData.firstName ? userData.firstName : "-----"}, {userData.name ? userData.name: "-----"}</h4>
                                <p className="mb-3"><span className="badge badge-dark">{user?.email}</span></p>
                            </div>
                            <div className="col-xs-12 col-md-3 col-lg-3 px-4">
                                <div className="col-12">
                                    <p className="mb-0 text-muted">
                                        <span className="fe fe-calendar fe-16 mr-2"></span>{userData.birthday ? userData.birthday : "--/--/----"}
                                    </p>
                                    <p className="mb-0 text-muted">
                                        <span className="fe fe-map fe-16 mr-2"></span>{userData.country ? userData.country : "----"}
                                    </p>
                                    <p className="mb-0 text-muted">
                                        <span className="fe fe-map-pin fe-16 mr-2"></span>{userData.country ? userData.country : "----"}, {userData.zip ? userData.zip : "----"}, 
                                    </p>
                                    <p className="mb-0 text-muted">
                                        <span className="fe fe-calendar fe-16 mr-2"></span>{userData.creationDate ? userData.creationDate : "----"}
                                    </p>
                                    <p className="mb-0 text-muted">
                                        <span className="fe fe-edit fe-16 mr-2"></span>Last update date
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xs-12 mb-4">
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
                {/* sub */}
                <div className="col-md-12 row mb-5">
                    <div className="col-md-9 col-lg-9 col-xs-12">
                        <p className="h3 mb-0">Your actual subscription</p>
                        <p className="text-muted">Everything about your active subscription(s).</p>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xs-12 d-flex align-items-center justify-content-center">
                        <div className="text-center">
                            <button type="button" className="btn btn-info" data-toggle="modal" data-target="#codeModal" data-whatever="@mdo">Enter invitation code</button>
                        </div>
                        <div className="modal fade" id="codeModal" role="dialog" aria-labelledby="codeModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header row">
                                        <div className="col-10">
                                            <h5 className="modal-title" id="codeModalLabel">Invitation code</h5>
                                            <p className='text-muted'>It allows you to use the same subscription as the one who gives you the code.</p>
                                        </div>
                                        <div className="col-2">
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="invitation_code" className="col-form-label">Code</label>
                                                <input type="text" className="form-control" id="invitation_code" required/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        {/* <button type="button" className="btn mb-2 btn-danger" data-dismiss="modal">Close</button> */}
                                        <button type="button" className="btn mb-2 btn-info">Send message</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {error &&
                    <div className="alert alert-danger text-center" role="alert">
                        <span className="fe fe-minus-circle fe-16 mr-2"></span>{error}.
                    </div>}
                    {success &&
                    <div className="alert alert-success text-center" role="alert">
                        <span className="fe fe-check fe-16 mr-2"></span>{success}.
                    </div>}
                </div>
                <div className="card mb-4 shadow col-xs-12 offset-md-4 col-md-4 offset-lg-4 col-lg-4 p-0">
                    <div className="card-body text-center p-5 d-flex flex-column accordion-item-hover text-glow-primary" style={{minHeight: "500px"}}>
                        <div className="border-bottom-1">
                            <p className="h3 mb-0"><span className="dot dot-lg bg-success mr-2"></span>{"sub.name"}</p>
                            <p className=" mb-0" style={{ fontSize: 40 }}>${"sub.price"}</p>
                            <p className="text-muted">{"sub.frequency"}</p><hr/>
                        </div>
                        <ul className="mb-5 text-left px-2">
                            <li>foweufhewiufew</li>
                            <li>foweufhewiufew</li>
                            <li>foweufhewiufew</li>
                            <li>foweufhewiufew</li>
                            <li>foweufhewiufew</li>
                            {/* {"sub.description".map((f, j) => (
                                <li key={j} className="mb-1">{f}</li>
                            ))} */}
                        </ul>
                        <div className="py-2 mt-auto">
                            {/* <button className="btn btn-primary w-100 rounded-pill" style={{ fontSize: 18 }}>Subscribe</button> */}
                        </div>
                    </div>
                </div> 
                {/* sub records */}
                <div className="col-12 mb-5">
                    <hr />
                    <div className="text-center">
                        <p className="h3">Subscription records</p>
                        <p className="text-muted"></p>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr role="row">
                                <th>ID</th>
                                <th>Purchase Date</th>
                                <th>Date end</th>
                                <th>Sub. type</th>
                                <th>Total</th>
                                <th>Payments</th>
                                <th>Invitation code</th>
                                <th>Sub master
                                    <span className="fe fe-info fe-16 ml-2 text-secondary" title="The person who paid for the subscription."></span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col">1332</th>
                                <td>2020-12-26 01:32:21</td>
                                <td></td>
                                <td>Free plan</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>
                                    <div className="avatar avatar-sm">
                                        <img src="./assets/avatars/face-3.jpg" alt="User profile picture." className="avatar-img rounded-circle"/> You
                                    </div>
                                </td>
                                {/* <td>
                                    <a href="" className="btn text-danger" title="Delete">
                                        <span className="fe fe-trash-2 fe-16 mr-2"></span>
                                    </a>
                                </td> */}
                            </tr>
                            <tr>
                                <th scope="col">1333</th>
                                <td>2020-12-26 01:32:21</td>
                                <td>2020-12-26 01:32:21</td>
                                <td>Independant</td>
                                <td>$9.99</td>
                                <td>Paypal</td>
                                <td>-</td>
                                <td>
                                    <div className="avatar avatar-sm">
                                        <img src="./assets/avatars/face-3.jpg" alt="User profile picture." className="avatar-img rounded-circle"/> You
                                    </div>
                                </td>
                                {/* <td>
                                    <a href="" className="btn text-danger" title="Delete">
                                        <span className="fe fe-trash-2 fe-16 mr-2"></span>
                                    </a>
                                </td> */}
                            </tr>
                            <tr>
                                <th scope="col">1334</th>
                                <td>2020-12-26 01:32:21</td>
                                <td>2020-12-26 01:32:21</td>
                                <td>Company</td>
                                <td>$19.99</td>
                                <td>Mastercard VISA</td>
                                <td>
                                    <a href="#" className="text-secondary">
                                        <span className="fe fe-copy fe-16 mr-2"></span>q2w34e5rft6ghjud7wqe5f
                                    </a>
                                </td>
                                <td>
                                    <div className="avatar avatar-sm">
                                        <img src="./assets/avatars/face-3.jpg" alt="User profile picture." className="avatar-img rounded-circle"/> You
                                    </div>
                                </td>
                                {/* <td>
                                    <a href="" className="btn text-danger" title="Delete">
                                        <span className="fe fe-trash-2 fe-16 mr-2"></span>
                                    </a>
                                </td> */}
                            </tr>
                            <tr>
                                <th scope="col">1335</th>
                                <td>2020-12-26 01:32:21</td>
                                <td>2020-12-26 01:32:21</td>
                                <td>Company</td>
                                <td>-</td>
                                <td>-</td>
                                <td>
                                    <a href="#" className="text-secondary">
                                        <span className="fe fe-copy fe-16 mr-2"></span>q2w34e5rft6ghjud7wqe5f
                                    </a>
                                </td>
                                <td>
                                    <div className="avatar avatar-sm">
                                        <img src="./assets/avatars/face-3.jpg" alt="User profile picture." className="avatar-img rounded-circle mr-1"/>Master
                                    </div>
                                </td>
                                {/* <td>
                                    <a href="" className="btn text-danger" title="Delete">
                                        <span className="fe fe-trash-2 fe-16 mr-2"></span>
                                    </a>
                                </td> */}
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                {/* Danger zone */}
                <div className="col-12 my-5">
                    <div className="">
                        <p className="h3 mb-0">Danger zone</p>
                        <p className="text-muted">Warning! Unless you have real reason, don't.</p>
                    </div>
                    <div>
                        {/* delete */}
                        <div className="alert alert-danger container row" role="alert">
                            <div className="col-md-10 col-lg-10 col-xs-12">
                                <p className="" style={{fontSize: "17px"}}>Delete your account</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut praesentium magnam repellat harum. Omnis sunt adipisci quasi quod, optio eos amet, rerum perferendis, laboriosam reiciendis consequatur harum distinctio iste.</p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xs-12 d-flex align-items-center justify-content-center">
                                <div className="text-center">
                                    <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#deleteModal" data-whatever="@mdo">Delete</button>
                                </div>
                                <div className="modal fade" id="deleteModal" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <div className="col-10">
                                                    <h5 className="modal-title" id="deleteModalLabel">Confirmation</h5>
                                                    <p className='text-muted'>Are you sure about deleting your account within all the records ?.</p>
                                                </div>
                                                <div className="col-2">
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn mb-2 btn-dark" data-dismiss="modal">No</button>
                                                <button type="button" className="btn mb-2 btn-danger" onClick={deleteAccount}>Yes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* block */}
                        {/* <div className="alert alert-danger container row" role="alert">
                            <div className="col-md-10 col-lg-10 col-xs-12">
                                <p className="font-weight-bold" style={{fontSize: "17px"}}>Deactivate your account</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut praesentium magnam repellat harum. Omnis sunt adipisci quasi quod, optio eos amet, rerum perferendis, laboriosam reiciendis consequatur harum distinctio iste.</p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xs-12 d-flex align-items-center justify-content-center">
                                <div className="text-center">
                                    <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#blockModal" data-whatever="@mdo">Deactivate</button>
                                </div>
                                <div className="modal fade" id="blockModal" role="dialog" aria-labelledby="blockModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <div className="col-10">
                                                    <h5 className="modal-title" id="blockModalLabel">Confirmation</h5>
                                                    <p className='text-muted'>Are you sure about deactivating your account ?</p>
                                                </div>
                                                <div className="col-2">
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn mb-2 btn-danger" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn mb-2 btn-danger" onClick={blockAccount}>Yes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;