const Footer = () => {
  return (
    <footer className="mt-16 bg-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold">Beauty P&amp;C</p>
          <p>Colombo, Sri Lanka · +94 77 123 4567</p>
        </div>
        <div className="flex gap-4 text-slate-300">
          <p>Cash on Delivery island-wide</p>
          <p>Open 9am - 8pm</p>
        </div>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Beauty P&amp;C. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

