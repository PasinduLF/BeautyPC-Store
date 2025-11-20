import { NavLink } from 'react-router-dom';

const links = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/orders', label: 'Orders' },
];

const AdminSidebar = () => (
  <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <p className="text-lg font-semibold text-slate-900">Admin Panel</p>
    <div className="mt-6 flex flex-col gap-3 text-sm font-medium text-slate-500">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `rounded-2xl px-4 py-3 transition ${
              isActive ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  </aside>
);

export default AdminSidebar;

