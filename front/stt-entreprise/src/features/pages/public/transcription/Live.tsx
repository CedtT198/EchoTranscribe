import { useEffect, useState } from "react";
// import TextEditor from "../../../components/TextEditor";
import { streamingDefault } from "../../../../api/transcribe";
import type { FormDataTranscription } from "../../../../api/transcribe";
import { useStream } from "../../../../auth/useStream";
import StreamingSettings from "../../../../components/transcription/StreamingSettings";

function Live() {
    // const [enable, setEnable] = useState(false);
    // const toggle = () =>{
    //     setEnable(prev => !prev);
    // } 
    
    const [settings, setSettings] = useState<FormDataTranscription>(streamingDefault);
    useEffect(() => {
        console.log('🔧 Streaming Settings mis à jour :', settings);
    }, [settings]);

    const { startRecording, stopRecording, recording, transcripts, error } = useStream(settings);

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
                        <p>{transcripts}</p>
                    </div>
                    <div className="row mb-4">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            {!recording &&
                                <>
                                    <button className="circle circle-lg bg-primary border-primary mr-2" type='button' onClick={startRecording}>
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
