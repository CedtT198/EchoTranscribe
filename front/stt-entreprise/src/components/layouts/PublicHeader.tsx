import { useAuth0 } from "@auth0/auth0-react";
import { useRef, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { Link } from "react-router-dom";
import { toggleBodyClass } from "../../others/utils";

export default function PublicHeader() {
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
    
    const { isAuthenticated, user } = useAuth0();

    const { loginAuth0, signupAuth0, logoutAuth0 } = useAuth();
    const login = () => loginAuth0("/public/layout/")
    const signup = () => signupAuth0()
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
                    {!isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <a className="nav-link text-white" onClick={login} style={{cursor: "pointer"}}>
                                    <span className="ml-lg-2">Login</span>
                                </a>
                            </li>
                            <li className="nav-item ml-2">
                                <button className="btn btn-primary" onClick={signup} style={{borderRadius: "25px"}}>
                                    <span className="text-light">Start now</span>
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/public/layout/profile" >
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
                                        <Link className="nav-link pl-3" to="/public/layout/profile">
                                            <span className="fe fe-user fe-16 mr-2"></span>Profile
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link pl-3" to="/public/layout/settings">
                                            <span className="fe fe-settings fe-16 mr-2"></span>Settings
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link pl-3 text-danger" onClick={logout} style={{cursor: "pointer"}}>
                                            <span className="fe fe-log-out danger fe-16 mr-2"></span>Log out
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <aside className="sidebar-left border-right bg-white shadow" id="leftSidebar" data-simplebar>
                <a href="#" className="btn collapseSidebar toggle-btn d-lg-none text-muted ml-2 mt-3" data-toggle="toggle" onClick={() => toggleBodyClass("collapsed")}>
                    <i className="fe fe-x"><span className="sr-only"></span></i>
                </a>
                <nav className="vertnav navbar navbar-light">
                    <div className="w-100 text-center">
                        <Link to="/public/layout">
                            <img src="/images/logo_white_resized.png" alt="Echotranscribe logo" className="" style={{width: "70%"}}/>
                        </Link>
                    </div>
                    <ul className="navbar-nav flex-fill w-100 mb-2">
                        {/* <p className="ml-3 mb-1" data-toggle="collapse">Apps</p> */}
                        <li className="nav-item dropdown">
                            <a href="#transcription" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
                                <i className="fe fe-play fe-16"></i>
                                <span className="ml-3 item-text">Transcription</span>
                            </a>
                            <ul className="collapse list-unstyled pl-4 w-100" id="transcription">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/public/layout/batch">
                                        <i className="fe fe-file fe-16"></i>
                                        <span className="ml-3 item-text">File</span>
                                    </Link>
                                </li>
                                {!isAuthenticated ? (
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={login} style={{cursor: "pointer"}}>
                                            <i className="fe fe-mic fe-16"></i>
                                            <span className="ml-3 item-text">Live</span>
                                        </a>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/public/layout/live">
                                            <i className="fe fe-mic fe-16"></i>
                                            <span className="ml-3 item-text">Live</span>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                            {isAuthenticated &&
                                <>
                                    <a href="/public/layout/summary" className="nav-link">
                                        <i className="fe fe-edit-2 fe-16"></i>
                                        <span className="ml-3 item-text">AI Summary</span>
                                    </a>
                                    <Link to="/public/layout/history" className="nav-link">
                                        <i className="fe fe-archive fe-16"></i>
                                        <span className="ml-3 item-text">History</span>
                                    </Link>
                                </>
                            }
                            <Link to="/public/layout/subscription" className="nav-link">
                                <i className="fe fe-dollar-sign fe-16"></i>
                                <span className="ml-3 item-text">Pricing</span>
                            </Link>
                        </li>
                    </ul>   
                </nav>
            </aside>

            {/* <nav className="navbar-expand-lg navbar-light bg-white border-bottom shadow fixed-top" >
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <a className="navbar-brand mx-lg-1 mr-0" href="./index.html">
                        <img src="/images/logo_white_resized.png" alt="" className="" style={{width: "100px"}}/>
                    </a>
                    <button className="navbar-toggler mt-2 mr-auto toggle-sidebar text-muted">
                        <i className="fe fe-menu navbar-toggler-icon"></i>
                    </button>
                    <div className="navbar-slide bg-white" id="navbarSupportedContent">
                        <a href="#" className="btn toggle-sidebar d-lg-none text-muted ml-2 mt-3" data-toggle="toggle">
                            <i className="fe fe-x"><span className="sr-only"></span></i>
                        </a>
                        <ul className="navbar-nav mr-auto d-flex align-items-center" style={{fontSize: 16}}>
                            <li className="nav-item">
                                <Link to="/public/layout">
                                    <img src="/images/logo_white_resized.png" alt="Echotranscribe logo" className="" style={{width: "100px"}}/>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn"  type="button" id="actionMenuButton" data-toggle="dropdown" style={{fontSize: 16}}>
                                    Tools<span className="fe fe-chevron-down fe-16 ml-1"></span>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="actionMenuButton">
                                    <Link className="dropdown-item" to="/public/layout/batch">Transcribe batch</Link>
                                    {!isAuthenticated ? (
                                        <>
                                            <a className="dropdown-item" onClick={login}>Live Speech to text</a>
                                            <a className="dropdown-item" onClick={login}>Resume text with AI</a>
                                            <a className="dropdown-item" onClick={login}>Translate</a>
                                        </>
                                    ) : (
                                        <>
                                            <Link className="dropdown-item" to="/public/layout/live">Live Speech to text</Link>
                                            <a className="dropdown-item" href="/public/layout/summary">Resume text with AI</a>
                                        </>
                                    )}

                                </div>
                            </li>
                            {isAuthenticated && <li className="nav-item">
                                <Link className="nav-link" to="/public/layout/history">
                                    <span className="ml-lg-2">History</span>
                                </Link>
                            </li>}
                        </ul>
                    </div>
                    <ul className="navbar-nav d-flex flex-row" style={{fontSize: 16}}>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/public/layout/subscription">
                                <span className="ml-lg-2">Pricing</span>
                            </Link>
                        </li>
                        {!isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={login}>
                                        <span className="ml-lg-2">Login</span>
                                    </a>
                                </li>
                                <li className="nav-item ml-2">
                                    <button className="btn btn-primary" onClick={signup}>
                                        <span className="text-light" style={{fontSize: 16}}>Start now</span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/public/layout/profile">
                                        {user?.email}
                                    </Link>
                                </li>
                                <li className="nav-item dropdown ml-lg-0">
                                    <a className="nav-link dropdown-toggle text-muted" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="avatar avatar-sm mt-2">
                                            <img src={user?.picture} alt="User avatar" className="avatar-img rounded-circle"/>
                                        </span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                        <li className="nav-item">
                                            <Link className="nav-link pl-3" to="/public/layout/profile">
                                                <span className="fe fe-user fe-16 mr-2"></span>Profile
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link pl-3" to="/public/layout/settings">
                                                <span className="fe fe-settings fe-16 mr-2"></span>Settings
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link pl-3 text-danger" onClick={logout}>
                                                <span className="fe fe-log-out danger fe-16 mr-2"></span>Log out
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        )}
                    </ul>
                    <div></div>
                </div>
            </nav> */}
        </>
    )
}