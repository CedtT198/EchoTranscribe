import { pay } from "../../api/payment";

type PaymentButtonProps = {
  plan: any;
};

export function PaymentButton({ plan }: PaymentButtonProps) {
  const handlePay = async () => {
    const res = await pay(plan);
    const data = res.data;
    window.location.href = data.url;
  };

  return (
    <button className="btn btn-primary w-100 rounded-pill" style={{ fontSize: 18 }} type="button" onClick={handlePay}>
        Upgrade
    </button>
  );
}