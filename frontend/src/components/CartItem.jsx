import useCart from '../hooks/useCart';
import useCurrency from '../hooks/useCurrency';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { formatCurrency } = useCurrency();

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="size-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
        {item.image_url ? (
          <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">No Image</div>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <p className="font-semibold text-slate-900">{item.name}</p>
        <p className="text-sm text-slate-500">{item.category_name}</p>
        <p className="text-sm font-semibold text-brand-dark">{formatCurrency(item.price)}</p>
        <div className="mt-3 flex items-center gap-3">
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            className="w-20 rounded-full border border-slate-300 px-3 py-1 text-center text-sm"
          />
          <button className="text-sm text-rose-500" onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

