import axios from "axios";
import LineChart from "./chart/LineChart";
import TrafficChart from "./chart/TrafficChart";
import DashboardFilter, { type Filter } from "./DashboardFilter";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "../../../../auth/ToastProvider";
import { filterDefault, getSalesDashboardStat, getSubscriptions, type Subscription, type SubscriptionFilter } from "../../../../api/subscription";
import type { MonthlyCount } from "../../../../api/dashboard";
import { formatLocalDate } from "../../../../others/utils";
import { endPage, startPage } from "../../../../others/pagination";

interface SalesStat {
    average_monthly_sales?: string,
    all_time_sales?: number,
    average_churn?: number,
    subscriptions?: MonthlyCount[],
    subscriptions_repartition?: SubscriptionRepartition[],
}

interface SubscriptionRepartition {
    subscription: string,
    value: number
}

export default function SubscriptionDashboard() {
    const {setError} = useToast();
    
    // stats
    const [sales, setSales] = useState<SalesStat>({});
    const fecthSales = async (f: Filter) => {
        try {
            const res = await getSalesDashboardStat(f?.startDate, f?.endDate);
            const data = res.data;
            console.log(res);
            console.log(data);

            if (data) {
                setSales(data);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError("Message: "+ error.response?.data?.error); 
            } else {
                console.log(error);
                setError("Unknown error: "+error);
            }
        }
    }

    const labelsLineChart = useMemo(() => {
        return sales.subscriptions ? sales.subscriptions.map(t => t.month_year) : [];
    }, [sales.subscriptions]);

    const dataLineChart = useMemo(() => {
        return sales.subscriptions ? sales.subscriptions.map(t => t.count) : [];
    }, [sales.subscriptions]);


    const labelsTrafficChart = useMemo(() => {
        return sales.subscriptions_repartition ? sales.subscriptions_repartition.map(t => t.subscription) : [];
    }, [sales.subscriptions_repartition]);

    const dataTrafficChart = useMemo(() => {
        return sales.subscriptions_repartition ? sales.subscriptions_repartition.map(t => t.value) : [];
    }, [sales.subscriptions_repartition]);


    // list subscription 
    const [filter, setFilter] = useState<SubscriptionFilter>(filterDefault);

    const [page, setPage] = useState(0);
    const [size] = useState(8);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

    const fetchSubscriptions = async () => {
        try {
            const res = await getSubscriptions(filter, page, size);
            const pageData = res.data;
            
            setSubscriptions(pageData.content);
            setTotalElements(pageData.total_elements);
            setTotalPages(pageData.total_pages);
        } catch (error: any) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchSubscriptions();
    }, [page])

    const updateFilter = <K extends keyof SubscriptionFilter>(field: K, value: SubscriptionFilter[K]) => {
        setFilter((prev) => ({
            ...prev,
            [field]: value,
        }));
        // console.log(filter);
    };

    return (
        <div className="col-12 container row p-0 m-0 m-0 p-0">
            <div className="col-12">
                <p className="h2 page-title px-0 col-12 mb-0">Dashboard/sales</p>
                <p className="text-muted">All about app sales and user's subscription (monthly sales, sub. status, sub. records, ...)</p>
            </div>

            {/* Filter date */}
            <DashboardFilter onFilter={(filter) => {fecthSales(filter)}} />

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
                                        <span className="h3 mb-0">$ {sales.average_monthly_sales ? sales.average_monthly_sales : "0"}</span>
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
                                        <span className="h3 mb-0">$ {sales.all_time_sales ? sales.all_time_sales : "0"}</span>
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
                                        <span className="h3 mb-0">{sales.average_churn ? sales.average_churn : "0"}%</span>
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
                                    labels: labelsLineChart,
                                    datasets: [
                                        {
                                            label: "Sales",
                                            data: dataLineChart,
                                            borderColor: "#52f1a7",
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
                                <TrafficChart
                                    series={dataTrafficChart}
                                    labels={labelsTrafficChart}
                                />
                            </div>
                            <div className="text-left">
                                <div className="row mb-2">
                                    <div className="col">
                                        <p className="mb-0">{labelsTrafficChart[0]}</p>
                                    </div>
                                    <div className="col-auto text-right">
                                        <p className="mb-0">{dataTrafficChart[0]}%</p>
                                        <span className="dot dot-md bg-primary"></span>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col">
                                        <p className="mb-0">{labelsTrafficChart[1]}</p>
                                    </div>
                                    <div className="col-auto text-right">
                                        <p className="mb-0">{dataTrafficChart[1]}%</p>
                                        <span className="dot dot-md bg-danger"></span>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col">
                                        <p className="mb-0">{labelsTrafficChart[2]}</p>
                                    </div>
                                    <div className="col-auto text-right">
                                        <p className="mb-0">{dataTrafficChart[2]}%</p>
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
                                        <h5 className="modal-title" id="defaultModalLabel">Filter sales list</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div>

                                            <div className="form-group">
                                                <label htmlFor="content">Search in - mail</label>
                                                <textarea id="content" className="form-control" style={{resize: "none"}} onChange={(e) => updateFilter("mail", e.target.value)}/>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="startDate">Start date</label>
                                                <input type="date" id="startDate" className="form-control" onChange={(e) => updateFilter("startDate", e.target.value)}/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="endDate">End date</label>
                                                <input type="date" id="endDate" className="form-control" onChange={(e) => updateFilter("endDate", e.target.value)}/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="subscriptionType" >Subscription type</label>
                                                <select name="" id="subscriptionType" className="form-control" onChange={(e) => updateFilter("subscriptionType", e.target.value)}>
                                                    <option value="" selected>Select a type</option>
                                                    <option value="free">Free Plan</option>
                                                    <option value="pro">Pro</option>
                                                    <option value="company">Company</option>
                                                </select>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="status">Subscription status</label>
                                                <select name="" id="status" className="form-control" onChange={(e) => updateFilter("status", e.target.value)}>
                                                    <option value="" selected>Select a status</option>
                                                    <option value="ACTIVE">ACTIVE</option>
                                                    <option value="CANCELED">CANCELED</option>
                                                    <option value="f">CANCELED</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn mb-2 btn-dark" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn mb-2 btn-primary" onClick={fetchSubscriptions}>Filter</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <div className="col-12 row p-0 m-0">
                <div className="col-xs-10 col-lg-10 col-md-10">
                    <p className="h3 page-title px-0">Subscriptions list</p>
                </div>
                <div className="col-xs-2 col-lg-2 col-md-2 text-center">
                    <button type="button" className="btn mb-2 btn-primary" data-toggle="modal" data-target=".modal-right">
                        <span className="fe fe-filter fe-16 mr-1"></span>Filter
                    </button>
                </div>
            </div>

            
            {/* Pagination */}
            <div className="col-12 row my-2">
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

            {/* List */}
            <div className="col-12 mb-3" style={{minHeight: ""}}>
                <table className="table table-hover table-borderless border-v">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Purchase Date</th>
                            <th>Mail</th>
                            <th>Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map((sub, index) => (
                            <>
                                <tr className="accordion-toggle collapsed" id="c-1" data-toggle="collapse" data-parent="#c-1" href={`#collap-${page * size + index + 1}`} key={index} style={{cursor: "pointer"}}>
                                    <td>{page * size + index + 1}</td>
                                    <td>{formatLocalDate(sub.purchase_date)}</td>
                                    <td>{sub.mail}</td> 
                                    <td>{sub.subscription_type}</td>
                                    <td>
                                        {sub.status && 
                                            <>
                                                {sub.status == "ACTIVE" && <span className="badge badge-pill badge-success text-white">{sub.status}</span>}
                                                {sub.status == "CANCELED" && <span className="badge badge-pill badge-warning text-white">{sub.status}</span>}
                                                {sub.status == "CANCEL_AT_PERIOD_END" && <span className="badge badge-pill badge-danger">{sub.status}</span>}
                                            </>
                                        }
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}