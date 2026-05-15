// import { useAuth0 } from "@auth0/auth0-react";
import { pay, type CheckoutDTO } from "../../api/payment";
import { useToast } from "../../auth/ToastProvider";

export function PaymentButton(dto: CheckoutDTO) {
  const {setInfo} = useToast();

  const handlePay = async () => {
    // console.log("ok payment button");
    setInfo("Payment in progress, please wait a seconds.");

    const res = await pay(dto);
    const data = res.data;
    window.location.href = data.url;
  };

  return (
    <button className="btn btn-primary w-100 rounded-pill" style={{ fontSize: 18 }} type="button" onClick={handlePay}>
      Upgrade
    </button>
  );
}