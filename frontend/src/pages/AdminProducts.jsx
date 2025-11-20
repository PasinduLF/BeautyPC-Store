import { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categoryService';

const emptyProduct = {
  name: '',
  description: '',
  subcategory: '',
  usage_notes: '',
  price: '',
  stock_quantity: '',
  category_id: '',
  is_featured: false,
  is_new: false,
  is_best_seller: false,
  image_url: '',
  gallery_images: '',
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '' });
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryStatus, setCategoryStatus] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const [productsRes, categoriesRes] = await Promise.all([fetchProducts(), fetchCategories()]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    };
    loadData();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
    setCategoryForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetCategoryForm = () => {
    setCategoryForm({ name: '', description: '' });
    setEditingCategoryId(null);
  };

  const resetForm = () => {
    setForm(emptyProduct);
    setEditingId(null);
  };

  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingCategoryId) {
        await updateCategory(editingCategoryId, categoryForm);
        setCategoryStatus('Category updated.');
      } else {
        await createCategory(categoryForm);
        setCategoryStatus('Category created.');
      }
      const refreshedCategories = await fetchCategories();
      setCategories(refreshedCategories.data);
      resetCategoryForm();
    } catch (error) {
      setCategoryStatus(error.response?.data?.message || 'Failed to save category');
    }
  };

  const handleCategoryDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    await deleteCategory(id);
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  const formatGalleryInput = (gallery) =>
    Array.isArray(gallery) ? gallery.join('\n') : gallery || '';

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      subcategory: product.subcategory || '',
      usage_notes: product.usage_notes || '',
      price: product.price,
      stock_quantity: product.stock_quantity,
      category_id: product.category_id,
      is_featured: Boolean(product.is_featured),
      is_new: Boolean(product.is_new),
      is_best_seller: Boolean(product.is_best_seller),
      image_url: product.image_url || '',
      gallery_images: formatGalleryInput(product.gallery_images),
    });
    setEditingId(product.id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock_quantity: Number(form.stock_quantity),
        category_id: Number(form.category_id),
        gallery_images: form.gallery_images
          ? form.gallery_images
              .split('\n')
              .map((url) => url.trim())
              .filter(Boolean)
          : [],
      };
      if (editingId) {
        await updateProduct(editingId, payload);
        setStatus('Product updated.');
      } else {
        await createProduct(payload);
        setStatus('Product created.');
      }
      const refreshed = await fetchProducts();
      setProducts(refreshed.data);
      resetForm();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await deleteProduct(id);
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-slate-900">
              {editingId ? 'Edit product' : 'Add new product'}
            </p>
            {editingId && (
              <button type="button" className="text-sm text-slate-500 underline" onClick={resetForm}>
                Cancel edit
              </button>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="rounded-2xl border border-slate-200 px-4 py-2"
            />
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="rounded-2xl border border-slate-200 px-4 py-2"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="rounded-2xl border border-slate-200 px-4 py-2"
            />
            <input
              name="stock_quantity"
              type="number"
              placeholder="Stock"
              value={form.stock_quantity}
              onChange={handleChange}
              className="rounded-2xl border border-slate-200 px-4 py-2"
            />
            <input
              name="subcategory"
              placeholder="Subcategory (e.g. Lipstick)"
              value={form.subcategory}
              onChange={handleChange}
              className="rounded-2xl border border-slate-200 px-4 py-2"
            />
            <input
              name="usage_notes"
              placeholder="Usage notes"
              value={form.usage_notes}
              onChange={handleChange}
              className="rounded-2xl border border-slate-200 px-4 py-2"
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-2"
          />
          <input
            name="image_url"
            placeholder="Image URL"
            value={form.image_url}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-2"
          />
          <textarea
            name="gallery_images"
            placeholder="Gallery image URLs (one per line)"
            rows="2"
            value={form.gallery_images}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-2"
          />
          <div className="flex flex-wrap gap-6 text-sm text-slate-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} />
              Featured
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="is_new" checked={form.is_new} onChange={handleChange} />
              New arrival
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_best_seller"
                checked={form.is_best_seller}
                onChange={handleChange}
              />
              Best seller
            </label>
          </div>
          {status && <p className="text-sm text-brand-dark">{status}</p>}
          <button type="submit" className="rounded-full bg-slate-900 px-6 py-3 text-white">
            {editingId ? 'Update product' : 'Add product'}
          </button>
        </form>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <p className="text-lg font-semibold text-slate-900">Products</p>
          <div className="mt-4 overflow-x-auto text-sm">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Sub-type</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Stock</th>
                  <th className="px-4 py-2 text-left">Tags</th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-2 font-semibold text-slate-900">{product.name}</td>
                    <td className="px-4 py-2 text-slate-600">{product.category_name}</td>
                    <td className="px-4 py-2 text-slate-600">{product.subcategory || '—'}</td>
                    <td className="px-4 py-2 text-slate-600">LKR {product.price}</td>
                    <td className="px-4 py-2 text-slate-600">{product.stock_quantity}</td>
                    <td className="px-4 py-2 text-slate-600">
                      <div className="flex flex-wrap gap-2">
                        {product.is_featured && (
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">Featured</span>
                        )}
                        {product.is_new && (
                          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                            New
                          </span>
                        )}
                        {product.is_best_seller && (
                          <span className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700">
                            Best
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="text-xs text-brand-dark" onClick={() => handleEdit(product)}>
                          Edit
                        </button>
                        <button className="text-xs text-rose-500" onClick={() => handleDelete(product.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-slate-900">Categories</p>
            {editingCategoryId && (
              <button className="text-xs text-slate-500 underline" onClick={resetCategoryForm}>
                Cancel edit
              </button>
            )}
          </div>
          <form onSubmit={handleCategorySubmit} className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              name="name"
              value={categoryForm.name}
              onChange={handleCategoryChange}
              placeholder="Category name"
              className="rounded-2xl border border-slate-200 px-4 py-2"
            />
            <input
              name="description"
              value={categoryForm.description}
              onChange={handleCategoryChange}
              placeholder="Description"
              className="rounded-2xl border border-slate-200 px-4 py-2"
            />
            {categoryStatus && <p className="text-sm text-brand-dark">{categoryStatus}</p>}
            <button type="submit" className="rounded-full bg-slate-900 px-4 py-2 text-white">
              {editingCategoryId ? 'Update category' : 'Add category'}
            </button>
          </form>
          <div className="mt-4 divide-y divide-slate-100">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-semibold text-slate-900">{category.name}</p>
                  <p className="text-slate-500">{category.description}</p>
                </div>
                <div className="flex gap-2 text-xs">
                  <button className="text-brand-dark" onClick={() => {
                    setCategoryForm({ name: category.name, description: category.description || '' });
                    setEditingCategoryId(category.id);
                  }}>
                    Edit
                  </button>
                  <button className="text-rose-500" onClick={() => handleCategoryDelete(category.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;

