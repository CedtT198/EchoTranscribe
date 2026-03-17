import { useToast } from "../../../../auth/ToastProvider";
import { cancelSubscription } from "../../../../api/subscription";
import axios from "axios";

export default function CancelButton(subId: any) {
    const { setSuccess, setError } = useToast();

    const cancel = async (subId: any) => {
        try {
            const res = await cancelSubscription(subId.subId);
            const data = res.data;
            // console.log(subId);
            // console.log(res);
            // console.log(data);

            if (data.success) {
                setSuccess(data.success);
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

    return (
        <>
            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#cancelSubModal" data-whatever="@mdo">Cancel renewal</button>
            
            <div className="modal fade text-left" id="cancelSubModal" role="dialog" aria-labelledby="cancelSubModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="col-10">
                                <h5 className="modal-title" id="cancelSubModalLabel">Cancel subscription</h5>
                                <p className='text-muted'>Are you sure you want to cancel your monthly subscription ? You’ll lose access only at the end of your current billing period.<br />This action cannot be undone.</p>
                            </div>
                            <div className="col-2">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn mb-2 btn-dark" data-dismiss="modal">No</button>
                            <button type="button" className="btn mb-2 btn-danger" onClick={() => cancel(subId)}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}