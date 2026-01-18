import LineChart from "./chart/LineChart";
import TrafficChart from "./chart/TrafficChart";

export default function SubscriptionDashboard() {
    return (
        <div className="col-12 container row p-0 m-0 m-0 p-0">
            <div className="col-12">
                <p className="h2 page-title px-0 col-12 mb-0">Dashboard/sales</p>
                <p className="text-muted">All about app sales and user's subscription (monthly sales, sub. status, sub. records, ...)</p>
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
                    <div className="col-md-4 col-lg-4 col-xs-12 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-3 text-center">
                                        <span className="circle circle-sm bg-primary">
                                            <i className="fe fe-16 fe-dollar-sign text-white mb-0"></i>
                                        </span>
                                    </div>
                                    <div className="col">
                                        <p className="small text-muted mb-0">Average Monthly Sales</p>
                                        <span className="h3 mb-0">$125</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-xs-12 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-3 text-center">
                                        <span className="circle circle-sm bg-primary">
                                            <i className="fe fe-16 fe-credit-card text-white mb-0"></i>
                                        </span>
                                    </div>
                                    <div className="col">
                                        <p className="small text-muted mb-0">All time Sales</p>
                                        <span className="h3 mb-0">$4693</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-xs-12 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-3 text-center">
                                        <span className="circle circle-sm bg-primary">
                                            <i className="fe fe-16 fe-trending-down text-white mb-0"></i>
                                        </span>
                                    </div>
                                    <div className="col">
                                        <p className="small text-muted mb-0">Average Churn</p>
                                        <span className="h3 mb-0">23%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Chart */}
            <div className="col-12 row p-0 m-0 mb-4">
                <div className="col-md-8 col-lg-8 col-xs-12 text-center row p-0 mx-0">
                    <div className="card col-12 p-3">
                        <div className="card-header">
                            <p className="card-title mb-0">Monthly Sales Chart</p>
                        </div>
                        <div className="col-12">
                            <LineChart
                                height={250}
                                data={{
                                    labels: ["Jan", "Feb", "Mar", "Apr"],
                                    datasets: [
                                        {
                                            label: "Sales",
                                            data: [50, 57, 45, 60],
                                            borderColor: "#1b68ff",
                                            tension: 0.3,
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4 col-lg-4 col-xs-12 text-center row mx-0">        
                        
                    <div className="card shadow">
                        <div className="card-header">
                            <strong className="card-title">Sales per Subscription</strong>
                            {/* <a className="float-right small text-muted" href="#!">View all</a> */}
                        </div>
                        <div className="card-body">
                            <div className="chart-box mb-3" style={{minHeight: "180px;"}}>
                                <TrafficChart />
                            </div>
                            <div className="text-left">
                                <div className="row mb-2">
                                    <div className="col">
                                        <p className="mb-0">Free Plan</p>
                                    </div>
                                    <div className="col-auto text-right">
                                        <p className="mb-0">23%</p>
                                        <span className="dot dot-md bg-primary"></span>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col">
                                        <p className="mb-0">Pro</p>
                                    </div>
                                    <div className="col-auto text-right">
                                        <p className="mb-0">67%</p>
                                        <span className="dot dot-md bg-danger"></span>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col">
                                        <p className="mb-0">Company</p>
                                    </div>
                                    <div className="col-auto text-right">
                                        <p className="mb-0">10%</p>
                                        <span className="dot dot-md bg-dark"></span>
                                    </div>
                                </div>
                            </div>
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
                                        <h5 className="modal-title" id="defaultModalLabel">Filter saless list</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div>

                                            <div className="form-group">
                                                <label htmlFor="content">Search in - mail</label>
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
                                                <label htmlFor="subscriptionType">Subscription type</label>
                                                <select name="" id="subscriptionType" className="form-control">
                                                    <option value="free">Free Plan</option>
                                                    <option value="pro">Pro</option>
                                                    <option value="company">Company</option>
                                                </select>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="subscriptionType">Subscription status</label>
                                                <select name="" id="subscriptionType" className="form-control">
                                                    <option value="paid">Paid</option>
                                                    <option value="canceled">Canceled</option>
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
                    <p className="text-muted d-flex align-items-center">Showing 1 to 4 of 4 entries</p>
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
                            <th>Mail</th>
                            <th>Purchase Date</th>
                            <th>Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                            <>
                                <tr className="accordion-toggle collapsed">
                                    {/* <td>{page * size + index + 1}</td> */}
                                    <td>6954314590a2294dd08fcb26</td>
                                    <td>cedrictiavina426@gmail.com</td> 
                                    <td>22/10/2025</td>
                                    <td>Free Plan</td>
                                    <td>-</td>
                                </tr>
                                <tr className="accordion-toggle collapsed">
                                    {/* <td>{page * size + index + 1}</td> */}
                                    <td>6954314590a2294dd08fcb26</td>
                                    <td>cedrictiavina426@gmail.com</td> 
                                    <td>22/10/2025</td>
                                    <td>Pro</td>
                                    <td>Paid</td>
                                </tr>
                                <tr className="accordion-toggle collapsed">
                                    {/* <td>{page * size + index + 1}</td> */}
                                    <td>69668fb42746b03e6bffaf96</td>
                                    <td>Damn@gmail.com</td> 
                                    <td>22/10/2025</td>
                                    <td>Free Plan</td>
                                    <td>-</td>
                                </tr>
                                <tr className="accordion-toggle collapsed">
                                    {/* <td>{page * size + index + 1}</td> */}
                                    <td>69668fb42746b03e6bffaf96</td>
                                    <td>Damn@gmail.com</td> 
                                    <td>22/10/2025</td>
                                    <td>Company</td>
                                    <td>Paid</td>
                                </tr>
                            </>
                    </tbody>
                </table>
            </div>
        </div>
    )
}