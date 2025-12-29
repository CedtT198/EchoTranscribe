import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { findAllSubType } from "../../../api/sub_type";

function Subscription() {
    const [sub_types, setSub] = useState([]);
    useEffect(() => {
        const fetchSubs = async () => {
        try {
            const data = await findAllSubType();
            setSub(data);
        } catch (err) {
            console.log((err as Error).message);
        }
        };

        fetchSubs();
    }, []);
    
    const { isAuthenticated, loginWithRedirect: login } = useAuth0();

    const signup = () => login({
        authorizationParams: { screen_hint: "signup" },
        appState: { returnTo: "/public/layout/subscription" },
    });
    
    return (
        <div>
            <div className="text-center">
                <p className="h2 mb-0">Available subscriptions</p>
                <p className="text-muted mb-5">See below the offer that fits better for you</p>
            </div>
            <div className="text-center">
            </div>
            <div className="card-deck my-4 px-4">
                {sub_types.map((sub, i) => (
                    <div className="card mb-4 shadow">
                        <div className="card-body text-center p-5 d-flex flex-column accordion-item-hover text-glow-primary">
                            <div className="border-bottom-1">
                                <p className="h3 mb-0">{sub.name}</p>
                                <p className=" mb-0" style={{ fontSize: 40 }}>${sub.price}</p>
                                <p className="text-muted">{sub.frequency}</p><hr/>
                            </div>
                            <ul className="mb-5 text-left px-2">
                                {sub.description.map((f, j) => (
                                    <li key={j} className="mb-1">{f}</li>
                                ))}
                            </ul>
                            {!isAuthenticated &&
                                <div className="py-2 mt-auto">
                                    <button className="btn btn-primary w-100" style={{ fontSize: 18 }} onClick={signup}>Sign up now</button>
                                </div>
                            }

                            {isAuthenticated && i !== 0 &&
                                <div className="py-2 mt-auto">
                                    <button className="btn btn-primary w-100" style={{ fontSize: 18 }}>Subscribe</button>
                                </div>
                            }
                        </div>
                    </div> 
                ))}
            </div>
            <div className="text-center">
                <p className="h2">Helpful answers</p>
            </div>
            <div className="mb-5 mt-4 pb-5 d-flex flex-column justify-content-center align-items-center">
                <div className="accordion w-75" id="accordion1">
                    <div className="card shadow mb-3 py-2 accordion-item-hover">
                        <a className="text-dark" role="button" href="#collapse1" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                            {/* <div className="p-3 d-flex justify-content-between" id="heading1">
                                <p className="ml-2" style={{fontSize: 16}}>Question ?</p>
                                <p><span className="fe fe-plus fe-16 mr-2"></span></p>
                            </div> */}
                            <div className="ml-0 pt-3 container row border-bottom-1 text-glow-primary" id="heading1">
                                <p className="col-10 d-flex justify-content-center" style={{fontSize: 16}}>Question $foeijf ?</p>
                                <p className="col-2 d-flex justify-content-center align-items-center"><span className="fe fe-plus fe-16 mr-2"></span></p>
                            </div>
                        </a>
                        <div id="collapse1" className="collapse show" aria-labelledby="heading1" data-parent="#accordion1">
                            <div className="card-body px-4 text-center">
                                <p>fiweuhfiwehufweiuf</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion w-75" id="accordion1">
                    <div className="card shadow mb-3 py-2 accordion-item-hover">
                        <a role="button" href="#collapse1" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                            {/* <div className="p-3 d-flex justify-content-between" id="heading1">
                                <p className="ml-2" style={{fontSize: 16}}>Question ?</p>
                                <p><span className="fe fe-plus fe-16 mr-2"></span></p>
                            </div> */}
                            <div className="ml-0 pt-3 container row border-bottom-1 text-dark" id="heading1">
                                <p className="col-10 d-flex justify-content-center" style={{fontSize: 16}}>Question $foeijf ?</p>
                                <p className="col-2 d-flex justify-content-center align-items-center"><span className="fe fe-plus fe-16 mr-2"></span></p>
                            </div>
                        </a>
                        <div id="collapse1" className="collapse show" aria-labelledby="heading1" data-parent="#accordion1">
                            <div className="card-body px-4 text-center">
                                <p>fiweuhfiwehufweiuf</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription;