import { useEffect, useState } from "react";
// import TextEditor from "../../../components/TextEditor";
import { streamingDefault } from "../../../../api/transcription";
import type { FormDataTranscription } from "../../../../api/transcription";
import { useStream } from "../../../../auth/useStream";
import StreamingSettings from "../../../../components/transcription/StreamingSettings";
import { useNavigate } from "react-router-dom";

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
                    <p className="text-muted">Supported file: audio (.mp3, .wav) and video (.mp4)</p>
                </div>
                <div className="card py-5">
                    {error && 
                    <div className="mb-5 px-5">
                        <div className="alert alert-danger" role="alert">
                            <span className="fe fe-minus-circle fe-16 mr-2"></span>{error}
                        </div>
                    </div>}
                    {/* <div className="col-auto mb-5">
                        <h5 className="card-title"></h5>
                        <TextEditor minHeight={400} fontSize={28} />
                    </div> */}
                    <div className="col-auto mb-3 px-5" style={{minHeight: 200}}>
                        <div className="transcription">
                            {transcripts.map((transcript, index) => (
                                // <div key={index} className="line final">
                                    <p key={index}>Speaker: {transcript}</p>
                                // </div>
                            ))}
                        
                            {/* La ligne en cours d'écriture (seulement si on est en train d'enregistrer et qu'il y a du texte interim) */}
                            {recording && currentInterim && (
                                <div className="line interim">
                                    <p>Speaker: </p> {currentInterim}
                                    <span className="cursor">|</span>  {/* Optionnel : petit curseur qui clignote */}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            {!recording &&
                                <>
                                    {/* if efa en cours le transcript */}
                                    <button className="circle circle-md bg-white border-primary" type='button' onClick={summary}>
                                        <span className="fe fe-settings fe-16 text-primary"></span>
                                    </button>

                                    <button className="circle circle-lg bg-primary border-primary mx-1" type='button' onClick={startRecording}>
                                        <span className="fe fe-mic fe-32 text-white"></span>
                                    </button>
                                    
                                    <StreamingSettings
                                        settings={settings}
                                        setSettings={setSettings}>
                                    </StreamingSettings>
                                </>
                            }
                            {recording && <button className="circle circle-md  bg-white border-danger mr-2" type='button' onClick={stopRecording}>
                                <span className="fe fe-square fe-16 text-danger"></span>
                            </button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Live
