export default function AuroraBackground({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 aurora-bg ${className}`}
      aria-hidden="true"
    />
  );
}
