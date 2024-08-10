export function InfoDiv({
  count,
  text,
  color,
}: {
  count: number;
  text: string;
  color?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${color || "bg-deepBlue"} text-slate-50 p-2 rounded-sm`}
    >
      <h3 className="text-4xl font-bold raleway">{count}</h3>
      <p className="text-base">{text}</p>
    </div>
  );
}
