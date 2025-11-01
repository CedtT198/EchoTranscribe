import './assets/css/Sign.css'

function Sign() {
    return (
        <div id="container" className="container">
            <div className="row">
                {/* SIGN IN */}
                <div className="col align-items-center flex-col sign-in">
                    <div className="form-wrapper align-items-center">
                        <div className="form sign-in">
                            <div className="input-group">
                                <i className='bx bxs-user'></i>
                                <input type="mail" placeholder="Your mail"/>
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input type="password" placeholder="Password"/>
                            </div>
                            <button>Sign in</button>
                        </div>
                    </div>
                    <div className="form-wrapper"></div>
                </div>
                {/* END SIGN IN */}
            </div>
            <div className="row content-row">
                {/* SIGN IN CONTENT */}
                <div className="col align-items-center flex-col">
                    <div className="text sign-in">
                        <h2>
                            Log
                        </h2>
                    </div>
                    <div className="img sign-in"></div>
                </div>
                {/* END SIGN IN CONTENT */}
            </div>
        </div>
    )
};

export default Sign