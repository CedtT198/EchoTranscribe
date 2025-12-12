import { useRef } from "react";

function PublicHeader() {
    // toggle mode sombre / clair
    // const lightmod = document.getElementById("lightTheme") as HTMLLinkElement | null;
    // const darkmod = document.getElementById("darkTheme") as HTMLLinkElement | null;
    const modSwitcher = useRef<HTMLDivElement>(null);
    const toggleTheme = () => {
        if (modSwitcher.current?.getAttribute("data-mode") == "light") {
            modSwitcher.current?.setAttribute("data-mode", "dark");
        }
        else {
            modSwitcher.current?.setAttribute("data-mode", "light");
        }
    }
    //
    

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-white flex-row border-bottom shadow fixed-top">
            <div className="container container-fluid">
                <a className="navbar-brand mx-lg-1 mr-0" href="./index.html">
                {/* LOGO */}
                    {/* <svg version="1.1" id="logo" className="navbar-brand-img brand-sm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 120 120" xml:space="preserve">
                    <g>
                        <polygon className="st0" points="78,105 15,105 24,87 87,87 	" />
                        <polygon className="st0" points="96,69 33,69 42,51 105,51 	" />
                        <polygon className="st0" points="78,33 15,33 24,15 87,15 	" />
                    </g>
                    </svg> */}
                </a>
                <button className="navbar-toggler mt-2 mr-auto toggle-sidebar text-muted">
                    <i className="fe fe-menu navbar-toggler-icon"></i>
                </button>
                <div className="navbar-slide bg-white ml-lg-4" id="navbarSupportedContent">
                    <a href="#" className="btn toggle-sidebar d-lg-none text-muted ml-2 mt-3" data-toggle="toggle">
                        <i className="fe fe-x"><span className="sr-only"></span></i>
                    </a>
                    <ul className="navbar-nav mr-auto">
                        {/* <li className="nav-item dropdown">
                            <a href="#" id="dashboardDropdown" className="dropdown-toggle nav-link" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="ml-lg-2">Dashboard</span><span className="sr-only">(current)</span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="dashboardDropdown">
                                <a className="nav-link pl-lg-2" href="./index.html"><span className="ml-1">Default</span></a>
                                <a className="nav-link pl-lg-2" href="./dashboard-analytics.html"><span className="ml-1">Analytics</span></a>
                                <a className="nav-link pl-lg-2" href="./dashboard-sales.html"><span className="ml-1">E-commerce</span></a>
                                <a className="nav-link pl-lg-2" href="./dashboard-saas.html"><span className="ml-1">Saas Dashboard</span></a>
                                <a className="nav-link pl-lg-2" href="./dashboard-system.html"><span className="ml-1">Systems</span></a>
                            </div>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link" href="/public/layout">
                                <span className="ml-lg-2">Home</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/public/layout/live">
                                <span className="ml-lg-2">Live</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/public/layout/transcribe">
                                <span className="ml-lg-2">Transcribe</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/public/layout/resume">
                                <span className="ml-lg-2">Resume</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/public/layout/history">
                                <span className="ml-lg-2">History</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/public/layout/subscription">
                                <span className="badge badge-pill badge-danger">My subscription</span>
                            </a>
                        </li>
                        {/* <li className="nav-item dropdown more">
                            <a className="dropdown-toggle more-horizontal nav-link" href="#" id="moreDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="ml-2 sr-only">More</span>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="moreDropdown">
                                <li className="nav-item">
                                    <a className="nav-link pl-lg-2" href="/public/layout/history"  id="pagesDropdown">
                                        <span className="fe fe-list fe-16 mr-2"></span>
                                        <span className="ml-1">History</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link pl-lg-2" href="#"  id="pagesDropdown">
                                        <span className="ml-1 fe fe-user-plus fe-16 mr-2"></span>
                                        <span>Add user</span>
                                    </a>
                                </li>
                            </ul>
                        </li> */}
                    </ul>
                </div>
                <ul className="navbar-nav d-flex flex-row">
                    <li className="nav-item">
                        <a className="nav-link text-muted my-2" href="#" ref={modSwitcher} id="modeSwitcher" onClick={toggleTheme} data-mode="light">
                            <i className="fe fe-sun fe-16"></i>
                        </a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link text-muted my-2" href="./#" data-toggle="modal" data-target=".modal-shortcut">
                            <i className="fe fe-grid fe-16"></i>
                        </a>
                    </li> */}
                    {/* <li className="nav-item nav-notif">
                        <a className="nav-link text-muted my-2" href="./#" data-toggle="modal" data-target=".modal-notif">
                            <i className="fe fe-bell fe-16"></i>
                            <span className="dot dot-md bg-success"></span>
                        </a>
                    </li> */}
                    
                    {/* rehefa deconnecte */}
                    <li className="nav-item">
                        <a className="nav-link" href="/public/sign-in">
                            <span className="ml-lg-2">Login</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/public/sign-up">
                            <span className="badge badge-pill badge-primary">Sign up</span>
                        </a>
                    </li>
                    {/* rehefa connecte */}
                    <li className="nav-item dropdown ml-lg-0">
                        <a className="nav-link dropdown-toggle text-muted" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="avatar avatar-sm mt-2">
                                {/* soloina icon representatif kely */}
                                <img src="./assets/avatars/face-1.jpg" alt="..." className="avatar-img rounded-circle"/>
                            </span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                            <li className="nav-item">
                                <a className="nav-link pl-3" href="/public/layout/profile">
                                    <span className="fe fe-user fe-16 mr-2"></span>Profile
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link pl-3" href="/public/layout/settings">
                                    <span className="fe fe-settings fe-16 mr-2"></span>Settings
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link pl-3 text-danger" href="/public/sign-in">
                                    <span className="fe fe-log-out danger fe-16 mr-2"></span>Log out
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default PublicHeader;