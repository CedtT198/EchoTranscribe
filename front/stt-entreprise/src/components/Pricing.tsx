import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { findAllSubType } from "../api/subTypeApi";
import { useAuth } from "../auth/useAuth";

function Pricing () {
    const [sub_types, setSub] = useState([]);
    useEffect(() => {
        const fetchSubs = async () => {
            try {
                const data = await (await findAllSubType()).json();
                setSub(data);
            } catch (err) {
                console.log((err as Error).message);
            }
        };

        fetchSubs();
    }, []);
    
    const { isAuthenticated } = useAuth0();

    const { signupAuth0 } = useAuth();
    const signup = () => signupAuth0()

    return (
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
    )
}

export default Pricing;