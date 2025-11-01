import { Routes, Route} from "react-router-dom"
import PublicSign from "../features/pages/PublicSign"
import Sign from "../features/pages/Sign"


function Routes() {
    return (
        <Routes>
            <Route path="/public/Sign" element={<PublicSign />}></Route>
            <Route path="/Sign" element={<Sign />}></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    )
};

export default Routes