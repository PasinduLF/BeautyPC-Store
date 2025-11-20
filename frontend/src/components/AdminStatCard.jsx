const AdminStatCard = ({ title, value, caption }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <p className="text-sm uppercase tracking-wider text-slate-500">{title}</p>
    <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
    {caption && <p className="text-xs text-slate-400">{caption}</p>}
  </div>
);

export default AdminStatCard;

