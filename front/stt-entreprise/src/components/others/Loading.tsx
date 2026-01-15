function Loading() {
    return(
        <div className="wrapper">
            <main role="main" className="">
                <div className='container d-flex justify-content-center align-items-center vh-100'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading ...</span>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Loading;