import notFound from '../../../public/images/404.png'

function NotFound() {
    return (
        <div className="not_found other">
            <div className="container">
                <h1>404 Not Found</h1>
                <p>The page or ressource you are looking doesn't exist.</p>
                <img src={notFound} alt="Illustration d'un jeune homme inquiet de son écran avec un point d'interrogation  au-dessus de lui." />
            </div>
        </div>
    )
};

export default NotFound