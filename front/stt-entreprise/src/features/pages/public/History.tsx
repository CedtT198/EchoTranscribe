function History() {
    return (
        <div className="col-md-12 my-4">
            <div className="col-10">
                <h2 className="page-title mb-0">Summary section</h2>
                <p className="mb-4 text-muted">See below all your activities.</p>
            </div>
            <div className="card shadow">
                <div className="card-body row">
                    {/* filter */}
                    <div className="col-12 mb-4 mt-1">
                        <div className="container">
                            <form className="row">
                                <div className="form-group col-md-2 col-lg-2 col-xs-12">
                                    <label htmlFor="search" className="sr-only">Search</label>
                                    <input type="text" className="form-control" id="search" name="search" placeholder="Search"/>
                                </div>
                                <div className="form-group col-md-3 col-lg-3 col-xs-12">
                                    <label htmlFor="date_begin" className="sr-only">Date begin</label>
                                    <input type="date" className="form-control" id="date_begin" name="date_begin"/>
                                </div>
                                <div className="form-group col-md-3 col-lg-3 col-xs-12">
                                    <label htmlFor="date_end" className="sr-only">Date end</label>
                                    <input type="date" className="form-control" id="date_end" name="date_end"/>
                                </div>
                                <div className="form-group col-md-2 col-lg-2 col-xs-12">
                                    <select className="custom-select mr-sm-2" id="inlineFormCustomSelectPref">
                                        <option selected>Choose</option>
                                        <option value="1">Batch</option>
                                        <option value="2">Live</option>
                                    </select>
                                </div>
                                <div className="form-group col-xs-6 mr-3 ml-2">
                                    <button className="btn btn-primary">Filter</button>
                                </div>
                                <div className="form-group col-xs-6">
                                    <button className="btn btn-success text-light" type="button" id="actionMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        New
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="actionMenuButton">
                                        <a className="dropdown-item" href="#">Batch</a>
                                        <a className="dropdown-item" href="#">Live</a>
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
                        <div className="col-md-6 col-lg-6 col-xs-12">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History;