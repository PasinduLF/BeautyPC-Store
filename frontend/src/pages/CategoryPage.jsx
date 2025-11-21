import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import SectionTitle from '../components/SectionTitle';
import { fetchProducts } from '../services/productService';
import { fetchCategories } from '../services/categoryService';
import { fetchSubcategories } from '../services/subcategoryService';
import { getCategoryMeta } from '../constants/catalog';

const slugify = (value = '') =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-');

const CategoryPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', subcategory: '' });
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryLabel, setCategoryLabel] = useState('');
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);

  useEffect(() => {
    const querySub = searchParams.get('sub') || '';
    setFilters((prev) => {
      if (prev.subcategory === querySub) return prev;
      return { ...prev, subcategory: querySub };
    });
  }, [searchParams]);

  useEffect(() => {
    const initialSub = searchParams.get('sub') || '';
    setFilters({ minPrice: '', maxPrice: '', subcategory: initialSub });
  }, [slug]);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const response = await fetchCategories();
        const match = response.data.find((cat) => slugify(cat.name) === slug);
        if (match) {
          setCategoryId(match.id);
          setCategoryLabel(match.name);
        } else {
          setCategoryId(null);
          setCategoryLabel(slug);
        }
      } catch (error) {
        console.error('Failed to load categories', error);
      }
    };
    loadCategory();
  }, [slug]);

  useEffect(() => {
    const loadSubcategories = async () => {
      if (!categoryId) {
        setSubcategoryOptions([]);
        return;
      }
      try {
        const response = await fetchSubcategories({ category_id: categoryId });
        setSubcategoryOptions(response.data);
      } catch (error) {
        console.error('Failed to load subcategories', error);
      }
    };
    loadSubcategories();
  }, [categoryId]);

  useEffect(() => {
    const loadProducts = async () => {
      if (!categoryId) return;
      setLoading(true);
      try {
        const params = { category: categoryId };
        if (filters.minPrice) params.minPrice = filters.minPrice;
        if (filters.maxPrice) params.maxPrice = filters.maxPrice;
        if (filters.subcategory) {
          if (!Number.isNaN(Number(filters.subcategory))) {
            params.subcategoryId = filters.subcategory;
          } else {
            params.subcategory = filters.subcategory;
          }
        }
        const response = await fetchProducts(params);
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to load category products', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [categoryId, filters.minPrice, filters.maxPrice, filters.subcategory]);

  const categoryMeta = useMemo(() => getCategoryMeta(slug), [slug]);

  const handleSubcategoryChange = (value) => {
    setFilters((prev) => ({ ...prev, subcategory: value }));
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('sub', value);
    } else {
      params.delete('sub');
    }
    setSearchParams(params, { replace: true });
  };

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Category"
        title={categoryLabel || 'Products'}
        description={categoryMeta?.highlight}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-700">Filter by price (LKR)</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <input
              type="number"
              placeholder="Min"
              className="w-32 rounded-full border border-slate-200 px-4 py-2 text-sm"
              value={filters.minPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-32 rounded-full border border-slate-200 px-4 py-2 text-sm"
              value={filters.maxPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
            />
            <button
              type="button"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm"
              onClick={() => setFilters((prev) => ({ ...prev, minPrice: '', maxPrice: '' }))}
            >
              Reset
            </button>
          </div>
        </div>
        {subcategoryOptions.length > 0 && (
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-700">Filter by sub-type</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className={`rounded-full border px-4 py-2 text-sm ${
                  !filters.subcategory
                    ? 'border-brand bg-brand/10 text-brand-dark'
                    : 'border-slate-200 text-slate-600'
                }`}
                onClick={() => handleSubcategoryChange('')}
              >
                All
              </button>
              {subcategoryOptions.map((option) => {
                const optionValue = String(option.id);
                const isActive =
                  filters.subcategory === optionValue || filters.subcategory === option.name;
                return (
                <button
                    key={option.id}
                    type="button"
                    className={`rounded-full border px-4 py-2 text-sm ${
                      isActive
                        ? 'border-brand bg-brand/10 text-brand-dark'
                        : 'border-slate-200 text-slate-600'
                    }`}
                    onClick={() => handleSubcategoryChange(optionValue)}
                  >
                    {option.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {!categoryId ? (
        <p className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-slate-500">
          Category coming soon.
        </p>
      ) : loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default CategoryPage;

