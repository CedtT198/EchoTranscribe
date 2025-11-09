function Resume() {
    return (
        <div>
            <div className="col-12">
                <h2 className="page-title">Summary section</h2>
                <p className="lead text-muted">
                    Resume your text into useful report or a summary in bullet-points format.
                </p>
                <div className="row mb-4">
                <div className="col-md-12">
                  <div className="card shadow mb-4">
                    <div className="card-header">
                      <strong>Dropzone</strong>
                    </div>
                    <div className="card-body">
                        <form action="/file-upload">
                            <div className="form-group col-md-12 mb-5">
                                <h5 className="card-title">Editor</h5>
                                <div id="editor">
                                    {/*  */}
                                </div>
                            </div>
                            <div className="container mb-4">
                                <h5 className="card-title">Choose the type of result</h5>
                                <div className="row">
                                    <div className="custom-control custom-radio col-md-4">
                                        <input type="radio" className="custom-control-input" id="customControlValidation1" name="radio-stacked" required/>
                                        <label className="custom-control-label" htmlFor="customControlValidation1">Standard</label>
                                    </div>
                                    <div className="custom-control custom-radio col-md-4">
                                        <input type="radio" className="custom-control-input" id="customControlValidation2" name="radio-stacked" required/>
                                        <label className="custom-control-label" htmlFor="customControlValidation2">Very short</label>
                                    </div>
                                    <div className="custom-control custom-radio col-md-4">
                                        <input type="radio" className="custom-control-input" id="customControlValidation3" name="radio-stacked" required/>
                                        <label className="custom-control-label" htmlFor="customControlValidation3">Decisional (for company)</label>
                                    </div>
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
                          <button type="button" className="btn mb-2 btn-primary btn-lg btn-block">Summary</button>
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

export default Resume;