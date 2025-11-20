import useCurrency from '../hooks/useCurrency';

const statusColors = {
  New: 'bg-amber-100 text-amber-700',
  Processing: 'bg-sky-100 text-sky-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Completed: 'bg-emerald-100 text-emerald-700',
  Cancelled: 'bg-rose-100 text-rose-700',
};

const OrderTable = ({ orders = [], onStatusChange }) => {
  const { formatCurrency } = useCurrency();

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Order ID</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Customer</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">City</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Total</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-3 font-semibold text-slate-900">#{order.id}</td>
              <td className="px-4 py-3 text-slate-600">{order.customer_name}</td>
              <td className="px-4 py-3 text-slate-600">{order.city}</td>
              <td className="px-4 py-3 font-semibold text-slate-900">
                {formatCurrency(Number(order.subtotal) + Number(order.delivery_charge || 0))}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    statusColors[order.status] || 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <select
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs"
                  value={order.status}
                  onChange={(e) => onStatusChange(order.id, e.target.value)}
                >
                  {Object.keys(statusColors).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;

