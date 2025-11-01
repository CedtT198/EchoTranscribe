import '../../assets/css/notFound.css'
import notFound from '../../assets/img/404.png'

function NotFound() {
    return (
        <div className="container">
            <h1>404 Not Found</h1>
            <p>La page que vous recherchez n'existe pas.</p>
            <img src={notFound} alt="Illustration d'un jeune homme inquiet de son écran avec un point d'interrogation  au-dessus de lui." />
        </div>
    )
};

export default NotFound