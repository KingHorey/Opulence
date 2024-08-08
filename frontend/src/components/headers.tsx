export function ProfileSubCategories({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-10 flex flex-col gap-5">{children}</div>;
}

export function ProfileSubHeadersCategory({ text }: { text: string }) {
  return <p className="font-bold text-lg w-fit">{text}</p>;
}

export function FormContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-5">{children}</div>;
}

export function H2Tags({ text }: { text: string }) {
  return (
    <h2
      className="text-center  lg:text-5xl font-semibold raleway xxs:text-2xl tracking-wider"
      onScroll={() => {
        "scroll-behavior: smooth, transition: all 0.5s ease-in-out, left: 0";
      }}
    >
      {text}
    </h2>
  );
}
