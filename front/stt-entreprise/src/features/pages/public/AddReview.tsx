import TextEditor from "../../../components/TextEditor"

function AddReview () {
    return (
        <div>
            <div className="col-10">
                <h2 className="page-title mb-0">Your review</h2>
                <p className="mb-4 text-muted"></p>
            </div>
            <div className="container">
                <div className="col-12">
                    <div className="row mb-4">
                        <div className="col-md-12">
                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <form action="/file-upload">
                                        <div className="form-group col-md-12 mb-5">
                                            <h5 className="card-title">Comment</h5>
                                            <TextEditor></TextEditor>
                                        </div>
                                        <div className="container mb-4">
                                            <h5 className="card-title">Rate</h5>
                                            <div className="row pl-4">
                                                {/* {Array.from({ length: 5 }, (_, i) => ( */}
                                                {/* // ))} */}
                                                <div className="custom-control custom-radio col-md-2">
                                                    <input type="radio" className="custom-control-input" id='customControlValidation1' name="radio-stacked" required/>
                                                    <label className="custom-control-label" htmlFor="customControlValidation1">1 stars</label>
                                                </div>
                                                <div className="custom-control custom-radio col-md-2">
                                                    <input type="radio" className="custom-control-input" id='customControlValidation2' name="radio-stacked" required/>
                                                    <label className="custom-control-label" htmlFor="customControlValidation2">2 stars</label>
                                                </div>
                                                <div className="custom-control custom-radio col-md-2">
                                                    <input type="radio" className="custom-control-input" id='customControlValidation3' name="radio-stacked" required/>
                                                    <label className="custom-control-label" htmlFor="customControlValidation3">3 stars</label>
                                                </div>
                                                <div className="custom-control custom-radio col-md-2">
                                                    <input type="radio" className="custom-control-input" id='customControlValidation4' name="radio-stacked" required/>
                                                    <label className="custom-control-label" htmlFor="customControlValidation4">4 stars</label>
                                                </div>
                                                <div className="custom-control custom-radio col-md-2">
                                                    <input type="radio" className="custom-control-input" id='customControlValidation5' name="radio-stacked" required/>
                                                    <label className="custom-control-label" htmlFor="customControlValidation5">5 stars</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <div className="alert alert-danger" role="alert">
                                                <span className="fe fe-minus-circle fe-16 mr-2"></span>Unknown error.
                                            </div>
                                            <button type="button" className="btn mb-2 btn-primary btn-lg btn-block">Resume</button>
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
        </div>
    )
};

export default AddReview