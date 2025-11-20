import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAdminAuthHook from '../hooks/useAdminAuth';
import { CORE_CATEGORIES } from '../constants/catalog';

const Navbar = () => {
  const { items } = useCart();
  const { isAuthenticated, logout } = useAdminAuthHook();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [pinnedCategory, setPinnedCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setHoveredCategory(null);
    setPinnedCategory(null);
  }, [location.pathname, location.search]);

  const showMega = (slug) => setHoveredCategory(slug);
  const hideMega = () => {
    setHoveredCategory(null);
    setPinnedCategory(null);
  };

  const openCategory = hoveredCategory ?? pinnedCategory;

  return (
    <header 
      className={`sticky top-0 z-50 bg-white/98 backdrop-blur-lg transition-all duration-300 ${
        scrolled ? 'shadow-lg border-b border-slate-100' : 'shadow-sm'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-5">
        {/* Logo */}
        <Link 
          to="/" 
          className="group flex shrink-0 items-center gap-2.5 transition-transform hover:scale-105"
        >
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-pink-500/50 group-hover:rotate-6">
              <span className="text-xl font-bold text-white">B</span>
            </div>
            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-purple-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <span className="bg-gradient-to-r from-slate-900 via-purple-900 to-pink-900 bg-clip-text text-2xl font-bold text-transparent">
            Beauty P&C
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden flex-1 items-center justify-center gap-1 text-sm font-medium md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `group relative px-4 py-2.5 transition-all duration-200 ${
                isActive ? 'text-pink-600' : 'text-slate-600 hover:text-slate-900'
              }`
            }
          >
            <span className="relative z-10">Home</span>
            <span className={`absolute inset-0 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
              location.pathname === '/' ? 'opacity-100' : ''
            }`} />
          </NavLink>

          <div className="flex gap-1" onMouseLeave={hideMega}>
            {CORE_CATEGORIES.map((category) => (
              <div key={category.slug} className="relative">
                <button
                  type="button"
                  className={`group relative flex items-center gap-1.5 rounded-xl px-4 py-2.5 transition-all duration-200 ${
                    openCategory === category.slug
                      ? 'bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  onMouseEnter={() => showMega(category.slug)}
                  onFocus={() => showMega(category.slug)}
                  onClick={() => {
                    setPinnedCategory(category.slug);
                    setHoveredCategory(category.slug);
                  }}
                >
                  <span className="relative z-10">{category.name}</span>
                  <svg 
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                      openCategory === category.slug ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openCategory === category.slug && (
                  <div className="absolute left-1/2 top-full z-50 mt-2 hidden -translate-x-1/2 animate-in fade-in slide-in-from-top-2 duration-200 lg:block">
                    <div className="flex w-[560px] gap-6 rounded-3xl border border-slate-200/80 bg-white p-7 shadow-2xl ring-1 ring-black/5">
                      {/* Featured Section */}
                      <div className="group/card relative flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 p-7 text-white shadow-xl">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-pink-500/20 blur-3xl transition-transform duration-500 group-hover/card:scale-150" />
                        
                        <div className="relative z-10">
                          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                              {category.name}
                            </span>
                          </div>
                          
                          <p className="mt-4 text-xl font-bold leading-tight">
                            {category.highlight}
                          </p>
                          
                          <Link
                            to={`/category/${category.slug}`}
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold backdrop-blur-sm transition-all hover:bg-white/20 hover:gap-3"
                          >
                            <span>View all {category.name}</span>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>

                      {/* Subcategories */}
                      <div className="w-64">
                        <div className="mb-4 flex items-center gap-2">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Browse
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          {category.subcategories.map((sub, idx) => (
                            <Link
                              key={sub.value}
                              to={`/category/${category.slug}?sub=${encodeURIComponent(sub.value)}`}
                              className="group/sub relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-300 hover:shadow-md"
                              style={{ 
                                animationDelay: `${idx * 40}ms`,
                                animationFillMode: 'both'
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover/sub:opacity-100" />
                              <div className="relative z-10 flex items-center justify-between">
                                <span className="transition-colors group-hover/sub:text-pink-600">
                                  {sub.label}
                                </span>
                                <svg 
                                  className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover/sub:translate-x-0 group-hover/sub:opacity-100 group-hover/sub:text-pink-600" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <NavLink
            to="/best-sellers"
            className={({ isActive }) =>
              `group relative px-4 py-2.5 transition-all duration-200 ${
                isActive ? 'text-pink-600' : 'text-slate-600 hover:text-slate-900'
              }`
            }
          >
            <span className="relative z-10">Best Sellers</span>
            <span className={`absolute inset-0 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
              location.pathname === '/best-sellers' ? 'opacity-100' : ''
            }`} />
          </NavLink>
        </nav>

        {/* Right Side Actions */}
        <div className="flex shrink-0 items-center gap-3">
          <Link 
            to="/cart" 
            className="group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50"
          >
            <div className="relative">
              <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-[10px] font-bold text-white shadow-lg ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Cart</span>
          </Link>

          {isAuthenticated ? (
            <button
              className="group relative overflow-hidden rounded-xl border-2 border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-pink-300"
              onClick={logout}
            >
              <span className="relative z-10">Logout</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-pink-50 to-purple-50 transition-transform duration-300 group-hover:translate-x-0" />
            </button>
          ) : (
            <Link
              to="/admin/login"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-pink-500/50"
            >
              <span className="relative z-10">Admin</span>
              <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;