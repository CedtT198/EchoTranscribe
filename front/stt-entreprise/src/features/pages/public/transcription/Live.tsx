import { useEffect, useState } from "react";
// import TextEditor from "../../../components/TextEditor";
import { streamingDefault } from "../../../../api/transcription";
import type { FormDataTranscription } from "../../../../api/transcription";
import { useStream } from "../../../../auth/useStream";
import StreamingSettings from "../../../../components/transcription/StreamingSettings";
import { Link, useNavigate } from "react-router-dom";
import VoiceWave from "../../../../components/VoiceWave";

function Live() {
    // const [enable, setEnable] = useState(false);
    // const toggle = () =>{
    //     setEnable(prev => !prev);
    // } 
    
      const navigate = useNavigate();
    
    const [settings, setSettings] = useState<FormDataTranscription>(streamingDefault);
    useEffect(() => {
        console.log('🔧 Streaming Settings mis à jour :', settings);
    }, [settings]);

    const { startRecording, stopRecording, recording, transcripts, currentInterim, error } = useStream(settings);

    const summary = () => {
        const metadataJson = JSON.stringify(settings);
        const fd = new FormData();
        fd.append('language', settings.mainLanguage);
        fd.append('metadata', new Blob([metadataJson], { type: 'application/json' }));

        navigate("/public/layout/summary", {
        state: {
            formDataTranscript: fd,
            transType: "Live",
            liveTranscript: transcripts
        },
        });
    }

    return (
        <div className="mb-5">
            <div className="col-12">
                <div className="col-12 text-center">
                    <p className="h1 page-title mb-0">Live transcribing</p>
                    <p className="text-muted">Generate translated captions and audio in real-time. Try for free!</p>
                </div>
                <div className="col-12 mb-5">
                    <div className="text-center d-flex justify-content-center align-items-center">
                        <div className="bg-dark p-1 rounded-pill">
                        <Link className="btn btn rounded-pill mx-1 text-light" type="button" to="/public/layout/batch">
                            <span className="fe fe-file fe-16 mr-1"></span>Upload audio
                        </Link>
                        <button className="btn btn-primary rounded-pill mx-1 text-light" type="button">
                            <span className="dot mr-2"></span>Transcribe live audio
                        </button>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    {/* <div className="col-auto mb-5">
                        <h5 className="card-title"></h5>
                        <TextEditor minHeight={400} fontSize={28} />
                    </div> */}
                    <div className="col-auto mb-3 px-5" style={{minHeight: 350}}>
                        <div className="transcription">
                            {/* {transcripts && <p className="">Speaker: </p>} */}
                            {transcripts.map((transcript, index) => (
                                // <div key={index} className="line final">
                                <p key={index} className="text-dark mb-0">{transcript}</p>
                                // </div>
                            ))}
                        
                            {/* La ligne en cours d'écriture (seulement si on est en train d'enregistrer et qu'il y a du texte interim) */}
                            {recording && currentInterim && (
                                <div className="line interim">
                                    {/* <p>Speaker: </p> {currentInterim} */}
                                    <span className="cursor">|</span>  {/* Optionnel : petit curseur qui clignote */}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            {!recording &&
                                <div className="">
                                    {/* if efa en cours le transcript */}
                                    {/* <button className="circle circle-md bg-white border-primary" type='button' onClick={summary}>
                                        <span className="fe fe-settings fe-16 text-primary"></span>
                                    </button> */}

                                    <div className="tooltip-container col-12 mb-3">
                                        <button className="tooltip-button">Press and start talking</button>
                                        {/* <div className="tooltip-arrow"></div> */}
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <button className="circle circle-lg bg-primary border-primary mx-1" style={{ width: 75, height: 75}} type='button' onClick={startRecording}>
                                            <span className="fe fe-mic fe-32 text-white"></span>
                                        </button>

                                        <StreamingSettings
                                            settings={settings}
                                            setSettings={setSettings}>
                                        </StreamingSettings>
                                    </div>
                                </div>
                            }
                            {/* {recording && <button className="circle circle-md  bg-white border-danger mr-2" style={{ width: 75, height: 75}} type='button' onClick={stopRecording}> */}
                            {recording &&
                                <div className="d-flex justify-content-center align-items-center">
                                    <VoiceWave></VoiceWave>
                                    <button className="circle circle-md  bg-danger border-danger mx-2 my-5" style={{ width: 75, height: 75}} type='button' onClick={stopRecording}>
                                        <span className="fe fe-square fe-32 text-white"></span>
                                    </button>
                                    
                                    <StreamingSettings
                                        settings={settings}
                                        setSettings={setSettings}>
                                    </StreamingSettings>
                                </div>
                            }
                        </div>
                    </div>
                    {error && 
                    <div className="mb-5 px-5">
                        <div className="alert alert-danger" role="alert">
                            <span className="fe fe-minus-circle fe-16 mr-2"></span>{error}
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Live
