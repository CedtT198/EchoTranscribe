import { useState, useEffect } from "react";
import { type TranscriptionFilter, filterDefault } from "../../../../api/transcription";
import { getReviews, getReviewStats, getStarCount, type Review, type ReviewStats, hasCommented } from "../../../../api/review";
import { endPage, startPage } from "../../../../others/pagination";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { formatLocalDate } from "../../../../others/utils";
import { useToast } from "../../../../auth/ToastProvider";

export default function ListReview() {
    // fetch review global stat
    const { setError } = useToast();
    const [reviewStats, setReviewStats] = useState<ReviewStats>();
    const fetchReviewStats = async () => {
        try {
            const res = await getReviewStats();            
            setReviewStats(res.data);
        } catch (error: any) {
            setError(error);
        }
    }

    // init data and pagination
    const [filter] = useState<TranscriptionFilter>(filterDefault);
    
    const [page, setPage] = useState(0);
    const [size] = useState(12);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [reviews, setReviews] = useState<Review[]>([]);

    const fetchReviews = async (stars: number[]) => {
        try {
            const res = await getReviews(page, size, "", stars);
            const pageData = res.data;
            
            setReviews(pageData.content);
            console.log(reviews)
            setTotalElements(pageData.total_elements);
            setTotalPages(pageData.total_pages);
        } catch (error: any) {
            setError(error);
        }
    }
    
    const { user } = useAuth0();
    const [ alreadyCommented, setAlreadyCommented] = useState<boolean>(false);
    const fetchIfHasCommented = async () => {
        try {
            const res = await hasCommented(user?.sub);
            if (res) {
                setAlreadyCommented(res.data);
            }
        } catch (error: any) {
            setError(error);
        }
    }
    
    useEffect(() => {
        fetchReviews([]);
        fetchReviewStats();
        fetchIfHasCommented();
    }, [page, filter, alreadyCommented])

    // star filter
    const [selectedStars, setSelectedStars] = useState<number[]>([]);
    const handleStarChange = (star: number) => {
        setPage(0);
        setSelectedStars(prev => prev.includes(star)? prev.filter(s => s !== star) : [...prev, star]);
    };

    useEffect(() => {
        fetchReviews(selectedStars);
    }, [page, selectedStars]);

    return (
        <div>
            <div className="col-10">
                <p className="h2 page-title mb-0">Reviews section</p>
                <p className="mb-4 text-muted">Write your thoughts and help us to improve our algorithms for a better results.</p>
            </div>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center my-3">
                    <div className="mx-4">
                        <p className="fe-32 font-weight-bold m-0 d-flex align-items-center">
                            <img src="/images/star_full.png" alt="Plenty stars picture" className="mr-2"></img>{reviewStats?.average_star}
                        </p>
                        <p className="mb-1">{reviewStats?.total_reviews} Reviews</p>
                    </div>
                    <div className="mx-5">
                        {!alreadyCommented && <Link className="btn btn-dark" to="/public/layout/addReview" >Review</Link>}
                    </div>
                </div>

                {/* Filter */}
                <div className="card card-body my-4">
                    <p className="fe-16 font-weight-bold mb-4">
                        Filter<span className="fe fe-filter text-dark ml-2"></span>
                    </p>
                    <div className="container">

                        {/* <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" className="custom-control-input" id="customControlValidation1" required>
                            <label className="custom-control-label" for="customControlValidation1">Check this custom checkbox</label>
                        </div> */}

                        {Array.from({ length: 5 }, (_, i) => (
                            <div className="mx-3 row" key={i}>
                                <div className="col-xs-2 col-md-2 col-lg-2 custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id={`starFilter-${i}`} onChange={() => handleStarChange(i+1)} checked={selectedStars.includes(i+1)}/>
                                    <label className="custom-control-label" htmlFor={`starFilter-${i}`}>{i+1} star</label>
                                </div>
                                <div className="col-md-10 col-xs-10 col-lg-10 ">
                                    <div className="progress mb-3">
                                        <div className="progress-bar bg-primary" role="progressbar" style={{width: getStarCount(i, reviewStats)+"%"}}  aria-valuenow={getStarCount(i, reviewStats)} aria-valuemin={0} aria-valuemax={100}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-5">
                    <h2 className="fe-24 font-weight-bolder mb-0">List</h2>
                    <p className="text-muted">Show all</p>
                </div>
                
                
                {/* pagination */}
                <div className="col-12 row mb-4">
                    <div className="col-md-6 col-lg-6 col-xs-12">
                        <p className="text-muted d-flex align-items-center">Showing {page * size + 1} to {Math.min((page + 1) * size, totalElements)} of {totalElements} entries</p>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xs-12 text-right">
                        <nav aria-label="Table Paging" className="">
                            <ul className="pagination justify-content-end mb-0">
                                <li className={`page-item ${page === 0 ? "d-none" : "d-block"}`}>
                                    <button className="page-link" onClick={() => setPage(p => p - 1)}>Previous</button>
                                </li>
                                {Array.from({ length: endPage(totalPages, page) - startPage(page) }, (_, i) => startPage(page) + i).map(i => (
                                    <li key={i} className={`page-item ${page === i ? "active" : ""}`}>
                                        <button className="page-link" onClick={() => setPage(i)}>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                                {startPage(page) > 0 && <li className="page-item disabled"><span className="page-link">…</span></li>}
                                <li className={`page-item ${page === totalPages - 1 ? "d-none" : "d-block"}`}>
                                    <button className="page-link" onClick={() => setPage(p => p + 1)}>Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Reviews list */}
                <div className="row">
                    {reviews.map((r, index) => (
                        <div className="col-md-4 col-lg-4 col-12 d-flex align-items-stretch my-1" style={{height: "auto"}} key={index}>
                            <div className="card shadow">
                                <div className="card-header mt-2">
                                    <div className="container row">
                                        {/* <div className="col-1 mx-0">
                                            <span className="avatar avatar-sm">
                                                <img src="./assets/avatars/face-1.jpg" alt="p" className="avatar-img rounded-circle"/>
                                            </span>
                                        </div> */}
                                        <div className="col-9">
                                            <p className="mb-0">{r.name} {r.first_name}</p>
                                            <p className="fe-12 text-muted mt-0">{formatLocalDate(r.creation_date)}</p>
                                        </div>
                                        {/* <div className="col-2">
                                            <button type="button" className="btn mb-2 btn-outline-danger mx-1" data-toggle="modal" data-target="#verticalModal">
                                                <span className="fe fe-16 fe-trash"></span>
                                            </button>
                                            <div className="modal fade" id="verticalModal" tabIndex={-1} role="dialog" aria-labelledby="verticalModalTitle" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="verticalModalTitle">Confirm</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">Are you sure about deleting your reviews ?</div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn mb-2 btn-dark" data-dismiss="modal">No</button>
                                                                <button type="button" className="btn mb-2 btn-danger">Yes</button>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" className="btn mb-2 btn-outline-warning mx-1">
                                                <span className="fe fe-16 fe-edit"></span>
                                            </button>
                                        </div> */}
                                        <div className="col-12 ml-1 d-flex align-items-center">
                                            {Array.from({ length: r.stars }, (_, i) => (
                                                <>
                                                    <img style={{width: "8%"}} src="/images/star_full.png" alt="Plenty stars picture" key={i}></img>
                                                </>
                                            ))}

                                            {Array.from({ length: 5-r.stars }, (_, i) => (
                                                <>
                                                    <img style={{width: "8%"}} src="/images/star_empty.png" alt="Empty stars picture" key={i}></img>
                                                </>
                                            ))}
                                            <span className="mx-2" style={{fontSize: 14}}>{r.stars}</span>
                                        </div>
                                    </div>
                                    {/* <div className="ml-2">
                                        <p className="fe-12 text-muted">{formatLocalDate(r.creation_date)}</p>
                                    </div> */}
                                </div>
                                <div className="card-body">
                                    <p>{r.review}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* pagination */}
                <div className="col-12 row mt-5">
                    <div className="col-md-6 col-lg-6 col-xs-12">
                        <p className="text-muted d-flex align-items-center">Showing {page * size + 1} to {Math.min((page + 1) * size, totalElements)} of {totalElements} entries</p>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xs-12 text-right">
                        <nav aria-label="Table Paging" className="">
                            <ul className="pagination justify-content-end mb-0">
                                <li className={`page-item ${page === 0 ? "d-none" : "d-block"}`}>
                                    <button className="page-link" onClick={() => setPage(p => p - 1)}>Previous</button>
                                </li>
                                {Array.from({ length: endPage(totalPages, page) - startPage(page) }, (_, i) => startPage(page) + i).map(i => (
                                    <li key={i} className={`page-item ${page === i ? "active" : ""}`}>
                                        <button className="page-link" onClick={() => setPage(i)}>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                                {startPage(page) > 0 && <li className="page-item disabled"><span className="page-link">…</span></li>}
                                <li className={`page-item ${page === totalPages - 1 ? "d-none" : "d-block"}`}>
                                    <button className="page-link" onClick={() => setPage(p => p + 1)}>Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}


{/* <div>
    <div className="col-10">
        <h2 className="page-title mb-0">Reviews section</h2>
        <p className="mb-4 text-muted">Write your thoughts and help us to improve our algorithms for a better results.</p>
    </div>
    <div className="card shadow">
        <div className="card-body row">
            
        </div>
    </div>
</div> */}