import { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import SectionTitle from '../components/SectionTitle';
import { fetchProducts } from '../services/productService';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetchProducts({ isBestSeller: true });
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to load best sellers', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <SectionTitle eyebrow="Popular" title="Best sellers" />
      {loading ? <p>Loading products...</p> : <ProductGrid products={products} emptyText="No featured products yet." />}
    </div>
  );
};

export default BestSellers;

