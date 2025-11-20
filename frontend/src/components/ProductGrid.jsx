import ProductCard from './ProductCard';

const ProductGrid = ({ products = [], emptyText = 'No products to display' }) => {
  if (!products.length) {
    return <p className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-slate-500">{emptyText}</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;

