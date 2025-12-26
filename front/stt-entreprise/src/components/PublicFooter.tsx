function PublicFooter() {
    return(
        <footer className="my-5">
            <div className="mb-4 container">
                <div className="row mt-5">
                    <div className="col-xs-12 col-md-4 col-lg-4 mt-5">
                        <h3>EchoTranscribe</h3>
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
                                    <a href="" className="text-dark">Live transcribe</a>
                                </li>
                                <li  className="mx-1 my-1">
                                    <a href="" className="text-dark">Audio to text</a>
                                </li>
                                <li  className="mx-1 my-1">
                                    <a href="" className="text-dark">Video to text</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <p className="font-weight-bolder">Ressources</p><hr />
                            <ul className="list-unstyled">
                                <li  className="mx-1 my-1">
                                    <a href="" className="text-dark">Help</a>
                                </li>
                                <li  className="mx-1 my-1">
                                    <a href="" className="text-dark">API</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <p className="font-weight-bolder">Company</p><hr />
                            <ul className="list-unstyled">
                                <li  className="mx-1 my-1">
                                    <a href="" className="text-dark">Pricing</a>
                                </li>
                                <li  className="mx-1 my-1">
                                    <a href="/public/layout/listReview" className="text-dark">Reviews</a>
                                </li>
                                <li  className="mx-1 my-1">
                                    <a href="" className="text-dark">QA</a>
                                </li>
                                <li  className="mx-1 my-1">
                                    <a href="" className="text-dark">Terms</a>
                                </li>
                                <li  className="mx-1 my-1">
                                    <a href="" className="text-dark">Privacy</a>
                                </li>
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
                                        <a href="" className="text-dark">Contact</a>
                                    </li>
                                    <li  className="mx-1">
                                        <a href="" className="text-dark">About</a>
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