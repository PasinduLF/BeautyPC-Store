import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import useCart from '../hooks/useCart';

const CartPage = () => {
  const { items } = useCart();

  if (!items.length) {
    return (
      <div className="text-center">
        <p className="text-lg font-semibold text-slate-700">Your cart is empty.</p>
        <Link to="/" className="mt-4 inline-block rounded-full bg-brand px-6 py-3 text-white">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="space-y-4">
        <OrderSummary />
        <Link
          to="/checkout"
          className="block rounded-full bg-slate-900 px-4 py-3 text-center font-semibold text-white hover:bg-brand-dark"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;

