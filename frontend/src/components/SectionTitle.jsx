const SectionTitle = ({ eyebrow, title, description, action }) => (
  <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <div>
      {eyebrow && <p className="text-xs uppercase tracking-[0.3rem] text-brand">{eyebrow}</p>}
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
    </div>
    {action}
  </div>
);

export default SectionTitle;

