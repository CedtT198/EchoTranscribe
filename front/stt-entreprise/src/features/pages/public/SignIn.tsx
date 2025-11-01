import '../../../assets/css/Sign.css'

function Sign() {
    return (
        <div id="container" className="container">
            <nav>
                <a href="#"><img src="logo.svg" alt="logo"/></a>
            </nav>
            <div className="form-wrapper">
                <h2>Sign In</h2>
                <form action="#">
                    <div className="form-control">
                        <input type="text" required/>
                        <label>Email or phone number</label>
                    </div>
                    <div className="form-control">
                        <input type="password" required/>
                        <label>Password</label>
                    </div>
                    <button type="submit">Sign In</button>
                    <div className="form-help">
                        <a href="#">Forgot your password ?</a>
                    </div>
                </form>
                <p>New to EchoTranscribe? <a href="#">Sign up now</a></p>
                <small>
                This page is protected by Google reCAPTCHA
                to ensure you're not a bot.
                <a href="#">Learn more.</a>
                </small>
            </div>
        </div>
    )
};

export default Sign