import { useState, useEffect } from "react";
import { findAllSubType } from "../../../api/sub_type";
import { useAuth0 } from "@auth0/auth0-react";

function Landing() {
    const [sub_types, setSub] = useState([]);
    useEffect(() => {
        const fetchSubs = async () => {
        try {
            const data = await findAllSubType();
            setSub(data);
        } catch (err) {
            console.log((err as Error).message);
        }
        };

        fetchSubs();
    }, []);
    
    const { isAuthenticated, loginWithRedirect: login } = useAuth0();

    const signup = () => login({
        authorizationParams: { screen_hint: "signup" },
        appState: { returnTo: "/public/layout" },
    });

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-12 mb-5">
                    <div className="w-50 mx-auto text-center justify-content-center">
                        <p className="h1 page-title mb-0 font-weight-bold">Transcribe for free</p>
                        <p className="lead text-muted mb-4">Take notes with your voice in real-time, or transcribe audio/video batch file.</p>
                        <p className="help-text mt-2 text-muted">No account, no credit card need for free version.</p>
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

                    {/* Welcome */}
                    <div className="row my-5 p-5">
                        <div className="col-12 text-center mb-5">
                            <div className="mb-3">
                                <img src="h.jpg" alt="Company logo" />
                            </div>
                            <p className="h1 mb">Welcome to <span className="text-primary">Echotranscribe</span></p>
                            {/* <p className="lead text-muted mb-5">Those are what our application can be used for.</p> */}
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="col-3"></div>
                            <div className="col-8">
                                <p className="h4 mb-0">Free version</p>
                                <p>Transcribe a batch file for free with some formats available. No account, no use of credit card.</p>
                            </div>
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="col-3"></div>
                            <div className="col-8">
                                <p className="h4 mb-0">Very fast</p>
                                <p>The AI engine provides fast and accurate answer.</p>
                            </div>
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="col-3"></div>
                            <div className="col-8">
                                <p className="h4 mb-0">Large file size</p>
                                <p>File up to 8 hours of length or 10go can be uploaded.</p>
                            </div>
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="col-3"></div>
                            <div className="col-8">
                                <p className="h4 mb-0">Many audio/video formats supported</p>
                                <p>EchoTranscribe supports many audio and video format file such as: FLAC, MULAW, AMR, AMR_WB, MP3, MP4, MOV, M4A, AAC, WAV, OGG, OPUS, MPEG</p>
                            </div>
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="col-3"></div>
                            <div className="col-8">
                                <p className="h4 mb-0">Download your transcribed file</p>
                                <p>Export the results in PDF, DOCX, TXT and share it with your coworkers</p>
                            </div>
                        </div>
                    </div> 

                    {/* Google speech to text */}
                    <div className="row my-5 p-5">
                        <div className="col-12 text-center mb-5">
                            <div className="mb-3">
                                <img src="h.jpg" alt="Google logo" />
                            </div>
                            <p className="h1 mb">Powered by Google</p>
                            {/* <p className="lead text-muted mb-5">Those are what our application can be used for.</p> */}
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="col-3"></div>
                            <div className="col-8">
                                <p className="h4 mb-0">Accuracy</p>
                                <p>EchoTranscribe is powered by Google AI, one the most accurate and fast Speech to text AI in the world.</p>
                            </div>
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="col-3"></div>
                            <div className="col-8">
                                <p className="h4 mb-0">125+ languages</p>
                                <p>Many languages around the world supported, including country unique dialects.</p>
                            </div>
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="col-3"></div>
                            <div className="col-8">
                                <p className="h4 mb-0">Diarization</p>
                                <p>Allows Google to make the difference between the speakers and add tag name to recognize which one is talking. Very useful for meeting, interviews and podcast.</p>
                            </div>
                        </div>
                        <div className="col-12 row mb-3">
                            <div className="col-3"></div>
                            <div className="col-8">
                                <p className="h4 mb-0">Security</p>
                                <p>No worries, your data is privated and only you can have access to it. And transcribing results are stored in encrypted form.</p>
                            </div>
                        </div>
                    </div> 
                    
                    {/* Functionnalities */}

                    {/* Pricing */}
                        <div className="my-5 p-5">
                            <div className="text-center">
                                <h2 className="mb-0">Pricing</h2>
                                <p className="lead text-muted mb-5">See below our subscription offer that fits better for you</p>
                            </div>
                            <div className="card-deck my-4">
                                {sub_types.map(sub => (
                                    <div className="card mb-4 shadow">
                                        <div className="card-body text-center p-5 d-flex flex-column accordion-item-hover">
                                            <div className="border-bottom-1">
                                                <p className="h3 mb-0">{sub.name}</p>
                                                <p className=" mb-0" style={{ fontSize: 40 }}>${sub.price}</p>
                                                <p className="text-muted">{sub.frequency}</p><hr/>
                                            </div>
                                            <ul className="mb-5 text-left px-2">
                                                {sub.description.map((f, i) => (
                                                    <li key={i} className="mb-1">{f}</li>
                                                ))}
                                            </ul>
                                            {!isAuthenticated &&
                                                <div className="py-2 mt-auto">
                                                    <button className="btn btn-primary w-100" style={{ fontSize: 18 }} onClick={signup}>Sign up now</button>
                                                </div>
                                            }
                                        </div>
                                    </div> 
                                ))}
                            </div>
                        </div>
                    
                    {/* Reviews */}
                    
                    {/* QA */}
                    
                </div>
            </div> 
        </div> 

    )
}

export default Landing;