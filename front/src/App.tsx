import { UserSessionProvider } from "./api/subscription";
import { useToast } from "./auth/ToastProvider"
import AuthBootstrap from "./AuthBootstrap"
import Toast from "./components/others/Toast"
import Routage from "./routes/Routage"

export default function App() {  
  const { success, error, info, clearToast } = useToast();
  
  return (
    <>
      <UserSessionProvider>
        <AuthBootstrap />
        <Routage />
      
        {success && (
          <Toast type="success" message={success} onClose={clearToast}/>
        )}

        {error && (
          <Toast type="error" message={error} onClose={clearToast}/>
        )}
        
        {info && (
          <Toast type="info" message={info} onClose={clearToast}/>
        )}
      </UserSessionProvider>
    </>
  )
};
