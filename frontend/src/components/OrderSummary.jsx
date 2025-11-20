import useCart from '../hooks/useCart';
import useCurrency from '../hooks/useCurrency';

const OrderSummary = () => {
  const { subtotal, delivery, total } = useCart();
  const { formatCurrency } = useCurrency();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-slate-900">Order Summary</h3>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Delivery</span>
          <span>{formatCurrency(delivery)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-slate-900">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Cash on Delivery available island-wide. Bank transfer & QR accepted on request.
      </p>
    </div>
  );
};

export default OrderSummary;

