import '../../../assets/css/sign.css'

function SignUp() {
    return (
        <div id="container" className="container">
            <nav>
                <a href="#"><img src="logo.svg" alt="logo"/></a>
            </nav>
            <div className="form-wrapper">
                <h2>Sign Up</h2>
                <form action="#">
                    <div className="form-control">
                        <input type="text" required/>
                        <label>Name</label>
                    </div>
                    <div className="form-control">
                        <input type="text" required/>
                        <label>First name</label>
                    </div>
                    <div className="form-control">
                        <input type="text" required/>
                        <label>Email</label>
                    </div>
                    <div className="form-control">
                        <small>Birthday</small>
                        <input type="date" required/>
                    </div><br />
                    <div className="form-control">
                        <input type="password" required/>
                        <label>Password</label>
                    </div>
                    <div className="form-control">
                        <input type="password" required/>
                        <label>Confirm Password</label>
                    </div>
                    <button type="submit">Sign up</button>
                </form>
                <p>Already have an account? <a href="/public/sign-in">Sign in</a></p>
                <small>
                    This page is protected by Google reCAPTCHA
                    to ensure you're not a bot.
                </small>
            </div>
        </div>
    )
};

export default SignUp