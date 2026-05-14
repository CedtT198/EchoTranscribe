import { useEffect, useState } from "react";
import { getMyProfile, type User } from "../../../../api/user";
import { useAuth0 } from "@auth0/auth0-react";
// import AutoLogout from "../../../../components/AutoLogout";
import Loading from "../../../../components/others/Loading";
import Pricing from "../../../../components/pricing/Pricing";
import { findAllByAuth0Id, useUserSession, type Subscription } from "../../../../api/subscription";
import { formatLocalDate } from "../../../../others/utils";
// import { useToast } from "../../../../auth/ToastProvider";
import CancelButton from "../subscription/CancelButton";
import InvitationButton from "../subscription/InvitationButton";
import UpdateFormUser from "./UpdateFormUser";
import { useAuth } from "../../../../auth/useAuth";

export default function Profile() {
    // profiile
    const { user, isAuthenticated, isLoading: auth0Loading } = useAuth0();
    // const {setError} = useToast();
    const [profileLoading, setProfileLoading] = useState(true);

    const [userData, setUserData] = useState<User>();
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const { subscription: actualSub } = useUserSession();
    useEffect(() => {
        if (auth0Loading || !isAuthenticated) return;

        const fetchUserData = async () => {
            try {
                setProfileLoading(true);
                const res = await getMyProfile();
                console.log(res.data)
                setUserData(res.data);
                setUserData(prev => ({...prev!, mail: user?.email, }));
            } catch (error) {
                console.log((error as Error).message);
            } finally {
                setProfileLoading(false);
            }
        }
        
        const fetchSubscriptionRecords = async (auth0Id: any) => {
            try {
                const res = await findAllByAuth0Id(auth0Id);
                setSubscriptions(res.data);
                console.log(res.data);
            } catch (error) {
                console.log((error as Error).message);
            } finally {
                setProfileLoading(false);
            }
        }

        fetchUserData();
        fetchSubscriptionRecords(user?.sub);
    }, [auth0Loading, isAuthenticated]);

    // danger zone
    const { logoutAuth0 } = useAuth();
    const logout = () => logoutAuth0()
    // const deleteAccount = async () => {
    //     try {
    //         const res = await deleteUser(user.sub);
    //         const data = res.data;
    //         console.log("Deleted: "+data); 
    //         // logoutAuth0();
    //         <AutoLogout shouldLogout={data} />
    //     } catch (error) {
    //         setError((error as Error).message);
    //     }
    // }


    if (auth0Loading || profileLoading) {
        return <Loading />;
    }
    return (
        <div className="container">
            <p className="page-title h2 mb-0">Profile</p>
            <p className="text-muted">All about your personal information and subscription activities.</p>
            <div className="row">
                {/* info */}
                <div className="col-12 mt-5 align-items-center mb-5">
                    {userData && <div className="col card py-5">
                        <div className="row align-items-center">
                            <div className="offset-md-1 col-md-2 offset-lg-1 col-lg-2 col-xs-12 text-center my-4">
                                <div className="avatar avatar-xl">
                                    <img src={user?.picture} alt="User avatar" className="avatar-img rounded-circle"/>
                                </div>
                            </div>
                            <div className="offset-xs-3 col-xs-9 col-md-3 col-lg-3 px-4">
                                <h4 className="mb-1">{userData.first_name ? userData.first_name : "-"}, {userData.name ? userData.name: "-"}</h4>
                                <p className="mb-3"><span className="badge badge-dark">{user?.email}</span></p>
                            </div>
                            <div className="col-xs-12 col-md-3 col-lg-3 px-4">
                                <div className="col-12">
                                    <p className="mb-0 text-muted">
                                        <span className="fe fe-calendar fe-16 mr-2"></span>Birthday: {userData.birthday ? formatLocalDate(userData.birthday) : "-/-/----"}
                                    </p>
                                    <p className="mb-0 text-muted">
                                        <span className="fe fe-map fe-16 mr-2"></span>{userData.country ? userData.country : "-"}
                                    </p>
                                    <p className="mb-0 text-muted">
                                        <span className="fe fe-map-pin fe-16 mr-2"></span>{userData.city ? userData.city : "-"}, {userData.zip ? userData.zip : "-"}
                                    </p>
                                    <p className="mb-0 text-muted">
                                        <span className="fe fe-home fe-16 mr-2"></span>
                                        {userData.address ? userData.address : "-"}
                                    </p>
                                    <p className="mb-0 text-muted">
                                        <span className="fe fe-calendar fe-16 mr-2"></span>Joined date: {userData.creation_date ? formatLocalDate(userData.creation_date) : "-/-/----"}
                                    </p>
                                    <p className="mb-0 text-muted">
                                        <span className="fe fe-edit fe-16 mr-2"></span>Last update date: {userData.last_update ? formatLocalDate(userData.last_update) : "--/--/----"}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xs-12 mb-4">
                                <UpdateFormUser user={userData}/>
                            </div>
                        </div>
                    </div>}
                </div>

                {/* sub */}
                <div className="col-md-12 row mb-5">
                    <div className="col-md-9 col-lg-9 col-xs-12 d-flex flex-column justify-content-center">
                        <p className="h3 mb-0">Your subscription</p>
                        <p className="text-muted">Everything about your active subscription(s).</p>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xs-12 d-flex align-items-center justify-content-center">
                        <div className="">
                            {actualSub?.subscription_type=="Free plan" ? (
                                <InvitationButton />
                            ) : (
                                <div className="text-center">
                                    <p className="h2"><span className="dot dot-lg bg-success mr-2"></span>{actualSub?.subscription_type}</p>
                                    
                                    {/* raha sous utilisateur company */}
                                    {actualSub?.subscription_type=="Company" && actualSub?.invitation_code && 
                                        <p className="text-muted" style={{cursor: "pointer"}}><span className="fe fe-copy fe-16 mr-2"></span>{actualSub?.invitation_code}</p>
                                    }

                                    {/* mila actif sady proprietaire */}
                                    {actualSub?.status=="ACTIVE" && actualSub.subscription_owner==user?.sub && <CancelButton subId={actualSub.id} />}

                                    {actualSub?.credit && 
                                        <p className="text-danger"><span className="fe fe- fe-16 mr-2"></span>{actualSub?.credit} credits left</p>
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {actualSub?.subscription_type=="Free plan" &&<Pricing></Pricing>}

                {/* sub records */}
                {subscriptions && <div className="col-12 mb-5">
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
                                <th>End Date</th>
                                <th>Sub. Type</th>
                                <th>Per Month</th>
                                <th>Invitation Code</th>
                                <th>Status</th>
                                <th>Sub. owner
                                    <span className="fe fe-info fe-16 ml-2 text-secondary" title="The person who paid for the subscription."></span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {subscriptions.map((sub, index) => (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{sub.purchase_date ? formatLocalDate(sub.purchase_date) : "-"}</td>
                                    <td>{sub.end_date ? formatLocalDate(sub.end_date) : "-"}</td>
                                    <td>{sub.subscription_type}</td>
                                    <td>{sub.price ? "$ "+sub.price : "-"}</td>
                                    <td>
                                        {sub.invitation_code && (
                                            <>
                                                <span className="fe fe-copy fe-16 mr-1"></span>{sub.invitation_code}
                                            </>
                                        )}
                                        {!sub.invitation_code && ("-")}
                                    </td>
                                    <td>
                                        {sub.status && 
                                            <>
                                                {sub.status == "ACTIVE" && <span className="badge badge-pill badge-success text-white">{sub.status}</span>}
                                                {sub.status == "CANCELED" && <span className="badge badge-pill badge-warning text-white">{sub.status}</span>}
                                                {sub.status == "CANCEL_AT_PERIOD_END" && <span className="badge badge-pill badge-danger">{sub.status}</span>}
                                            </>
                                        }
                                        {!sub.status && "-"}
                                    </td>
                                    <td>
                                        {sub.subscription_owner == sub.auth0_id ? "You" : sub.subscription_owner}
                                    </td>
                                </tr>
                           ))}

                        </tbody>
                    </table>
                </div>}
                
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
                                <p><span style={{textDecoration: "underline", fontWeight: 800}}>Warning:</span> Deleting your account is permanent. All your data, settings, and history will be permanently removed and cannot be recovered. This action cannot be undone.</p>
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
                                                    <h5 className="modal-title" id="deleteModalLabel">Deleting account</h5>
                                                    <p className='text-muted'>Are you sure you want to delete your account ? This will permanently erase your data. You won’t be able to recover your account..</p>
                                                </div>
                                                <div className="col-2">
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn mb-2 btn-dark" data-dismiss="modal">No</button>
                                                <button type="button" className="btn mb-2 btn-danger" onClick={logout}>Yes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
