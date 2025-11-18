import { useState } from "react";
import TextEditor from "../../../components/TextEditor";

function Live() {
    const [isHidden, setHidden] = useState(false);
    const toggleVisibility = () =>{
        setHidden(prev => !prev);
    } 

    return (
        <div className="col-12">
            <h2 className="page-title mb-0">Live transcribing</h2>
            <p className="text-muted">
                Supported file: audio (.mp3, .wav) and video (.mp4)
            </p>
            <div className="card p-5">
                <form action="">
                    <div className="col-12 row custom-switch mb-4">
                        <div className="col-lg-4 col-md-4 col-xs-12">
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
                    <div className="form-group col-12">
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
                    <div className="form-group alert alert-danger mb-5" role="alert">
                        <span className="fe fe-minus-circle fe-16 mr-2"></span>Unknown error while trying to transcribe the file.
                    </div>
                    <div className="form-group col-md-12 mb-5">
                        <h5 className="card-title">Result</h5>
                        <textarea className="form-control" name="" id="" rows="6" placeholder="The result of your live transcribing will be written here..."></textarea>
                    </div>
                    <div className="row mb-4">
                        <div className="col-12 d-flex justify-content-center">
                            <button className="circle circle-lg bg-primary">
                                <span className="fe fe-mic fe-32 text-white"></span>
                            </button>
                        </div>
                        <div className="col-12 text-center">
                            <h5 className="text-muted mt-4">Click the logo and wait for it to blink before talking.</h5>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <button className="mx-1 btn btn-warning text-white">
                            <span className="fe fe-plus fe-16 mr-2"></span>Keep talking
                        </button>
                        <button className="mx-1 btn btn-info text-white">
                            <span className="fe fe-send fe-16 mr-2"></span>Finished
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Live