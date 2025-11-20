import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useCurrency from '../hooks/useCurrency';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { formatCurrency } = useCurrency();

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
        {(product.is_new || product.is_best_seller) && (
          <div className="absolute left-3 top-3 flex gap-2 text-[10px] font-semibold uppercase tracking-wide text-white">
            {product.is_new && (
              <span className="rounded-full bg-emerald-500/90 px-3 py-1 shadow-sm">New</span>
            )}
            {product.is_best_seller && (
              <span className="rounded-full bg-amber-500/90 px-3 py-1 shadow-sm">Best</span>
            )}
          </div>
        )}
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Image coming soon
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <Link to={`/products/${product.id}`} className="font-semibold text-slate-900">
          {product.name}
        </Link>
        <p className="text-sm text-slate-500">
          {product.category_name}
          {product.subcategory ? ` · ${product.subcategory}` : ''}
        </p>
        <p className="mt-2 text-lg font-bold text-brand-dark">{formatCurrency(product.price)}</p>
        <p className={`text-xs ${product.stock_quantity > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
          {product.stock_quantity > 0 ? 'In stock' : 'Out of stock'}
        </p>
        <button
          className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-slate-400"
          onClick={() => addToCart(product)}
          disabled={product.stock_quantity <= 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

