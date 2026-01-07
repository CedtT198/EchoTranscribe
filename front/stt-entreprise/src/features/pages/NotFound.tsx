import notFound from '../../../public/images/404.png'

function NotFound() {
    return (
        <div className="wrapper vh-100">
            <div className="align-items-center h-100 d-flex w-50 mx-auto">
                <div className="mx-auto text-center row">
                    <div className='col-12'>
                        <p className="h1 display-1 m-0 font-weight-bolder">404</p>
                        <p className="h1 font-weight-bold">OOPS!</p>
                        <p className='h6'>The page could not be found.</p>
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