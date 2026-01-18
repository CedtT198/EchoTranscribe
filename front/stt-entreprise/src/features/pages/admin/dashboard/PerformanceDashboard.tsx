import LineChart from "./chart/LineChart";

export default function PerformanceDashboard() {
    return (
        <div className="col-12 container row p-0 m-0 m-0 p-0">
            <div className="col-12">
                <p className="h2 page-title px-0 col-12 mb-0">Dashboard/app performance</p>
                <p className="text-muted">Global view of the application's performance</p>
            </div>

            {/* Multicriteria filter */}
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
                    <div className="col-md-4 col-xl-4 col-xs-12 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-3 text-center">
                                        <span className="circle circle-sm bg-primary">
                                            <i className="fe fe-16 fe-type text-white mb-0"></i>
                                        </span>
                                    </div>
                                    <div className="col pr-0">
                                        <p className="small text-muted mb-0">Most used language</p>
                                        <span className="h3 mb-0">English</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-xl-4 col-xs-12 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-3 text-center">
                                        <span className="circle circle-sm bg-primary">
                                            <i className="fe fe-16 fe-watch text-white mb-0"></i>
                                        </span>
                                    </div>
                                    <div className="col pr-0">
                                        <p className="small text-muted mb-0">Total of transcription</p>
                                        <span className="h3 mb-0">186 hours</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-xl-4 col-xs-12 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-3 text-center">
                                        <span className="circle circle-sm bg-primary">
                                            <i className="fe fe-16 fe-zap text-white mb-0"></i>
                                        </span>
                                    </div>
                                    <div className="col">
                                        <p className="small text-muted mb-0">Avg transcription speed</p>
                                        <span className="h3 mb-0">5 min</span>
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
                            <p className="card-title mb-0">Number of Transcriptions Chart</p>
                            <p className="text-muted">Either file/live transcribing with summary or not.</p>
                        </div>
                        <div className="col-12">
                            <LineChart
                                data={{
                                    labels: ["Jan", "Feb", "Mar", "Apr"],
                                    datasets: [
                                        {
                                            label: "Transcriptions",
                                            data: [10, 20, 15, 30],
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
        </div>
    )
}