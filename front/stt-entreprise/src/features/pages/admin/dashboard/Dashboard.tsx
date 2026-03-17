import { useMemo, useState } from "react";
import type SubscriptionRepartition from "../../../../api/subscription";
import PieChart from "./chart/PieChart";
import DashboardFilter, { type Filter } from "./DashboardFilter";
import axios from "axios";
import { useToast } from "../../../../auth/ToastProvider";
import { getDashboardStat, type MonthlyCount } from "../../../../api/dashboard";
import TrafficChart from "./chart/TrafficChart";
import BarChart from "./chart/BarChart";

interface GeneralStat {
    total_users?: number,    
    total_hours_transcribed?: number,
    average_monthly_sales?: number,
    average_review?: number,
    total_churn?: number,    
    total_sales?: number,
    subscriptions_repartition?: SubscriptionRepartition[],
    subscriptions?: MonthlyCount[],
}

export default function Dashboard() {
    const {setError} = useToast();
    
    const [stat, setStat] = useState<GeneralStat>({});
    const fecthStat = async (f: Filter) => {
        try {
            const res = await getDashboardStat(f?.startDate, f?.endDate);
            const data = res.data;
            console.log(res);
            console.log(data);

            if (data) {
                setStat(data);
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

    const dataChart = useMemo(() => {
        return stat.subscriptions_repartition ? stat.subscriptions_repartition.map(t => t.value) : [];
    }, [stat.subscriptions_repartition]);

    const labelsChart = useMemo(() => {
        return stat.subscriptions_repartition ? stat.subscriptions_repartition.map(t => t.subscription) : [];
    }, [stat.subscriptions_repartition]);
    
    const dataLineChart = useMemo(() => {
        return stat.subscriptions ? stat.subscriptions.map(t => t.count) : [];
    }, [stat.subscriptions]);

    const labelsLineChart = useMemo(() => {
        return stat.subscriptions ? stat.subscriptions.map(t => t.month_year) : [];
    }, [stat.subscriptions]);

    return (
        <div className="col-12 container row p-0 m-0 m-0 p-0">
            <div className="col-12">
                <p className="h2 page-title px-0 col-12 mb-0">Dashboard</p>
                <p className="text-muted">Global view of the application's performance</p>
            </div>

            {/* Filter date */}
            <DashboardFilter onFilter={(filter) => {fecthStat(filter)}} />

            {/* General number */}
            <div className="col-12 row p-0 m-0 mb-4">
                <div className="col-12 text-center row p-0 m-0">

                    <div className="col-md-6 col-xl-3 mb-4">
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
                                        <span className="h3 mb-0">{stat.total_users ? stat.total_users : "0"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-3 text-center">
                                        <span className="circle circle-sm bg-primary">
                                            <i className="fe fe-16 fe-activity text-white mb-0"></i>
                                        </span>
                                    </div>
                                    <div className="col pr-0">
                                        <p className="small text-muted mb-0">Total Hours Transcribed</p>
                                        <span className="h3 mb-0">{stat.total_hours_transcribed ? stat.total_hours_transcribed+"hours" : "-"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3 mb-4">
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
                                        <span className="h3 mb-0">$ {stat.average_monthly_sales ? stat.average_monthly_sales : "0"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-3 text-center">
                                        <span className="circle circle-sm bg-primary">
                                            <i className="fe fe-16 fe-star text-white mb-0"></i>
                                        </span>
                                    </div>
                                    <div className="col">
                                        <p className="small text-muted mb-0">Average review</p>
                                        <span className="h3 mb-0">{stat.average_review ? stat.average_review : "0.0"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
            {/* Chart */}
            <div className="col-12 row p-0 m-0 mb-4">

                <div className="col-xs-12 col-md-6 col-lg-6 text-center row p-0 mb-2 mx-0">
                    <div className="card col-12 p-3">
                        <div className="card-header">
                            <p className="card-title mb-0">Churn & Sales Chart</p>
                        </div>
                        <div className="col-12">
                            <PieChart
                                series={[stat.total_churn, stat.total_sales]}
                                labels={["Churn", "Sales"]}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="col-xs-12 col-md-6 col-lg-6 text-center row p-0 mb-2 mx-0">
                    <div className="card col-12 p-3">
                        <div className="card-header">
                            <p className="card-title mb-0">Subscriptions</p>
                        </div>
                            <div className="card-body">
                                <div className="chart-box mb-3" style={{minHeight: "180px;"}}>
                                    <TrafficChart
                                        series={dataChart}
                                        labels={labelsChart}
                                    />
                                </div>
                                <div className="text-left">
                                    <div className="row mb-2">
                                        <div className="col">
                                            <p className="mb-0">{labelsChart[0]}</p>
                                        </div>
                                        <div className="col-auto text-right">
                                            <p className="mb-0">{dataChart[0]}%</p>
                                            <span className="dot dot-md bg-primary"></span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col">
                                            <p className="mb-0">{labelsChart[1]}</p>
                                        </div>
                                        <div className="col-auto text-right">
                                            <p className="mb-0">{dataChart[1]}%</p>
                                            <span className="dot dot-md bg-danger"></span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col">
                                            <p className="mb-0">{labelsChart[2]}</p>
                                        </div>
                                        <div className="col-auto text-right">
                                            <p className="mb-0">{dataChart[2]}%</p>
                                            <span className="dot dot-md bg-dark"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            
            <div className="col-12 text-center row p-0 mb-2 mx-0">
                <div className="card col-12 p-3">
                    <div className="card-header">
                        <p className="card-title mb-0"></p>
                    </div>
                    <div className="col-12">
                        <BarChart
                            series={[
                                { name: "Sales", data: dataLineChart },
                            ]}
                            categories={labelsLineChart}
                        />
                    </div>
                </div>
            </div>    
            
        </div>
    )
}