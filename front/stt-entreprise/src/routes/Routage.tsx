import { Routes, Route, Navigate} from "react-router-dom"
import SignIn from "./SignIn"
import SignUp from "../features/pages/public/SignUp"
import Log from "../features/pages/admin/Log"
import NotFound from "../features/pages/NotFound"
import Landing from "../features/pages/public/Landing"
import OTP from "../features/pages/public/OTP"
import PublicLayout from "../features/pages/layouts/PublicLayout"
import Transcribe from "../features/pages/public/Transcribe"
import Resume from "../features/pages/public/Resume"
import Subscription from "../features/pages/public/Subscription"
import Profile from "../features/pages/public/Profile"
import Settings from "../features/pages/public/Settings"
import History from "../features/pages/public/History"
import Export from "../features/pages/public/Export"
import Live from "../features/pages/public/Live"
// import SignLayout from "../features/pages/layouts/SignLayout"


function PersoRoutes() {
    return (
        <Routes>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/admin/log" element={<Log />}></Route>
            <Route path="/public/sign-in" element={<SignIn />}></Route>
            <Route path="/public/sign-up" element={<SignUp />}></Route>
            <Route path="/public/otp" element={<OTP />}></Route>
            
            <Route path="/" element={<Navigate to="/public/layout/" replace />} />
            <Route path="/public/layout/" element={<PublicLayout />}>
                <Route index element={<Landing />} />
                <Route path="transcribe" element={<Transcribe />} />
                <Route path="resume" element={<Resume />} />
                <Route path="subscription" element={<Subscription />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="history" element={<History />} />
                <Route path="export" element={<Export />} />
                <Route path="live" element={<Live />} />
            </Route>
        </Routes>
    )
};

export default PersoRoutes