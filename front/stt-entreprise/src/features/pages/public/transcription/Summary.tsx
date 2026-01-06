import Textarea from "../../../../components/Textarea";

const Summary: React.FC<string> = (transcription_type) => {
  if (transcription_type === "long") {}
  if (transcription_type === "short") {}

    return (
      <div className="d-flex justify-content-center">
        <div className="col-xs-12 col-md-9 col-lg-9">
          <div className="col-12 text-center">
            <p className="h1 mb-0">Summary section</p>
            <p className="text-muted">Resume your text into useful report or a summary in bullet-points format.</p>
          </div>
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow mb-4">
                <div className="card-body">
                  <form action="/file-upload" className="container row m-0">
                    <div className="col-12 mb-4">
                      {/* title */}
                      <Textarea fs={45} mh={10} ml={200} className="text-primary" ph="Title"></Textarea> 
                      <Textarea fs={22} mh={10} ml={200} className="text-muted" ph="Subtitle"></Textarea>
                    </div>
                    <div className="col-md-12 mb-5">
                      <Textarea fs={16} mh={500} ml={10000000} className=""></Textarea> 
                    </div>
                    <div className="col-12 mb-4">
                      <div className="text-center d-flex justify-content-center align-items-center">
                        <div className="bg-dark p-1 rounded-pill">
                          <button className="btn btn rounded-pill mx-1 text-light" type="button">
                            <span className="fe fe-info fe-16 mr-1"></span>
                            <span>Download/Export</span>
                          </button>
                          <button className="btn btn-primary rounded-pill mx-1 text-light" type="button">
                            <span className="fe fe-info fe-16 mr-1"></span>AI Summary
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="container mb-4">
                        <h5 className="card-title">Choose the type of result</h5>
                        <div className="row p-4">
                            <div className="custom-control custom-radio col-md-4">
                                <input type="radio" className="custom-control-input" id="customControlValidation1" name="radio-stacked" required/>
                                <label className="custom-control-label" htmlFor="customControlValidation1">Standard</label>
                            </div>
                            <div className="custom-control custom-radio col-md-4">
                                <input type="radio" className="custom-control-input" id="customControlValidation2" name="radio-stacked" required/>
                                <label className="custom-control-label" htmlFor="customControlValidation2">Short</label>
                            </div>
                            <div className="custom-control custom-radio col-md-4">
                                <input type="radio" className="custom-control-input" id="customControlValidation3" name="radio-stacked" required/>
                                <label className="custom-control-label" htmlFor="customControlValidation3">Decisional (for pro)</label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-group col-md-12">
                      <div className="alert alert-danger" role="alert">
                        <span className="fe fe-minus-circle fe-16 mr-2"></span>Unknown error while trying to resume the text.
                      </div>
                      <button type="button" className="btn mb-2 btn-primary btn-lg btn-block">Resume</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Summary;