import { Link } from 'react-router-dom';
import { CORE_CATEGORIES } from '../constants/catalog';

const CategoryList = () => (
  <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
    {CORE_CATEGORIES.map((category) => (
      <Link
        key={category.slug}
        to={`/category/${category.slug}`}
        className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
      >
        <p className="text-sm uppercase tracking-widest text-brand">{category.name}</p>
        <p className="mt-2 text-lg font-semibold text-slate-900">{category.description}</p>
        <p className="mt-1 text-sm text-slate-500">{category.highlight || 'Shop now →'}</p>
      </Link>
    ))}
  </div>
);

export default CategoryList;

