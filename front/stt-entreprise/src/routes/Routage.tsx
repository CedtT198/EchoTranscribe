import { Routes, Route, Navigate} from "react-router-dom"
import Log from "../features/pages/admin/Log"
import NotFound from "../features/pages/NotFound"
import Landing from "../features/pages/public/Landing"
import PublicLayout from "../features/pages/layouts/PublicLayout"
import Transcribe from "../features/pages/public/Transcribe"
import Resume from "../features/pages/public/Resume"
import Subscription from "../features/pages/public/Subscription"
import Profile from "../features/pages/public/Profile"
import Settings from "../features/pages/public/Settings"
import History from "../features/pages/public/History"
import Export from "../features/pages/public/Export"
import Live from "../features/pages/public/Live"
import ListReview from "../features/pages/public/ListReview"
import AddReview from "../features/pages/public/AddReview"
// import { CallbackPage } from "../CallbackPage"
import { useAuth0 } from "@auth0/auth0-react"
import Loading from "../components/Loading"


function PersoRoutes() {
    const { isLoading } = useAuth0();

    if (isLoading) return (
        <Loading></Loading>
    );
    return (
        <Routes>
            {/* <Route path="/callback" element={<CallbackPage />} /> */}

            <Route path="*" element={<NotFound />}></Route>
            <Route path="/admin/log" element={<Log />}></Route>
            
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
                <Route path="listReview" element={<ListReview />} />
                <Route path="addReview" element={<AddReview />} />
            </Route>
        </Routes>
    )
};

export default PersoRoutes