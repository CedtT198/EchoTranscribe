import notFound from '../../../public/images/404.png'

function NotFound() {
    return (
        <div className="not_found wrapper vh-100">
            <div className="align-items-center h-100 d-flex w-50 mx-auto">
                <div className="mx-auto text-center row">
                    <div className='col-12'>
                        <h1 className="display-1 m-0 font-weight-bolder">404</h1>
                        <h1 className="font-weight-bold">OOPS!</h1>
                        <h6>The page could not be found.</h6>
                    </div>
                    {/* <div className='col-12'>
                        <img className="w-60" src={notFound} alt="Illustration d'un jeune homme inquiet de son écran avec un point d'interrogation  au-dessus de lui." />
                    </div> */}
                </div>
            </div>
        </div>
    )
};

export default NotFound