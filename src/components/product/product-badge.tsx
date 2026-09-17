type ProductBadgeProps = {
  label?: string;
};

export function ProductBadge({ label }: ProductBadgeProps) {
  if (!label) return null;

  return (
    <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium">
      {label}
    </span>
  );
}
