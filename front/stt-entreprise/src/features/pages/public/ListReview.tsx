function ListReview() {
    return (
        <div>
            <div className="col-10">
                <h2 className="page-title mb-0">Reviews section</h2>
                <p className="mb-4 text-muted">Write your thoughts and help us to improve our algorithms for a better results.</p>
            </div>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center my-3">
                    <div className="mx-4">
                        <p className="fe-32 font-weight-bold m-0">
                            <span className="fe fe-star text-warning mr-1"></span>4,5
                        </p>
                        <p className="mb-1">1,777 Reviews</p>
                    </div>
                    <div className="mx-5">
                        <button className="btn btn-dark">
                            <a href="/public/layout/addReview" className="text-light">Review</a>
                        </button>
                    </div>
                </div>

                {/* Filter */}
                <div className="card card-body my-4">
                    <p className="fe-16 font-weight-bold mb-4">
                        Filter<span className="fe fe-filter text-dark ml-2"></span>
                    </p>
                    <div className="container">

                        {/* <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" className="custom-control-input" id="customControlValidation1" required>
                            <label className="custom-control-label" for="customControlValidation1">Check this custom checkbox</label>
                        </div> */}

                        <div className="mx-3 row">
                            <div className="col-xs-2 col-md-2 col-lg-2 custom-control custom-checkbox mb-3">
                                <input type="checkbox" className="custom-control-input" id="customControlValidation1" />
                                <label className="custom-control-label" htmlFor="customControlValidation1">5 stars</label>
                            </div>
                            <div className="col-md-10 col-xs-10 col-lg-10 ">
                                <div className="progress mb-3">
                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: 100+'%' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-3 row">
                            <div className="col-xs-2 col-md-2 col-lg-2 custom-control custom-checkbox mb-3">
                                <input type="checkbox" className="custom-control-input" id="customControlValidation1" />
                                <label className="custom-control-label" htmlFor="customControlValidation1">4 stars</label>
                            </div>
                            <div className="col-md-10 col-xs-10 col-lg-10 ">
                                <div className="progress mb-3">
                                    <div className="progress-bar bg-info" role="progressbar" style={{ width: 50+'%' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-3 row">
                            <div className="col-xs-2 col-md-2 col-lg-2 custom-control custom-checkbox mb-3">
                                <input type="checkbox" className="custom-control-input" id="customControlValidation1" />
                                <label className="custom-control-label" htmlFor="customControlValidation1">3 stars</label>
                            </div>
                            <div className="col-md-10 col-xs-10 col-lg-10 ">
                                <div className="progress mb-3">
                                    <div className="progress-bar" role="progressbar" style={{ width: 5+'%' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-3 row">
                            <div className="col-xs-2 col-md-2 col-lg-2 custom-control custom-checkbox mb-3">
                                <input type="checkbox" className="custom-control-input" id="customControlValidation1" />
                                <label className="custom-control-label" htmlFor="customControlValidation1">2 stars</label>
                            </div>
                            <div className="col-md-10 col-xs-10 col-lg-10 ">
                                <div className="progress mb-3">
                                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: 1+'%' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-3 row">
                            <div className="col-xs-2 col-md-2 col-lg-2 custom-control custom-checkbox mb-3">
                                <input type="checkbox" className="custom-control-input" id="customControlValidation1" />
                                <label className="custom-control-label" htmlFor="customControlValidation1">1 stars</label>
                            </div>
                            <div className="col-md-10 col-xs-10 col-lg-10 ">
                                <div className="progress mb-3">
                                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: 3+'%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <h2 className="fe-24 font-weight-bolder mb-0">List</h2>
                    <p className="text-muted">Show all</p>
                </div>
                
                {/* Reviews list */}
                <div className="my-4">
                    <div className="card shadow mb-4">
                        <div className="card-header mt-2">
                            <div className="container row">
                                <div className="col-1 mx-0">
                                    <span className="avatar avatar-sm">
                                        <img src="./assets/avatars/face-1.jpg" alt="p" className="avatar-img rounded-circle"/>
                                    </span>
                                </div>
                                <div className="col-9">
                                    <p className="mb-0">Your name and your  first name</p>
                                    <p className="fe-12 text-muted mt-0">From France</p>
                                </div>
                                <div className="col-2">
                                    <button type="button" className="btn mb-2 btn-outline-danger mx-1" data-toggle="modal" data-target="#verticalModal">
                                        <span className="fe fe-16 fe-trash"></span>
                                    </button>
                                    <div className="modal fade" id="verticalModal" tabindex="-1" role="dialog" aria-labelledby="verticalModalTitle" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="verticalModalTitle">Confirm</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">Are you sure about deleting your reviews ?</div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn mb-2 btn-dark" data-dismiss="modal">No</button>
                                                        <button type="button" className="btn mb-2 btn-danger">Yes</button>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" className="btn mb-2 btn-outline-warning mx-1">
                                        <span className="fe fe-16 fe-edit"></span>
                                    </button>
                                </div>
                                <div className="col-12 ml-1">
                                    <span className="fe fe-star text-warning mr-1"></span>
                                    <span className="fe fe-star text-warning mr-1"></span>
                                    <span className="fe fe-star text-warning mr-1"></span>
                                    <span className="fe fe-star text-warning mr-1"></span>
                                    <span className="fe fe-star text-dark mr-1"></span>
                                </div>
                            </div>
                            <div className="ml-2">
                                <p className="fe-12 text-muted">3 dec 2025</p>
                            </div>
                        </div>
                        <div className="card-body">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum magnam delectus suscipit iusto? Voluptates, minima eligendi quidem mollitia dicta earum deserunt cumque beatae magnam perferendis delectus necessitatibus vel fugiat corrupti. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid expedita itaque reiciendis repellendus repudiandae dolorum magnam corporis animi quidem ab, quae, esse dolorem accusantium quis nisi unde ipsam suscipit veritatis!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, delectus debitis blanditiis hic provident sunt voluptas iste necessitatibus vel perspiciatis, in possimus ullam tempora quos corrupti repellat id ducimus eaque.</p>
                        </div>
                    </div>
                </div>
                <div className="my-4">
                    <div className="card shadow mb-4">
                        <div className="card-header mt-2">
                            <div className="container row">
                                <div className="col-1 mx-0">
                                    <span className="avatar avatar-sm">
                                        <img src="./assets/avatars/face-1.jpg" alt="p" className="avatar-img rounded-circle"/>
                                    </span>
                                </div>
                                <div className="col-9">
                                    <p className="mb-0">Your name and your  first name</p>
                                    <p className="fe-12 text-muted mt-0">From France</p>
                                </div>
                                <div className="col-12 ml-1">
                                    <span className="fe fe-star text-warning mr-1"></span>
                                    <span className="fe fe-star text-warning mr-1"></span>
                                    <span className="fe fe-star text-warning mr-1"></span>
                                    <span className="fe fe-star text-warning mr-1"></span>
                                    <span className="fe fe-star text-dark mr-1"></span>
                                </div>
                            </div>
                            <div className="ml-2">
                                <p className="fe-12 text-muted">3 dec 2025</p>
                            </div>
                        </div>
                        <div className="card-body">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum magnam delectus suscipit iusto? Voluptates, minima eligendi quidem mollitia dicta earum deserunt cumque beatae magnam perferendis delectus necessitatibus vel fugiat corrupti. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid expedita itaque reiciendis repellendus repudiandae dolorum magnam corporis animi quidem ab, quae, esse dolorem accusantium quis nisi unde ipsam suscipit veritatis!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, delectus debitis blanditiis hic provident sunt voluptas iste necessitatibus vel perspiciatis, in possimus ullam tempora quos corrupti repellat id ducimus eaque.</p>
                        </div>
                    </div>
                </div>
                <div className="my-4">
                    <div className="card shadow mb-4">
                        <div className="card-header mt-2">
                            <div className="container row">
                                <div className="col-1 mx-0">
                                    <span className="avatar avatar-sm">
                                        <img src="./assets/avatars/face-1.jpg" alt="p" className="avatar-img rounded-circle"/>
                                    </span>
                                </div>
                                <div className="col-9">
                                    <p className="mb-0">Your name and your  first name</p>
                                    <p className="fe-12 text-muted mt-0">From France</p>
                                </div>
                                <div className="col-12 ml-1">
                                    <span className="fe fe-star text-warning mr-1"></span>
                                    <span className="fe fe-star text-warning mr-1"></span>
                                    <span className="fe fe-star text-warning mr-1"></span>
                                    <span className="fe fe-star text-warning mr-1"></span>
                                    <span className="fe fe-star text-dark mr-1"></span>
                                </div>
                            </div>
                            <div className="ml-2">
                                <p className="fe-12 text-muted">3 dec 2025</p>
                            </div>
                        </div>
                        <div className="card-body">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum magnam delectus suscipit iusto? Voluptates, minima eligendi quidem mollitia dicta earum deserunt cumque beatae magnam perferendis delectus necessitatibus vel fugiat corrupti. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid expedita itaque reiciendis repellendus repudiandae dolorum magnam corporis animi quidem ab, quae, esse dolorem accusantium quis nisi unde ipsam suscipit veritatis!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, delectus debitis blanditiis hic provident sunt voluptas iste necessitatibus vel perspiciatis, in possimus ullam tempora quos corrupti repellat id ducimus eaque.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListReview;


{/* <div>
    <div className="col-10">
        <h2 className="page-title mb-0">Reviews section</h2>
        <p className="mb-4 text-muted">Write your thoughts and help us to improve our algorithms for a better results.</p>
    </div>
    <div className="card shadow">
        <div className="card-body row">
            
        </div>
    </div>
</div> */}