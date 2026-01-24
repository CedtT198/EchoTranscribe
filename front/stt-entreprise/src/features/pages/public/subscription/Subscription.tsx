import Pricing from "../../../../components/pricing/Pricing";
import QA from "../../../../components/QA";

export default function Subscription() {
    return (
        <div>
            <div className="text-center">
                <p className="h2 mb-0">Available subscriptions</p>
                <p className="text-muted mb-5">See below the offer that fits better for you</p>
            </div>
            <div className="text-center">
            </div>
            <Pricing></Pricing>

            {/* QAs */}
            <div className="text-center my-5">
                <p className="h2">Helpful answers</p>
            </div>
            <QA about="subscription" /> 
        </div>
    )
}