export function InfoDiv({ count, text }: { count: number; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3>{count}</h3>
      <p>{text}</p>
    </div>
  );
}
