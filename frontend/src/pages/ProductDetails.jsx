import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useCurrency from '../hooks/useCurrency';
import { fetchProduct } from '../services/productService';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const { addToCart } = useCart();
  const { formatCurrency } = useCurrency();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetchProduct(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to load product', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      const gallery = product.gallery_images || [];
      setActiveImage(product.image_url || gallery[0] || '');
    }
  }, [product]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  const gallery = product.gallery_images || [];
  const stockStatus =
    product.stock_quantity === 0
      ? 'Out of stock'
      : product.stock_quantity < 5
        ? 'Low stock'
        : 'In stock';
  const stockTone =
    stockStatus === 'Out of stock'
      ? 'text-rose-500'
      : stockStatus === 'Low stock'
        ? 'text-amber-600'
        : 'text-emerald-600';

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          {activeImage ? (
            <img src={activeImage} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full min-h-[360px] items-center justify-center text-slate-400">
              Image unavailable
            </div>
          )}
        </div>
        {gallery.length > 0 && (
          <div className="mt-4 grid grid-cols-4 gap-3">
            {gallery.map((image) => (
              <button
                key={image}
                type="button"
                className={`overflow-hidden rounded-2xl border ${
                  activeImage === image ? 'border-brand' : 'border-transparent'
                }`}
                onClick={() => setActiveImage(image)}
              >
                <img src={image} alt="Gallery" className="h-20 w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-widest text-brand">
            {product.category_name}
            {product.subcategory ? ` • ${product.subcategory}` : ''}
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">{product.name}</h1>
          <p className="mt-2 text-lg text-slate-600">{product.description}</p>
        </div>
        <p className="text-3xl font-bold text-brand-dark">{formatCurrency(product.price)}</p>
        <p className={`text-sm font-semibold ${stockTone}`}>
          {stockStatus}
          {product.stock_quantity > 0 ? ` · ${product.stock_quantity} pieces left` : ''}
        </p>
        <div className="space-y-3 rounded-3xl border border-slate-100 bg-white p-6">
          <p className="text-sm font-semibold text-slate-700">Payment options</p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>Cash on Delivery island-wide</li>
            <li>Bank transfer or QR (contact us after ordering)</li>
          </ul>
        </div>
        {product.usage_notes && (
          <div className="space-y-2 rounded-3xl border border-amber-100 bg-amber-50/70 p-6 text-sm text-slate-700">
            <p className="text-xs uppercase tracking-[0.3rem] text-amber-600">Usage notes</p>
            <p>{product.usage_notes}</p>
          </div>
        )}
        <button
          className="w-full rounded-full bg-slate-900 px-6 py-3 text-lg font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-slate-400"
          onClick={() => addToCart(product)}
          disabled={product.stock_quantity <= 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

