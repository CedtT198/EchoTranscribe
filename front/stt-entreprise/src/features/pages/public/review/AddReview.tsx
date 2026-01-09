import { useState } from "react"
import { revDefault, save, type Review } from "../../../../api/review";
import { useNavigate } from "react-router-dom";

function AddReview () {
    // updating review to save
    const [ review, setReview ] = useState<Review>(revDefault);
    
    const [ content, setContent ] = useState("");
    const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value: string = e.target.value;
        setContent(value);
        review.review = value;

        console.log(review);
    };

    const handleStarChange = (star: number) => {
        review.stars = star;
        console.log(review);
    };

    // save review
    const [ error, setError ] = useState<string>();
    const [ success, setSuccess ] = useState<string>();
    const navigate = useNavigate();
    const saveReview = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await save(review);
            const data = res.data;
            if (data.success) {
                setSuccess(data.success);
                navigate("/public/layout/listReview");
            }
        } catch (error: any) {
            setError(error);
        }
    }

    return (
        <div>
            <div className="col-10">
                <p className="h2 page-title mb-0">Your review</p>
                <p className="mb-4 text-muted">Write your thoughts and help us to improve our algorithms for a better results.</p>
            </div>
            <div className="container">
                <div className="col-12">
                    <div className="row mb-4">
                        <div className="col-md-12">
                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <form onSubmit={saveReview}>
                                        <div className="form-group col-md-12 mb-5">
                                            <p className="h5 card-title">Comment</p>
                                            <textarea className="w-100 p-3" rows={1} style={{minHeight: "150px", resize: "none"}} onChange={handleReviewChange} value={content}></textarea>
                                        </div>
                                        <div className="container row mx-0 mb-4">
                                            <p className="col-12 h5 card-title">Rate</p>
                                            <div className="col-md-5 col-lg-5 col-xs-12">
                                                <div className="radio-group-rounded">
                                                    {Array.from({ length: 5 }, (_, i) => (
                                                        <>
                                                            <input type="radio" id={`star${i+1}`} name="radio-stacked" required onChange={() => handleStarChange(i+1)}/>
                                                            <label htmlFor={`star${i+1}`}>{i+1} stars</label>
                                                        </>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="form-group offset-md-4 col-md-2 offset-lg-4 col-lg-2 col-xs-12">
                                                <button type="submit" className="btn mb-2 btn-primary rounded-pill">Save my review</button>
                                            </div>
                                        </div>
                                        {error && <div className="alert alert-danger" role="alert">
                                            <span className="fe fe-minus-circle fe-16 mr-2"></span>{error}
                                        </div>}
                                        {success && <div className="alert alert-success" role="alert">
                                            <span className="mr-2"></span>{success}
                                        </div>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddReview