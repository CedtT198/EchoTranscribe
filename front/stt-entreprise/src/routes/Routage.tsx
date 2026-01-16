import { Routes, Route, Navigate} from "react-router-dom"
import NotFound from "../features/pages/NotFound"
import Landing from "../features/pages/public/Landing"
import PublicLayout from "../features/pages/layouts/PublicLayout"
import Batch from "../features/pages/public/transcription/Batch"
import Profile from "../features/pages/public/user/Profile"
import Settings from "../features/pages/public/user/Settings"
import History from "../features/pages/public/transcription/History"
import Export from "../features/pages/public/transcription/Export"
import Live from "../features/pages/public/transcription/Live"
import ListReview from "../features/pages/public/review/ListReview"
// import { CallbackPage } from "../CallbackPage"
import { useAuth0 } from "@auth0/auth0-react"
import Loading from "../components/others/Loading"
import Subscription from "../features/pages/public/pricing/Subscription"
import AddReview from "../features/pages/public/review/AddReview"
import Summary from "../features/pages/public/transcription/Summary"
import { PaymentError } from "../features/pages/public/pricing/PaymentError"
import { PaymentSuccess } from "../features/pages/public/pricing/PaymentSuccess"


function PersoRoutes() {
    const { isLoading } = useAuth0();

    if (isLoading) return (
        <Loading />
    );
    return (
        <Routes>
            {/* <Route path="/callback" element={<CallbackPage />} /> */}

            <Route path="*" element={<NotFound />}></Route>
              {/* <Route path="/callback" element={<Callback />} /> */}
            
            <Route path="/" element={<Navigate to="/public/layout/" replace />} />
            <Route path="/public/layout/" element={<PublicLayout />}>
                <Route index element={<Landing />} />
                <Route path="batch" element={<Batch />} />
                <Route path="summary" element={<Summary />} />
                <Route path="subscription" element={<Subscription />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="history" element={<History />} />
                <Route path="export" element={<Export />} />
                <Route path="live" element={<Live />} />
                <Route path="listReview" element={<ListReview />} />
                <Route path="addReview" element={<AddReview />} />
                <Route path="payment/success" element={<PaymentSuccess />} />
                <Route path="payment/error" element={<PaymentError />} />
            </Route>
        </Routes>
    )
};

export default PersoRoutes