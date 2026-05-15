import { Link } from "react-router-dom";
import Pricing from "../../../components/pricing/Pricing";
import QA from "../../../components/QA";
// import { useAuth0 } from "@auth0/auth0-react";

export default function Landing() {

    // const { isAuthenticated } = useAuth0();

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-12 mb-5">
                    <div className="mx-auto text-center justify-content-center">
                        <p className="h1 page-title mb-0 font-weight-bold">Transcribe for free</p>
                        <p className="lead text-muted mb-4">Take notes with your voice in real-time, or transcribe audio/video batch file.</p>
                        <p className="help-text mt-2 text-muted">No account, no credit card need for free version.</p>
                    </div>
                    
                    <div className="col-12 mb-5">
                        <div className="text-center d-flex justify-content-center align-items-center">
                            <div className="bg-dark p-1 rounded-pill">
                                <button className="btn btn-primary rounded-pill mx-1 text-light" type="button">
                                    <span className="fe fe-file fe-16 mr-1"></span>Upload audio
                                </button>
                                <Link className="btn btn rounded-pill mx-1 text-light" type="button" to="/public/layout/live">
                                    <span className="dot mr-2"></span>Transcribe live audio
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-12">
                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <Link to="/public/layout/batch">
                                        <div className="dropzone rounded-lg col-12 p-0 text-center" id="tinydash-dropzone">
                                            <label htmlFor="upload" className="mx-auto w-100 pt-5 pb-2 upload">
                                                <input type="" id="upload" accept="audio/*,video/*"  hidden/>
                                                <p className="h1 text-dark">Audio to text Converter</p>
                                                <p className="h6 text-muted mb-5">Automatically convert audio to text.</p>
                                                <div className="dz-message needsclick mb-5 pt-5">
                                                    <button className="btn btn-primary rounded-pill py-3 px-4 text-light mb-3">
                                                        Upload your File
                                                        <i className="fe fe-upload-cloud fe-16 text-white mx-2"></i>
                                                    </button>
                                                    <h5 className="text-muted">Click or drag here to upload</h5>
                                                </div>
                                                {/* <p className="font-weight-bold text-dark mb-0">No account needed</p> */}
                                                <p className="text-muted">Supports any audio format but only 3 min of length, during free trial.</p>
                                            </label>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* <div className="row my-4">
                        <div className="col-md-6">
                        <div className="card shadow bg-primary text-center mb-4">
                            <div className="card-body p-5">
                            <span className="circle circle-md bg-primary-light">
                                <i className="fe fe-navigation fe-24 text-white"></i>
                            </span>
                            <h3 className="h4 mt-4 mb-1 text-white">Live</h3>
                            <p className="text-white mb-4">Realtime AI writing notes with your voice.</p>
                            {!isAuthenticated ? (<Link to="/public/layout/live" className="btn btn-lg bg-primary-light text-white">Speech<i className="fe fe-arrow-right fe-16 ml-2"></i></Link>)
                            :(<Link to="/public/layout/live" className="btn btn-lg bg-primary-light text-white">Speech<i className="fe fe-arrow-right fe-16 ml-2"></i></Link>)}
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
                            <Link to="/public/layout/batch" className="btn btn-lg bg-success-light text-white">Upload<i className="fe fe-arrow-right fe-16 ml-2"></i></Link>
                            </div> 
                        </div>
                        </div>
                    </div> */}

                    {/* Welcome */}
                    <div className="row my-5 p-5">
                        <div className="col-12 text-center mb-5">
                            {/* <div className="mb-3">
                                <img src="/images/logo_white_resized.png" alt="Echotranscribe logo" className="" style={{width: "100px"}}/>
                            </div> */}
                            <p className="h1 mb">Welcome to <span className="text-primary">Echotranscribe</span></p>
                            {/* <p className="lead text-muted mb-5">Those are what our application can be used for.</p> */}
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="offset-2 col-1">
                                <img src="/images/free.png" alt="Free ticket" className="" style={{ width: "50px"}}/>
                            </div>
                            <div className="col-9">
                                <p className="h4 mb-0">Free version</p>
                                <p>Transcribe a batch file for free with some formats available. No account, no use of credit card.</p>
                            </div>
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="offset-2 col-1">
                                <img src="/images/fast.png" alt="Counter" className="" style={{ width: "50px"}}/>
                            </div>
                            <div className="col-9">
                                <p className="h4 mb-0">Very fast</p>
                                <p>The AI engine provides fast and accurate answer.</p>
                            </div>
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="offset-2 col-1">
                                <img src="/images/large_file.png" alt="File stacked" className="" style={{ width: "50px"}}/>
                            </div>
                            <div className="col-9">
                                <p className="h4 mb-0">Large file size</p>
                                <p>File up to 8 hours of length or 10go can be uploaded.</p>
                            </div>
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="offset-2 col-1">
                                <img src="/images/media.png" alt="Media" className="" style={{ width: "50px"}}/>
                            </div>
                            <div className="col-9">
                                <p className="h4 mb-0">Many audio/video formats supported</p>
                                <p>EchoTranscribe supports many audio and video format file such as: FLAC, MULAW, AMR, AMR_WB, MP3, MP4, MOV, M4A, AAC, WAV, OGG, OPUS, MPEG</p>
                            </div>
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="offset-2 col-1">
                                <img src="/images/download.png" alt="Download button" className="" style={{ width: "50px"}}/>
                            </div>
                            <div className="col-9">
                                <p className="h4 mb-0">Download your transcribed file</p>
                                <p>Export the results in PDF, DOCX, TXT and share it with your coworkers</p>
                            </div>
                        </div>
                    </div> 

                    {/* Google speech to text */}
                    <div className="row my-5 p-5">
                        <div className="col-12 text-center mb-5">
                            <div className="mb-3">
                                <img src="/images/google.png" alt="Google logo" />
                            </div>
                            <p className="h1 mb">Powered by Google</p>
                            {/* <p className="lead text-muted mb-5">Those are what our application can be used for.</p> */}
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="offset-2 col-1">
                                <img src="/images/accuracy.png" alt="Accuracy" className="" style={{ width: "50px"}}/>
                            </div>
                            <div className="col-9">
                                <p className="h4 mb-0">Accuracy</p>
                                <p>EchoTranscribe is powered by Google AI, one the most accurate and fast Speech to text AI in the world.</p>
                            </div>
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="offset-2 col-1">
                                <img src="/images/languages.png" alt="Languages" className="" style={{ width: "50px"}}/>
                            </div>
                            <div className="col-9">
                                <p className="h4 mb-0">125+ languages</p>
                                <p>Many languages around the world supported, including country unique dialects.</p>
                            </div>
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="offset-2 col-1">
                                <img src="/images/diarization.png" alt="Diarization" className="" style={{ width: "50px"}}/>
                            </div>
                            <div className="col-9">
                                <p className="h4 mb-0">Diarization</p>
                                <p>Allows Google to make the difference between the speakers and add tag name to recognize which one is talking. Very useful for meeting, interviews and podcast.</p>
                            </div>
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="offset-2 col-1">
                                <img src="/images/security.png" alt="Security" className="" style={{ width: "50px"}}/>
                            </div>
                            <div className="col-9">
                                <p className="h4 mb-0">Security</p>
                                <p>No worries, your data is privated and only you can have access to it. And transcribing results are stored in encrypted form.</p>
                            </div>
                        </div>
                    </div> 
                    
                    {/* Functionnalities */}

                    {/* Pricing */}
                    <Pricing></Pricing>
                    
                    {/* Reviews */}
                    
                    {/* QA */}
                    <div className="row mt-3 pt-5">
                        <div className="col-12 text-center mb-5">
                            <p className="h1 mb-0">Q&As</p>
                            <p className="text-muted">Those the common questions asked by the user.</p>
                            {/* <p className="lead text-muted mb-5">Those are what our application can be used for.</p> */}
                        </div>
                    </div>
                    <QA about="general" /> 
                    {/* <QA about="general" />  */}
                    
                </div>
            </div> 
        </div> 

    )
}
