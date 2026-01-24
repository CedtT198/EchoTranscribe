import { useToast } from "../../../../auth/ToastProvider";
import { subscribeWithCode, type SubscriptionWithCodeProps } from "../../../../api/subscription";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function InvitationButton() {
    const { setSuccess, setError } = useToast();
    const { user } = useAuth0();

    const [code, setCode] = useState<string>();
    const [sub, setSub] = useState<SubscriptionWithCodeProps>({auth0id: user?.sub, mail: user?.email,code: ""});
    

    const subscribe = async () => {
        try {
            const res = await subscribeWithCode(sub);
            const data = res.data;
            // console.log(sub);
            // console.log(res);
            // console.log(data);

            if (data.success) {
                setSuccess("Subscribed with invitation code successfuly");
                window.location.reload();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Status:", error.response?.status); 
                setError("Message: "+ error.response?.data?.error); 
            } else {
                setError("Unknown error: "+error);
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCode(value);
        setSub(prev => prev ? { ...prev, code: e.target.value } : prev)
        console.log(sub);
    };

    return (
        <>
        <button type="button" className="btn btn-info" data-toggle="modal" data-target="#codeModal" data-whatever="@mdo">Enter invitation code</button>

        <div className="modal fade" id="codeModal" role="dialog" aria-labelledby="codeModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header row m-0">
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
                        <div className="form-group">
                            <label htmlFor="invitation_code" className="col-form-label">Code</label>
                            <input type="text" className="form-control" id="invitation_code" onChange={handleChange} value={code} required/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn mb-2 btn-info"  onClick={subscribe}>Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}