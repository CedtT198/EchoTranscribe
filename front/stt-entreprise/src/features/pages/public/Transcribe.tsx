function Transcribe() {
    return (
        <div>
            <div className="col-12">
                <h2 className="page-title">File upload</h2>
                <p className="lead text-muted">
                    Supported file:
                    audio (.mp3, .wav) and
                    video (.mp4)
                </p>
                <div className="row mb-4">
                <div className="col-md-12">
                  <div className="card shadow mb-4">
                    <div className="card-header">
                      <strong>Dropzone</strong>
                    </div>
                    <div className="card-body">
                        <form action="/file-upload">
                            <div className="dropzone bg-light rounded-lg mb-5 col-12" id="tinydash-dropzone">
                                <div className="dz-message needsclick">
                                    <div className="circle circle-lg bg-primary">
                                        <i className="fe fe-upload fe-24 text-white"></i>
                                    </div>
                                    <h5 className="text-muted mt-4">Drop files here or click to upload</h5>
                                </div>
                            </div>
                            <div className="form-group col-md-12">
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
                                    <label className="custom-control-label" htmlFor="customSwitch1">Detect automaticaly the language used</label>
                                </div>
                            </div>
                            <div className="form-group col-md-12 mb-5">
                                <label>File language</label>
                                <select className="form-control select2" id="simple-select2">
                                    <optgroup label="America">
                                        <option value="en-ENG">English</option>
                                    </optgroup>
                                    <optgroup label="Europe">
                                        <option value="fr-FR">French</option>
                                        <option value="sp-SP">Spanish</option>
                                        <option value="it-IT">Italian</option>
                                    </optgroup>
                                </select>
                            </div>
                          <button type="button" className="btn mb-2 btn-primary btn-lg btn-block">Transcribe</button>
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