import { useRef, useState } from "react";
import TextEditor from "../../../components/TextEditor";

function Live() {
    const [isHidden, setHidden] = useState(false);
    const toggleVisibility = () =>{
        setHidden(prev => !prev);
    } 
    
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    const startRecording = async () => {
        try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm', // Format recommandé pour streaming (opus codec)
        });

        mediaRecorderRef.current = mediaRecorder;

        wsRef.current = new WebSocket('ws://localhost:8080/audio-stream');
        wsRef.current.onopen = () => {
            console.log('WebSocket opened.');
            mediaRecorder.start(250);
            setRecording(true);
        };

        wsRef.current.onclose = () => console.log('WebSocket closed.');
        wsRef.current.onerror = (error) => console.error(':', error);

        // Envoyer les chunks audio via WebSocket
        mediaRecorder.ondataavailable = (event: BlobEvent) => {
            if (event.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
                wsRef.current.send(event.data); // Envoyer le blob binaire
            }
        };

        // Gérer la fin de l'enregistrement
        mediaRecorder.onstop = () => {
            wsRef.current?.close();
            setRecording(false);
        };
        } catch (error) {
            console.error('Error accessing the microphone: ', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    };

    return (
        <div className="mb-5">
            <div className="col-12">
                <h2 className="page-title mb-0">Live transcribing</h2>
                <p className="text-muted">
                    Supported file: audio (.mp3, .wav) and video (.mp4)
                </p>
                <div className="card py-5">
                    <form action="">
                        <div className="col-12 container row mx-0 px-5 custom-switch mb-4">
                            <div className="col-lg-4 col-md-4 col-xs-12 pl-5">
                                <input type="checkbox" className="form-control custom-control-input" id="customSwitch1" onClick={toggleVisibility}/>
                                <label className="custom-control-label" htmlFor="customSwitch1">Disable diarization
                                    <span className="fe fe-info fe-16 ml-2 text-secondary" title="Let the AI knows how many people are in the conversation."></span>
                                </label>
                            </div>
                            {!isHidden &&
                                <>
                                    <div className="col-lg-4 col-md-4 col-xs-12">
                                        <label htmlFor="min_people">Min. people</label>
                                        <input type="number" className="form-control"/>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-xs-12">
                                        <label htmlFor="max_people">Max. people</label>
                                        <input type="number" className="form-control"/>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="form-group col-12 px-5">
                            <label className="mb-0">File language</label>
                            {!isHidden && <p className="text-muted">Only 1 language between the speaker(s).</p>}
                            {isHidden && <p className="text-muted">Maximum is 4 languages.</p>}
                            <select className="form-control" id="multi-select2">
                                <optgroup label="America">
                                    <option value="en">English</option>
                                    <option value="br">Brazil</option>
                                </optgroup>
                                <optgroup label="Europe">
                                    <option value="fr-FR">French</option>
                                    <option value="fr-CA">French Canada</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="mb-5 px-5">
                            <div className="alert alert-danger" role="alert">
                                <span className="fe fe-minus-circle fe-16 mr-2"></span>Unknown error while trying to transcribe the file.
                            </div>
                        </div>
                        {/* <div className="col-auto mb-5">
                            <h5 className="card-title"></h5>
                            <TextEditor minHeight={400} fontSize={28} />
                        </div> */}
                        <div className="row mb-4">
                            <div className="col-12 d-flex justify-content-center align-items-center">
                                {!recording &&
                                    <>
                                        <button className="circle circle-lg bg-primary border-primary mr-2" type='button' onClick={startRecording}>
                                            <span className="fe fe-mic fe-32 text-white"></span>
                                        </button>
                                        <button className="circle circle-md bg-white border-primary" type='button'>
                                            <span className="fe fe-settings fe-16 text-primary"></span>
                                        </button>
                                    </>
                                }
                                {recording && <button className="circle circle-md  bg-white border-danger mr-2" type='button' onClick={stopRecording}>
                                    <span className="fe fe-square fe-16 text-danger"></span>
                                </button>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Live