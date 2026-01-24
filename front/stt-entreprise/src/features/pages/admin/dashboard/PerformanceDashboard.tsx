import { useMemo, useState } from "react";
import LineChart from "./chart/LineChart";
import DashboardFilter, { type Filter } from "./DashboardFilter";
import { useToast } from "../../../../auth/ToastProvider";
import { getPerformanceDashboardStat } from "../../../../api/transcription";
import axios from "axios";
import type { MonthlyCount } from "../../../../api/dashboard";

interface PerformanceStat {
    most_used_language?: string,
    total_hours_transcribed?: number,
    total_transcriptions?: number,
    transcriptions?: MonthlyCount[],
}

export default function PerformanceDashboard() {
    const {setError} = useToast();

    const [perf, setPerf] = useState<PerformanceStat>({});
    const fecthPerformance = async (f: Filter) => {
        try {
            const res = await getPerformanceDashboardStat(f?.startDate, f?.endDate);
            const data = res.data;
            console.log(res);
            console.log(data);

            if (data) {
                setPerf(data);
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

    const labelsChart = useMemo(() => {
        return perf.transcriptions ? perf.transcriptions.map(t => t.month_year) : [];
    }, [perf.transcriptions]);

    const dataChart = useMemo(() => {
        return perf.transcriptions ? perf.transcriptions.map(t => t.count) : [];
    }, [perf.transcriptions]);

    return (
        <div className="col-12 container row p-0 m-0 m-0 p-0">
            <div className="col-12">
                <p className="h2 page-title px-0 col-12 mb-0">Dashboard/app performance</p>
                <p className="text-muted">Global view of the application's performance</p>
            </div>

            {/* Filter date */}
            <DashboardFilter onFilter={(filter) => {fecthPerformance(filter)}} />

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
                                        <span className="h3 mb-0">{perf.most_used_language ? perf.most_used_language : "-"}</span>
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
                                        <span className="h3 mb-0">{perf.total_hours_transcribed ? perf.total_hours_transcribed+" hours" : "-"}</span>
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
                                            <i className="fe fe-16 fe-plus text-white mb-0"></i>
                                        </span>
                                    </div>
                                    <div className="col">
                                        <p className="small text-muted mb-0">Total transcriptions</p>
                                        <span className="h3 mb-0">{perf.total_transcriptions ? perf.total_transcriptions : "-"}</span>
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
                                    labels: labelsChart,
                                    datasets: [
                                        {
                                            label: "Transcriptions",
                                            data: dataChart,
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