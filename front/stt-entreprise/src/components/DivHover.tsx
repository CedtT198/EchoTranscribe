import { useState } from "react";

const Divhover: React.FC = () => {
    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <>
            <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
        </>
    )
}