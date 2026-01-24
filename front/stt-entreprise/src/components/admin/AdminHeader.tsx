import { useAuth0 } from "@auth0/auth0-react";
import { useRef, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { Link } from "react-router-dom";
import { toggleBodyClass } from "../../others/utils";

export default function AdminHeader() {
    // toggle mode sombre / clair
    // const lightmod = document.getElementById("lightTheme") as HTMLLinkElement | null;
    // const darkmod = document.getElementById("darkTheme") as HTMLLinkElement | null;
    // const modSwitcher = useRef<HTMLDivElement>(null);
    // const toggleTheme = () => {
    //     if (modSwitcher.current?.getAttribute("data-mode") == "light") {
    //         modSwitcher.current?.setAttribute("data-mode", "dark");
    //     }
    //     else {
    //         modSwitcher.current?.setAttribute("data-mode", "light");
    //     }
    // }
    
    const { user } = useAuth0();

    const { logoutAuth0 } = useAuth();
    const logout = () => logoutAuth0()
    
    return(
        <>
            
            <nav className="topnav navbar navbar-light fixed-top">
                <button type="button" className="navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar" onClick={() => toggleBodyClass("collapsed")}>
                    <i className="fe fe-menu navbar-toggler-icon"></i>
                </button>
                <ul className="nav d-flex align-items-center bg-dark blur-border" style={{borderRadius: "25px"}} >
                    <li className="nav-item">
                        <a className="nav-link text-muted" href="#" id="modeSwitcher" data-mode="light">
                            <i className="fe fe-sun fe-16"></i>
                        </a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link text-muted my-2" href="./#" data-toggle="modal" data-target=".modal-shortcut">
                            <span className="fe fe-grid fe-16"></span>
                        </a>
                    </li>
                    <li className="nav-item nav-notif">
                        <a className="nav-link text-muted my-2" href="./#" data-toggle="modal" data-target=".modal-notif">
                            <span className="fe fe-bell fe-16"></span>
                            <span className="dot dot-md bg-success"></span>
                        </a>
                    </li> */}
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/admin/layout/dashboard/profile" >
                            <p className="truncate m-0 p-0">{user?.email}</p>
                        </Link>
                    </li>
                    <li className="nav-item dropdown ml-lg-0">
                        <a className="nav-link dropdown-toggle text-muted" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="avatar avatar-sm mt-2 ">
                                <img src={user?.picture} alt={user?.email?.charAt(0)} className="avatar-img rounded-circle"/>
                            </span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                            <li className="nav-item">
                                <Link className="nav-link pl-3" to="/admin/layout/dashboard/profile">
                                    <span className="fe fe-user fe-16 mr-2"></span>Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link pl-3 text-danger" onClick={logout}  style={{cursor: "pointer"}}>
                                    <span className="fe fe-log-out danger fe-16 mr-2"></span>Log out
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>

            <aside className="sidebar-left border-right bg-white shadow" id="leftSidebar" data-simplebar>
                <a href="#" className="btn collapseSidebar toggle-btn d-lg-none text-muted ml-2 mt-3" data-toggle="toggle">
                    <i className="fe fe-x"><span className="sr-only"></span></i>
                </a>
                <nav className="vertnav navbar navbar-light">
                    <div className="w-100 mb-4 text-center">
                        <Link to="/admin/layout">
                            <img src="/images/logo_white_resized.png" alt="Echotranscribe logo" className="" style={{width: "70%"}}/>
                        </Link>
                    </div>
                    <ul className="navbar-nav flex-fill w-100 mb-2">
                            <li className="nav-item dropdown">
                                <a href="#dashboard" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
                                    <i className="fe fe-home fe-16"></i>
                                    <span className="ml-3 item-text">Dashboard</span>
                                </a>
                                <ul className="collapse list-unstyled pl-4 w-100" id="dashboard">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/layout/dashboard">
                                                <i className="fe fe-monitor fe-16"></i>
                                                <span className="ml-3 item-text">General</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/layout/dashboard/users">
                                                <i className="fe fe-users fe-16"></i>
                                                <span className="ml-3 item-text">Users</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/layout/dashboard/subscription">
                                            <i className="fe fe-credit-card fe-16"></i>
                                            <span className="ml-3 item-text">Sales</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/layout/dashboard/performance">
                                            <i className="fe fe-activity fe-16"></i>
                                            <span className=" ml-3 item-text">Performance</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                    </ul>
                    <ul className="navbar-nav flex-fill w-100 mb-2">
                            <li className="nav-item dropdown">
                                <a href="#profile" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
                                    <i className="fe fe-user fe-16"></i>
                                    <span className="ml-3 item-text">Profile</span>
                                </a>
                                <ul className="collapse list-unstyled pl-4 w-100" id="profile">
                                    <li className="nav-item">
                                        <Link className="nav-link text-danger" to="/admin/layout/dashboard">
                                                <i className="fe fe-log-out fe-16"></i>
                                                <span className="ml-3 item-text">Log out</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}