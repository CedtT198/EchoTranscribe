import { useEffect, useState } from "react";
import { type TranscriptionFilter, filterDefault, getTranscriptions } from "../../../../api/transcription";
import { deleteTranscription, type Summary } from "../../../../api/summary";
import { endPage, startPage } from "../../../../others/pagination";
import { Link } from "react-router-dom";
import { formatLocalDate } from "../../../../others/utils";
import { useToast } from "../../../../auth/ToastProvider";

export default function History() {
    const [filter, setFilter] = useState<TranscriptionFilter>(filterDefault);
    
    const [page, setPage] = useState(0);
    const [size] = useState(8);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [transcriptions, setTranscriptions] = useState<Summary[]>([]);

    const fetchTranscriptions = async () => {
        try {
            const res = await getTranscriptions(filter, page, size);
            const pageData = res.data;
            
            setTranscriptions(pageData.content);
            setTotalElements(pageData.total_elements);
            setTotalPages(pageData.total_pages);

            console.log(res.data);
        } catch (error: any) {
            setError(error);
        }
    }
    
    useEffect(() => {
        fetchTranscriptions();
    }, [page, filter])

    
    const updateFilter = <K extends keyof TranscriptionFilter>(field: K, value: TranscriptionFilter[K]) => {
        setFilter((prev) => ({
            ...prev,
            [field]: value,
        }));
        // console.log(filter);
    };

    const {setSuccess, setError} = useToast();
    const del = async (id: string) => {
        console.log(id);
        try {
            const res = await deleteTranscription(id);
            const data = res.data;

            if (data.success) {
                setSuccess("Transcription deleted successfuly.");
            }
                fetchTranscriptions();
        }
        catch(error: any) {
            setError("Error trying to delete "+id+" transcription: "+error)
        }
    }

    // const filterTranscription = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     await fetchTranscriptions();
    // };

        return (
            <div className="col-md-12 my-4">
                <div className="container row m-0">
                    <div className="col-10">
                        <p className="h2 page-title mb-0">Summary section</p>
                        <p className="mb-4 text-muted">See below all your activities.</p>
                    </div>
                    <div className="col-2 row p-0 mb-4">
                        <div className="col-6">
                            <button type="button" className="btn mb-2 btn-primary" data-toggle="modal" data-target=".modal-right">
                                <span className="fe fe-filter fe-16 mr-1"></span>Filter
                            </button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-success text-light" type="button" id="actionMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="fe fe-plus fe-16 mr-1"></span>New
                            </button>
                            <div className="dropdown-menu" aria-labelledby="actionMenuButton">
                                <Link className="dropdown-item"  to="/public/layout/batch">Batch</Link>
                                <Link className="dropdown-item"  to="/public/layout/live">Live</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow">
                    <div className="card-body row">
                        
                        {/* pagination */}
                        <div className="col-12 row">
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

                        {/* filter */}
                        <div className="col-12 mb-4 mt-1">
                            <div className="container">
                                <form>
                                    
                                    <div className="modal fade modal-right modal-slide" tabIndex={-1} role="dialog" aria-labelledby="defaultModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-sm" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="defaultModalLabel">Filter(s)</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <div>

                                                        <div className="form-group">
                                                            <label htmlFor="startDate">Start date</label>
                                                            <input type="date" id="startDate" className="form-control" onChange={(e) => updateFilter("startDate", e.target.value)}/>
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label htmlFor="endDate">End date</label>
                                                            <input type="date" id="endDate" className="form-control" onChange={(e) => updateFilter("endDate", e.target.value)}/>
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label htmlFor="content">Search in content</label>
                                                            <textarea id="content" className="form-control" style={{resize: "none"}} onChange={(e) => updateFilter("contentPhrase", e.target.value)}/>
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label htmlFor="summary">Search in summary</label>
                                                            <textarea id="summary" className="form-control" style={{resize: "none"}} onChange={(e) => updateFilter("summaryPhrase", e.target.value)}/>
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label htmlFor="transcriptionType">Transcription type</label>
                                                            <select name="" id="transcriptionType" className="form-control" onChange={(e) => updateFilter("transcriptionType", e.target.value)}>
                                                                <option value="batch">Batch</option>
                                                                <option value="live">Live</option>
                                                            </select>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn mb-2 btn-dark" data-dismiss="modal">Close</button>
                                                    {/* <button type="submit" className="btn mb-2 btn-primary">Save changes</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>

                        {/* list */}
                        <div className="col-12 mb-3" style={{minHeight: "100vh"}}>
                            <table className="table table-hover table-borderless border-v">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Details</th>
                                        <th>Type</th>
                                        <th>File</th>
                                        <th>Duration</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transcriptions.map((t, index) => (
                                        <>
                                            <tr className="accordion-toggle collapsed" id="c-1" data-toggle="collapse" data-parent="#c-1" href={`#collap-${page * size + index + 1}`} key={index} style={{cursor: "pointer"}}>
                                                <td>{page * size + index + 1}</td>
                                                <td>
                                                    <p className="h4 mb-0">{t.title}</p>
                                                    <p className="h6 mb-0">{t.subtitle}</p>
                                                    <p className="text-muted mb-0">{formatLocalDate(t.creation_date)}</p>
                                                </td>
                                                <td>{t.transcription_type}</td> 
                                                <td>{t.file}</td>
                                                <td>{t.file_duration} seconds</td>
                                                <td className="row m-0 justify-content-center align-items-center">
                                                    <button className="btn btn-danger text-white fe-16 nav-link m-1" title="Delete" onClick={() => del(t.id)}>
                                                        <span className="fe fe-trash-2"></span>
                                                    </button>
                                                    <Link to="/public/layout/export" className="btn btn-info text-white fe-16 nav-link m-1" title="Export">
                                                        <span className="fe fe-download"></span>
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr id={`collap-${page * size + index + 1}`} className="collapse in p-3 bg-light">
                                                <td colSpan={6}>
                                                    <dl className="row mb-0 mt-1">
                                                        {t.content && 
                                                            <dd className="col-12">
                                                                <p className="h4">Transcription</p>
                                                                <p className="ml-3">{t.content}</p>
                                                            </dd>
                                                        }
                                                        {t.summary && 
                                                            <>
                                                                <dd className="col-12">
                                                                    <p className="h4">Summary</p>
                                                                    <p className="ml-3">{t.summary}</p>
                                                                </dd>
                                                                <dt className="col-1 d-flex align-items-center justify-content-center">{t.goal}</dt>
                                                                <dt className="col-1 d-flex align-items-center justify-content-center">{t.length}</dt>
                                                                <dt className="col-1 d-flex align-items-center justify-content-center">{t.length}</dt>
                                                            </>
                                                        }
                                                        {/* <dt className="col-1 d-flex align-items-center justify-content-center">
                                                            <a href="" className="text-secondary">
                                                                <span className="fe fe-edit-2" title="Re-resume"></span>
                                                            </a>
                                                        </dt> */}
                                                    </dl>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        )
}
