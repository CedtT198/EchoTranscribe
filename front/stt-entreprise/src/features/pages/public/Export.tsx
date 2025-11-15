import TextEditor from "../../../components/TextEditor"

function Export() {
    return (
        <div>
            <div className="col-12">
            <h2 className="page-title mb-0">Export section</h2>
            <p className="text-muted">Share the transcription's summary.</p>
            <div className="row mb-4">
                <div className="col-md-12">
                    <div className="card shadow mb-4">
                        <div className="card-body">
                            <div className="form-group col-md-12 mb-5">
                                <h5 className="card-title">Summary</h5>
                                <TextEditor></TextEditor>
                            </div>
                            <div className="form-inline mb-4">
                                <button type="button" className="btn btn-outline-danger mx-3">Pdf</button>
                                <button type="button" className="btn btn-outline-info mx-3">Docx</button>
                                <button type="button" className="btn btn-outline-warning mx-3">Email</button>
                            </div>
                            <div className="form-group col-md-12">
                                <div className="alert alert-danger" role="alert">
                                    <span className="fe fe-minus-circle fe-16 mr-2"></span>Error.
                                </div>
                            </div>
                            {/*  */}
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

export default Export