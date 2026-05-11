import { Link } from "react-router-dom";
import LineChart from "./chart/LineChart";
import DashboardFilter, { type Filter } from "./DashboardFilter";
import type { MonthlyCount } from "../../../../api/dashboard";
import { filterDefault, getUsers, getUsersDashboardStat, type User, type UserFilter } from "../../../../api/user";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useToast } from "../../../../auth/ToastProvider";
import { formatLocalDate } from "../../../../others/utils";
import { endPage, startPage } from "../../../../others/pagination";

interface UsersStat {
    total_users?: number,
    users?: MonthlyCount[],
}

export default function UsersDashboard() {
    const {setError} = useToast();
    
    // stats
    const [userStat, setUserStat] = useState<UsersStat>({});
    const fecthUserStat = async (f: Filter) => {
        try {
            const res = await getUsersDashboardStat(f?.startDate, f?.endDate);
            const data = res.data;
            console.log(res);
            console.log(data);

            if (data) {
                setUserStat(data);
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
        return userStat.users ? userStat.users.map(t => t.month_year) : [];
    }, [userStat.users]);

    const dataChart = useMemo(() => {
        return userStat.users ? userStat.users.map(t => t.count) : [];
    }, [userStat.users]);


    // list subscription 
    const [filter, setFilter] = useState<UserFilter>(filterDefault);

    const [page, setPage] = useState(0);
    const [size] = useState(8);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [users, setUsers] = useState<User[]>([]);

    const fetchUser = async () => {
        try {
            const res = await getUsers(filter, page, size);
            const pageData = res.data;
            
            setUsers(pageData.content);
            setTotalElements(pageData.total_elements);
            setTotalPages(pageData.total_pages);
        } catch (error: any) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [page])

    const updateFilter = <K extends keyof UserFilter>(field: K, value: UserFilter[K]) => {
        setFilter((prev) => ({
            ...prev,
            [field]: value,
        }));
        // console.log(filter);
    };

    return (
        <div className="col-12 container row p-0 m-0 m-0 p-0">
            <div className="col-12">
                <p className="h2 page-title px-0 col-12 mb-0">Dashboard/user</p>
                <p className="text-muted">All about users</p>
            </div>

            {/* Filter date */}
            <DashboardFilter onFilter={(filter) => {fecthUserStat(filter)}} />

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
                                        <span className="h3 mb-0">{userStat.total_users ? userStat.total_users : "0"}</span>
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
                            <p className="card-title mb-0">Users per Month Chart</p>
                        </div>
                        <div className="col-12">
                            <LineChart
                                series={[
                                    { name: "Users", data: dataChart },
                                ]}
                                categories={labelsChart}
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
                                                <label htmlFor="content">Search in name</label>
                                                <input type="text" id="name" className="form-control" onChange={(e) => updateFilter("mail", e.target.value)}/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="content">Search in first name</label>
                                                <input type="text" id="firstName" className="form-control" onChange={(e) => updateFilter("firstName", e.target.value)}/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="content">Search in mail</label>
                                                <input type="text" id="mail" className="form-control" onChange={(e) => updateFilter("mail", e.target.value)}/>
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
                                                <label htmlFor="country">Country</label>
                                                <select name="" id="country" className="form-control" onChange={(e) => updateFilter("country", e.target.value)}>
                                                    <option value="">Select a country</option>
                                                    <option value="madagascar">Madagascar</option>
                                                    <option value="madagascar">Madagascar</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn mb-2 btn-dark" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn mb-2 btn-primary" onClick={fetchUser}>Filter</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <div className="col-12 row p-0 m-0">
                <div className="col-xs-10 col-lg-10 col-md-10">
                    <p className="h3 page-title px-0">All Users</p>
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
                            <th>Name & First name</th>
                            <th>Mail</th>
                            <th>Joined Date</th>
                            {/* <th>Options</th> */}
                        </tr>
                    </thead>
                    <tbody>
                            {users.map((user, index) => (
                                <>
                                    <tr className="accordion-toggle collapsed" id="c-1" data-toggle="collapse" data-parent="#c-1" href={`#collap-${page * size + index + 1}`} key={index} style={{cursor: "pointer"}}>
                                        <td>{page * size + index + 1}</td>
                                        <td>{user.first_name} {user.name}</td>
                                        <td>{user.mail}</td> 
                                        <td>{formatLocalDate(user.creation_date)}5</td>
                                        {/* <td className="row m-0 p-0 justify-content-center align-items-center">
                                            <Link to="#" className="btn btn-dark fe-16 nav-link">
                                                <span className="fe fe-plus"></span>
                                            </Link>
                                        </td> */}
                                    </tr>
                                </>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}