import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 px-10 py-20 text-white shadow-2xl md:px-16 md:py-24">
    {/* Animated Background Elements */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-500/30 to-transparent blur-3xl" />
      <div className="absolute right-1/3 top-1/2 h-64 w-64 rounded-full bg-gradient-to-bl from-yellow-200/20 to-transparent blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Decorative Shapes */}
      <div className="absolute right-12 top-12 h-20 w-20 rounded-full border-2 border-white/20 animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-24 right-32 h-16 w-16 rotate-45 border-2 border-white/20 animate-spin" style={{ animationDuration: '8s' }} />
      <div className="absolute left-1/4 top-20 h-12 w-12 rounded-lg border-2 border-white/20 animate-pulse" />
    </div>

    {/* Content */}
    <div className="relative z-10 max-w-2xl space-y-8">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" style={{ animationDelay: '0.2s' }} />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" style={{ animationDelay: '0.4s' }} />
        </div>
        <span className="text-xs font-bold uppercase tracking-[0.3rem] text-white">
          New arrivals
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
        <span className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-700">
          Makeup, skincare &amp;
        </span>
        <br />
        <span className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '0.1s' }}>
          fragrances curated for
        </span>
        <br />
        <span className="inline-block bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '0.2s' }}>
          Sri Lankan beauty lovers.
        </span>
      </h1>

      {/* Description */}
      <p className="text-lg leading-relaxed text-white/95 md:text-xl animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '0.3s' }}>
        Discover soft-glam makeup, hydrating routines, bestselling perfumes, and pro beauty tools
        with <span className="font-semibold text-white">Cash on Delivery</span> island-wide.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '0.4s' }}>
        <Link
          to="/category/makeup"
          className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-base font-bold text-pink-600 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <span className="relative z-10 flex items-center gap-2">
            Shop Makeup
            <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 -z-0 bg-gradient-to-r from-pink-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>

        <Link
          to="/category/fragrances"
          className="group relative overflow-hidden rounded-full border-2 border-white/80 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/20"
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Fragrance Sale
          </span>
          <div className="absolute inset-0 -z-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
        </Link>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center gap-6 pt-4 text-sm font-medium text-white/90 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '0.5s' }}>
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Free Island-wide Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Cash on Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Authentic Products</span>
        </div>
      </div>
    </div>

    {/* Decorative Product Images (Optional - shown on larger screens) */}
    <div className="pointer-events-none absolute bottom-8 right-8 hidden lg:block">
      <div className="relative">
        {/* Placeholder for product image */}
        <div className="h-48 w-48 rounded-full bg-white/10 backdrop-blur-lg animate-float" />
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 backdrop-blur-lg animate-float" style={{ animationDelay: '0.5s', animationDuration: '4s' }} />
      </div>
    </div>

    {/* Custom CSS for animations */}
    <style jsx>{`
      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
    `}</style>
  </section>
);

export default Hero;