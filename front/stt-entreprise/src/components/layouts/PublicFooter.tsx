import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../../auth/useAuth";
import { Link } from "react-router-dom";

function PublicFooter() {
    const { isAuthenticated } = useAuth0();

    const { loginAuth0, logoutAuth0 } = useAuth();
    const handleLogin = () => loginAuth0()
    const logout = () => logoutAuth0()

    return(
        <footer className="mt-5 text-white" style={{ background: '#222'}}>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-xs-12 col-md-4 col-lg-4 mt-5">
                        <p className="h2 text-light">EchoTranscribe</p>
                        <p>With EchoTranscribe you can automatically transcribe your audio/video  files into more than 125 languages.</p>
                        <div>
                            <button className="circle circle-md bg-light border-primary mx-1">
                                <span className="fe fe-24 fe-facebook text-primary"></span>
                            </button>
                            <button className="circle circle-md bg-info border-light mx-1">
                                <span className="fe fe-24 fe-linkedin text-light"></span>
                            </button>
                            <button className="circle circle-md bg-dark mx-1">
                                <span className="fe fe-24 fe-github text-light"></span>
                            </button>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-8 col-lg-8 row mt-5">
                        <div className="col-4">
                            <p className="font-weight-bolder">Tools</p><hr />
                            <ul className="list-unstyled">
                                <li  className="mx-1 my-1">
                                    <Link to="/public/layout/batch" className="text-light">Audio to text</Link>
                                </li>
                                <li  className="mx-1 my-1">
                                    <Link to="/public/layout/batch" className="text-light">Video to text</Link>
                                </li>
                                {!isAuthenticated ? (
                                    <>
                                        <li  className="mx-1 my-1">
                                            <a onClick={handleLogin} className="text-light">Live Transcibre</a>
                                        </li>
                                        <li  className="mx-1 my-1">
                                            <a onClick={handleLogin}className="text-light">AI Summary</a>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li  className="mx-1 my-1">
                                            <Link to="/public/layout/live" className="text-light">Live Transcibre</Link>
                                        </li>
                                        <li  className="mx-1 my-1">
                                            <Link to="/public/layout/summary" className="text-light">AI Summary</Link>
                                        </li>
                                    </>
                                    )}
                            </ul>
                        </div>
                        <div className="col-4">
                            <p className="font-weight-bolder">Ressources</p><hr />
                            {/* <ul className="list-unstyled">
                                <li  className="mx-1 my-1">
                                    <a href="" className="text-light">Help</a>
                                </li>
                                <li  className="mx-1 my-1">
                                    <a href="" className="text-light">API</a>
                                </li>
                            </ul> */}
                        </div>
                        <div className="col-4">
                            <p className="font-weight-bolder">Company</p><hr />
                            <ul className="list-unstyled">
                                <li  className="mx-1 my-1">
                                    <Link to="/public/layout/subscription" className="text-light">Pricing</Link>
                                </li>
                                <li  className="mx-1 my-1">
                                    <Link to="/public/layout/listReview" className="text-light">Reviews</Link>
                                </li>
                                <li  className="mx-1 my-1">
                                    <a href="" className="text-light">QA</a>
                                </li>
                                {/* <li  className="mx-1 my-1">
                                    <a href="" className="text-light">Terms</a>
                                </li>
                                <li  className="mx-1 my-1">
                                    <a href="" className="text-light">Privacy</a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 my-3">
                        <hr />
                        <div className="d-flex justify-content-between">
                            <div>
                                <p>© 2025 V-IT Service, Inc. All rights reserved.</p>
                            </div>
                            <div>
                                <ul className="list-unstyled d-flex gap-6">
                                    <li className="mx-1">
                                        <a href="" className="text-light">Contact</a>
                                    </li>
                                    <li  className="mx-1">
                                        <a href="" className="text-light">About</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default PublicFooter;