import { Routes, Route} from "react-router-dom"
import SignIn from "../features/pages/public/SignIn"
import SignUp from "../features/pages/public/SignUp"
import Log from "../features/pages/admin/Log"


function PersoRoutes() {
    return (
        <Routes>
            <Route path="/public/sign-in" element={<SignIn />}></Route>
            <Route path="/public/sign-up" element={<SignUp />}></Route>
            <Route path="/admin/log" element={<Log />}></Route>
            {/* <Route path="/admin/sign" element={<Sign />}></Route> */}
            {/* <Route path="*" element={<NotFound />}></Route> */}
        </Routes>
    )
};

export default PersoRoutes