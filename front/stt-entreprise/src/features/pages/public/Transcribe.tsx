import { useState } from "react";

function Transcribe() {
  const [isHidden, setHidden] = useState(false);
  const toggleVisibility = () =>{
    setHidden(prev => !prev);
  } 

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
  }

    return (
        <div>
            <div className="col-12">
                <h2 className="page-title mb-0">File upload</h2>
                <p className="text-muted">
                    Supported file: audio (.mp3, .wav) and video (.mp4)
                </p>
                <div className="row mb-4">
                <div className="col-md-12">
                  <div className="card shadow mb-4">
                    <div className="card-header">
                      <strong>Dropzone</strong>
                    </div>
                    <div className="card-body">
                      <form action="/file-upload" onSubmit={handleUpload}>
                        <div className="dropzone bg-light rounded-lg mb-5 col-12" id="tinydash-dropzone">
                            <div className="dz-message needsclick">
                                <div className="circle circle-lg bg-primary">
                                    <i className="fe fe-upload fe-24 text-white"></i>
                                </div>
                                <h5 className="text-muted mt-4">Drop files here or click to upload</h5>
                            </div>
                        </div>
                        <div className="col-12 custom-control custom-switch d-flex mb-4">
                          <div className="col-auto">
                            <input type="checkbox" className="form-control custom-control-input" id="customSwitch1" onClick={toggleVisibility}/>
                            <label className="custom-control-label" htmlFor="customSwitch1">Disable diarization
                              <span className="fe fe-info fe-16 ml-2 text-secondary" title="Let the AI knows how many people are in the conversation."></span>
                            </label>
                          </div>
                          {!isHidden && (
                            <>
                              <div className="col-auto">
                                <label htmlFor="min_people">Min. people</label>
                                <input type="number" className="form-control"/>
                              </div>
                              <div className="col-auto">
                                <label htmlFor="max_people">Max. people</label>
                                <input type="number" className="form-control"/>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="form-group col-12 mb-4">
                          <label className="mb-0">File language(s)</label>
                          {!isHidden && <p className="text-muted">Only 1 language between the speaker(s).</p>}
                          {isHidden && <p className="text-muted">Maximum is 4 languages.</p>}
                          <select className="form-control select2-multi" id="multi-select2">
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
                        <div className="form-group col-md-12">
                          <div className="alert alert-danger" role="alert">
                            <span className="fe fe-minus-circle fe-16 mr-2"></span>Unknown error while trying to transcribe the file.
                          </div>
                          <button type="button" className="btn mb-2 btn-primary btn-lg btn-block">Transcribe</button>
                        </div>
                      </form>
                      <div className="d-none" id="uploadPreviewTemplate">
                        <div className="card mt-1 mb-0 shadow-none border">
                          <div className="p-2">
                            <div className="row align-items-center">
                              <div className="col-auto">
                                <img data-dz-thumbnail src="#" className="avatar-sm rounded bg-light" alt=""/>
                              </div>
                              <div className="col pl-0">
                                <a href="javascript:void(0);" className="text-muted font-weight-bold" data-dz-name></a>
                                <p className="mb-0" data-dz-size></p>
                              </div>
                              <div className="col-auto">
                                <a href="" className="btn btn-link btn-lg text-muted" data-dz-remove>
                                  <i className="dripicons-cross"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
}

export default Transcribe;