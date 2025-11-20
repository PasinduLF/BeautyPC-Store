import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import CategoryList from '../components/CategoryList';
import ProductGrid from '../components/ProductGrid';
import SectionTitle from '../components/SectionTitle';
import { fetchProducts } from '../services/productService';

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const [newResp, bestResp] = await Promise.all([
          fetchProducts({ isNew: true }),
          fetchProducts({ isBestSeller: true }),
        ]);
        setNewArrivals(newResp.data.slice(0, 6));
        setBestSellers(bestResp.data.slice(0, 6));
      } catch (error) {
        console.error('Failed to load home products', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="space-y-16">
      <Hero />
      <section>
        <SectionTitle eyebrow="Browse" title="Shop by category" />
        <CategoryList />
      </section>
      <section>
        <SectionTitle eyebrow="Fresh" title="New arrivals" />
        {loading ? <p>Loading products...</p> : <ProductGrid products={newArrivals} />}
      </section>
      <section>
        <SectionTitle eyebrow="Favorites" title="Best sellers" />
        {loading ? <p>Loading products...</p> : <ProductGrid products={bestSellers} />}
      </section>
    </div>
  );
};

export default Home;

