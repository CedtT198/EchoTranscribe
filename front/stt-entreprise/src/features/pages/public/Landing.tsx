import PublicFooter from "../../../components/PublicFooter";

function Landing() {
    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-12 mb-5">
                    <div className="w-50 mx-auto text-center justify-content-center py-5 my-5">
                        <h2 className="page-title mb-0">Welcome to Echotranscribe</h2>
                        <p className="lead text-muted mb-4">Take notes with your voice in streaming mode, transcribe and/or translate audio/video file.</p>
                        <p className="help-text mt-2 text-muted">A free limited version is available.</p>
                    </div>
                    <div className="row my-4">
                        <div className="col-md-6">
                        <div className="card shadow bg-primary text-center mb-4">
                            <div className="card-body p-5">
                            <span className="circle circle-md bg-primary-light">
                                <i className="fe fe-navigation fe-24 text-white"></i>
                            </span>
                            <h3 className="h4 mt-4 mb-1 text-white">Live</h3>
                            <p className="text-white mb-4">Realtime AI writing notes with your voice.</p>
                            <a href="#" className="btn btn-lg bg-primary-light text-white">Speech<i className="fe fe-arrow-right fe-16 ml-2"></i></a>
                            </div> 
                        </div> 
                        </div> 
                        <div className="col-md-6">
                        <div className="card shadow bg-success text-center mb-4">
                            <div className="card-body p-5">
                            <span className="circle circle-md bg-success-light">
                                <i className="fe fe-message-circle fe-24 text-white"></i>
                            </span>
                            <h3 className="h4 mt-4 mb-1 text-white">Batch</h3>
                            <p className="text-white mb-4">Transcribe by uploading audio/video file.</p>
                            <a href="#" className="btn btn-lg bg-success-light text-white">Upload<i className="fe fe-arrow-right fe-16 ml-2"></i></a>
                            </div> 
                        </div>
                        </div>
                    </div>
                    {/* use case */}
                    <div className="row my-5 p-5">
                        <div className="col-12 col-lg-12 text-center">
                            <h2 className="mb-0">Use case</h2>
                            <p className="lead text-muted mb-5">Those are what our application can be used for.</p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <i className="fe fe-info fe-32 text-primary"></i>
                                    <a href="#">
                                        <h3 className="h5 mt-4 mb-1">Meeting</h3>
                                    </a>
                                    <p className="text-muted">No manual writing for meeting report. Save the audio/video and drop the file.</p>
                                </div>
                            </div> 
                        </div> 
                        <div className="col-6 col-lg-3">
                            <div className="card shadow mb-4">
                                <div className="card-body">
                                <i className="fe fe-help-circle fe-32 text-success"></i>
                                <a href="./page-faqs.html">
                                    <h3 className="h5 mt-4 mb-1">Independant worker</h3>
                                </a>
                                <p className="text-muted">For worker as copywriter, type notes just by talking, using speech to write.</p>
                                </div>
                            </div> 
                        </div> 
                        <div className="col-6 col-lg-3">
                            <div className="card shadow mb-4">
                                <div className="card-body">
                                <i className="fe fe-globe fe-32 text-warning"></i>
                                <a href="#">
                                    <h3 className="h5 mt-4 mb-1">Students</h3>
                                </a>
                                <p className="text-muted">Save much more time with our automatic writer for your course. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="card shadow">
                                <div className="card-body">
                                <i className="fe fe-alert-triangle fe-32 text-danger"></i>
                                <a href="#">
                                    <h3 className="h5 mt-4 mb-1">Translation</h3>
                                </a>
                                <p className="text-muted">Yes, translation is supported as well. For audio or video format.</p>
                                </div>
                            </div> 
                        </div>
                    </div> 
                    {/* Functionnalities */}
                    <div className="my-5 p-5">
                        <div className="text-center">
                            <h2 className="mb-0">Functionnalities</h2>
                            <p className="lead text-muted mb-5">Multiples useful function for your work.</p>
                        </div>
                        <div className="row my-5">
                            <div className="col-md-4">
                                <h3 className="h5 mt-4 mb-1">Powerfull AI</h3>
                                <p className="text-muted mb-4"></p>
                                <ul className="list-unstyled">
                                    <li className="my-1"><i className="fe fe-file-text mr-2 text-muted"></i>Diarization</li>
                                    <li className="my-1"><i className="fe fe-file-text mr-2 text-muted"></i>Precision</li>
                                    <li className="my-1"><i className="fe fe-file-text mr-2 text-muted"></i>Summarize text in a decisional way</li>
                                </ul>
                            </div> 
                            <div className="col-md-4">
                                <h3 className="h5 mt-4 mb-1">Transcribing</h3>
                                <p className="text-muted mb-4"></p>
                                <ul className="list-unstyled">
                                    <li className="my-1"><i className="fe fe-file-text mr-2 text-muted"></i>Multiples languages supported</li>
                                    <li className="my-1"><i className="fe fe-file-text mr-2 text-muted"></i>Live transcribing</li>
                                    <li className="my-1"><i className="fe fe-file-text mr-2 text-muted"></i>+100 language supported</li>
                                </ul>
                            </div> 
                            <div className="col-md-4">
                                <h3 className="h5 mt-4 mb-1">Save in cloud</h3>
                                <p className="text-muted mb-4"></p>
                                <ul className="list-unstyled">
                                    <li className="my-1"><i className="fe fe-file-text mr-2 text-muted"></i>Lorem ipsum dolor sit amet</li>
                                    <li className="my-1"><i className="fe fe-file-text mr-2 text-muted"></i>Centralized history</li>
                                    <li className="my-1"><i className="fe fe-file-text mr-2 text-muted"></i>Export easily</li>
                                </ul>
                            </div>
                        </div> 
                    </div>
                    {/* review */}

                    {/* Sub */}
                    <div>
                        <div className="text-center">
                            <h2 className="mb-0">Subscritpion</h2>
                            <p className="lead text-muted mb-5">See below the offer that fits better for you</p>
                        </div>
                        <div className="card-deck my-4">
                            <div className="card mb-4 shadow">
                                <div className="card-body text-center my-4">
                                    <a href="#">
                                    <h3 className="h5 mt-4 mb-0">Basic</h3>
                                    </a>
                                    <p className="text-muted">-</p>
                                    <span className="h1 mb-0">$9.9</span>
                                    <p className="text-muted">month</p>
                                    <ul className="list-unstyled mb-5">
                                        <li>Lorem ipsum dolor sit amet</li>
                                        <li>Consectetur adipiscing elit</li>
                                        <li>Integer molestie lorem at massa</li>
                                        <li>Eget porttitor lorem</li>
                                    </ul>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div> 
            {/* <PublicFooter></PublicFooter> */}
        </div> 

    )
}

export default Landing;