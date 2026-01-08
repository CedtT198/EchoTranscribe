import { useEffect, useState } from "react";
import { type TranscriptionFilter, filterDefault, getTranscriptions } from "../../../api/transcription";
import { sumDefault, type FormDataSummary } from "../../../api/summary";
import type { PageableResponse } from "../../../others/pagination";

function History() {
    const [error, setError] = useState<string>();
    const [filter, setFilter] = useState<TranscriptionFilter>(filterDefault);

    const [data, setData] = useState<FormDataSummary[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageDisplay, setCurrentPageDisplay] = useState(1);

    const fetchTranscriptions = async () => {
        try {
            const res = await getTranscriptions(filter);
            const pageData: PageableResponse = res.data;
            setData(pageData.content);
            setTotalElements(pageData.total_elements);
            setTotalPages(pageData.total_pages);
            setCurrentPageDisplay(pageData.number + 1);

            console.log(res.data);
        } catch (error: any) {
            setError(error);
        }
    }

    // useEffect(() => {
    //     fetchTranscriptions();
    // }, [transcriptions])

    
    
    const updateFilter = <K extends keyof TranscriptionFilter>(field: K, value: TranscriptionFilter[K]) => {
        setFilter((prev) => ({
            ...prev,
            [field]: value,
        }));
        console.log(filter);
    };

    const filterTranscription = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetchTranscriptions();
    };

    return (
        <div className="col-md-12 my-4">
            <div className="container row m-0">
                <div className="col-10">
                    <p className="h2 page-title mb-0">Summary section</p>
                    <p className="mb-4 text-muted">See below all your activities.</p>
                </div>
                <div className="col-2 row p-0 mb-4">
                    <div className="col-6">
                        <button type="button" className="btn mb-2 btn-primary" data-toggle="modal" data-target=".modal-right">Filter</button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-success text-light" type="button" id="actionMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            New
                        </button>
                        <div className="dropdown-menu" aria-labelledby="actionMenuButton">
                            <a className="dropdown-item" href="#">Batch</a>
                            <a className="dropdown-item" href="#">Live</a>
                        </div>
                    </div>
                </div>
            </div>

            
            {error && <div className="alert alert-danger" role="alert">
              <span className="fe fe-minus-circle fe-16 mr-2"></span>{error}
            </div>}

            <div className="card shadow">
                <div className="card-body row">
                    {/* filter */}
                    <div className="col-12 mb-4 mt-1">
                        <div className="container">
                            <form onSubmit={filterTranscription}>
                                
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
                                            <button type="submit" className="btn mb-2 btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>

                    {/* list */}
                    <div className="col-12 mb-3">
                        <table className="table table-hover table-borderless border-v">
                            <thead className="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Details</th>
                                    <th>Type</th>
                                    <th>File</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="accordion-toggle collapsed" id="c-1" data-toggle="collapse" data-parent="#c-1" href="#collap-1">
                                    <td>1</td>
                                    <td>
                                        <h3 className="h5 mb-0">Meeting with the CEO</h3>
                                        <p className="text-muted mb-0">01/01/2003</p>
                                    </td>
                                    <td>Batch</td>
                                    <td>ceo_meeting.mp3</td>
                                    <td className="text-center">
                                        <a href="#" className="text-danger mx-1 fe-16 nav-link" title="Delete">
                                            <span className="fe fe-trash-2"></span>
                                        </a>
                                        <a href="/public/layout/export" className="text-warning mx-1 fe-16 nav-link" title="Export">
                                            <span className="fe fe-download"></span>
                                        </a>
                                    </td>
                                </tr>
                                <tr id="collap-1" className="collapse show in p-3 bg-light">
                                    <td colSpan={5}>
                                        <dl className="row mb-0 mt-1">
                                            <dd className="col-sm-8">
                                                <h3>Summary</h3>
                                                <p className="ml-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto sunt laudantium quis et vel consectetur, excepturi voluptatum minima dicta quia facere natus impedit! Officia ut incidunt perferendis, vel suscipit sit!</p>
                                            </dd>
                                            <dt className="col-2 d-flex align-items-center justify-content-center">Short</dt>
                                            <dt className="col-2 d-flex align-items-center justify-content-center">
                                                <a href="" className="text-secondary">
                                                    <span className="fe fe-edit-2" title="Re-resume"></span>
                                                </a>
                                            </dt>
                                        </dl>
                                    </td>
                                </tr>
                                <tr className="accordion-toggle collapsed" id="c-2474" data-toggle="collapse" data-parent="#c-2474" href="#collap-2474">
                                    <td>2</td>
                                    <td>
                                        <h3 className="h5 mb-0">Live conversation between Alice and bob</h3>
                                        <p className="text-muted mb-0">01/01/2003</p>
                                    </td>
                                    <td>Live</td>
                                    <td> - </td>
                                    <td className="text-center">
                                        <a href="#" className="text-danger mx-1 fe-16 nav-link" title="Delete">
                                            <span className="fe fe-trash-2"></span>
                                        </a>
                                        <a href="/public/layout/export" className="text-warning mx-1 fe-16 nav-link" title="Export">
                                            <span className="fe fe-download"></span>
                                        </a>
                                    </td>
                                </tr>
                                <tr id="collap-2474" className="collapse show in p-3 bg-light">
                                    <td colSpan={5}>
                                        <dl className="row mb-0 mt-1">
                                            <dd className="col-sm-8">
                                                <h3>Summary</h3>
                                                <p className="ml-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto sunt laudantium quis et vel consectetur, excepturi voluptatum minima dicta quia facere natus impedit! Officia ut incidunt perferendis, vel suscipit sit!</p>
                                            </dd>
                                            <dt className="col-2 d-flex align-items-center justify-content-center">Standard</dt>
                                            <dt className="col-2 d-flex align-items-center justify-content-center">
                                                <a href="" className="text-secondary">
                                                    <span className="fe fe-edit-2" title="Re-resume"></span>
                                                </a>
                                            </dt>
                                        </dl>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* pagination */}
                    <div className="col-12 row">
                        <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ color: '#999' }}>
                                {loading ? (
                                    'Chargement...'
                                ) : (
                                    `Showing ${startEntry} to ${endEntry} of ${totalElements} entries`
                                )}
                            </div>

                            <Pagination
                                current={currentPageDisplay}
                                total={totalElements}
                                pageSize={pagination.size}
                                onChange={handlePageChange}
                                onShowSizeChange={handlePageSizeChange}
                                showSizeChanger
                                pageSizeOptions={['10', '20', '50', '100']}
                                disabled={loading}
                            />
                        </div>
                        {/* <div className="col-md-6 col-lg-6 col-xs-12">
                            <p className="text-muted d-flex align-items-center">Showing 1 to 16 of 124 entites</p>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xs-12 text-right">
                            <nav aria-label="Table Paging" className="">
                                <ul className="pagination justify-content-end mb-0">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History;