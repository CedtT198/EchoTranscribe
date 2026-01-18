import { Link } from "react-router-dom";
import LineChart from "./chart/LineChart";

export default function UsersDashboard() {
    return (
        <div className="col-12 container row p-0 m-0 m-0 p-0">
            <div className="col-12">
                <p className="h2 page-title px-0 col-12 mb-0">Dashboard/user</p>
                <p className="text-muted">All about users</p>
            </div>

            {/* Filter between 2 dates */}
            <div className="col-12 row p-0 mb-4">
                <div className="col-12">
                    <form className="offset-lg-4 offset-md-4 col-md-8 col-lg-8 col-xs-12 row p-0 m-0">
                        <div className="form-group col-md-4 col-lg-4 col-xs-12">
                            {/* <label htmlFor="startDate">Start date</label> */}
                            {/* <input type="date" id="startDate" className="form-control" onChange={(e) => updateFilter("startDate", e.target.value)}/> */}
                            <input type="date" id="startDate" className="form-control"/>
                        </div>
                        <div className="form-group col-md-4 col-lg-4 col-xs-12">
                            {/* <label htmlFor="endDate">Start date</label> */}
                            <input type="date" id="endDate" className="form-control"/>
                        </div>
                        <div className="form-group col-md-2 col-lg-2 col-xs-12">
                            <button className="btn btn-primary form-control">
                                <span className="fe fe-filter mr-1"></span>Filter
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Stats number */}
            <div className="col-12 row p-0 m-0 mb-4">
                <div className="col-12 text-center row p-0 m-0">
                    <div className="offset-md-4 offset-lg-4 col-md-4 col-lg-4 col-xs-12 mb-2">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-3 text-center">
                                        <span className="circle circle-sm bg-primary">
                                            <i className="fe fe-16 fe-users text-white mb-0"></i>
                                        </span>
                                    </div>
                                    <div className="col pr-0">
                                        <p className="small text-muted mb-0">Total Users</p>
                                        <span className="h3 mb-0">1250</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Chart */}
            <div className="col-12 row p-0 m-0 mb-4">
                <div className="col-12 text-center row p-0 mb-2 mx-0">
                    <div className="card col-12 p-3">
                        <div className="card-header">
                            <p className="card-title mb-0">Users per Subscription Chart</p>
                        </div>
                        <div className="col-12">
                            <LineChart
                                data={{
                                    labels: ["Jan", "Feb", "Mar", "Apr"],
                                    datasets: [
                                        {
                                            label: "Free plan",
                                            data: [50, 57, 45, 60],
                                            borderColor: "#1591f7",
                                            tension: 0.3,
                                        },
                                        {
                                            label: "Pro",
                                            data: [5, 7, 10, 20],
                                            borderColor: "#ec1717",
                                            tension: 0.3,
                                        },
                                        {
                                            label: "Company",
                                            data: [2, 3, 6, 5],
                                            borderColor: "#000000",
                                            tension: 0.3,
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter multicriteria */}
            <div className="col-12 mb-4 mt-1">
                <div className="container">
                    <form>
                        
                        <div className="modal fade modal-right modal-slide" tabIndex={-1} role="dialog" aria-labelledby="defaultModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-sm" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="defaultModalLabel">Filter users list</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div>

                                            <div className="form-group">
                                                <label htmlFor="content">Search in name - first name - mail</label>
                                                <textarea id="content" className="form-control" style={{resize: "none"}}/>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="startDate">Start date</label>
                                                <input type="date" id="startDate" className="form-control"/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="endDate">End date</label>
                                                <input type="date" id="endDate" className="form-control"/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="subscriptionType">Country</label>
                                                <select name="" id="subscriptionType" className="form-control">
                                                    <option value="madagascar">Madagascar</option>
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
            <div className="col-12 row p-0 m-0">
                <div className="col-xs-10 col-lg-10 col-md-10">
                    <p className="h3 page-title px-0">List</p>
                </div>
                <div className="col-xs-2 col-lg-2 col-md-2 text-center">
                    <button type="button" className="btn mb-2 btn-primary" data-toggle="modal" data-target=".modal-right">
                        <span className="fe fe-filter fe-16 mr-1"></span>Filter
                    </button>
                </div>
            </div>

            
            {/* Pagination */}
            <div className="col-12 row my-3">
                <div className="col-md-6 col-lg-6 col-xs-12">
                    <p className="text-muted d-flex align-items-center">Showing 1 to 8 of 14 entries</p>
                </div>
                <div className="col-md-6 col-lg-6 col-xs-12 text-right">
                    <nav aria-label="Table Paging" className="">
                        <ul className="pagination justify-content-end mb-0">
                            <li className={`page-item`}>
                                <button className="page-link">Previous</button>
                            </li>
                            <button className="page-link active">1</button>
                            <button className="page-link">2</button>
                            <li className={`page-item`}>
                                <button className="page-link">Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* List */}
            <div className="col-12 mb-3" style={{minHeight: ""}}>
                <table className="table table-hover table-borderless border-v">
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Name & First name</th>
                            <th>Mail</th>
                            <th>Joined Date</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                            <>
                                <tr className="accordion-toggle collapsed">
                                    {/* <td>{page * size + index + 1}</td> */}
                                    <td>6954314590a2294dd08fcb26</td>
                                    <td>Rakotoarimisa Cedric Tiavina</td>
                                    <td>cedrictiavina426@gmail.com</td> 
                                    <td>22/10/2025</td>
                                    <td className="row m-0 p-0 justify-content-center align-items-center">
                                        <Link to="#" className="btn btn-dark fe-16 nav-link">
                                            <span className="fe fe-plus"></span>
                                        </Link>
                                    </td>
                                </tr>
                                <tr className="accordion-toggle collapsed">
                                    {/* <td>{page * size + index + 1}</td> */}
                                    <td>69668fb42746b03e6bffaf96</td>
                                    <td>Damn</td>
                                    <td>Damn@gmail.com</td> 
                                    <td>22/10/2025</td>
                                    <td className="row m-0 p-0 justify-content-center align-items-center">
                                        <Link to="#" className="btn btn-dark fe-16 nav-link">
                                            <span className="fe fe-plus"></span>
                                        </Link>
                                    </td>
                                </tr>
                            </>
                    </tbody>
                </table>
            </div>
        </div>
    )
}