import { Routes, Route} from "react-router-dom"
import SignIn from "../features/pages/public/SignIn"
import SignUp from "../features/pages/public/SignUp"
import Log from "../features/pages/admin/Log"
import NotFound from "../features/pages/NotFound"
import Home from "../features/pages/public/Home"
import OTP from "../features/pages/public/OTP"


function PersoRoutes() {
    return (
        <Routes>
            <Route path="/public/sign-in" element={<SignIn />}></Route>
            <Route path="/public/sign-up" element={<SignUp />}></Route>
            <Route path="/admin/log" element={<Log />}></Route>
            <Route path="public/home" element={<Home />}></Route>
            <Route path="public/otp" element={<OTP />}></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    )
};

export default PersoRoutes