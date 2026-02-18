export default function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = { sm: "h-5 w-5", md: "h-8 w-8", lg: "h-12 w-12" };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${dims[size]} animate-spin rounded-full border-2 border-teal/15 border-t-teal/80`}
      />
    </div>
  );
}
