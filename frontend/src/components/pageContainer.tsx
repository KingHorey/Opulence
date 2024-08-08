import React from "react";

export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[85%] h-full mr-auto ml-auto overflow-y-hidden ">
      {children}
    </div>
  );
}
