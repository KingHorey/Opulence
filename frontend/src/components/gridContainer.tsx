import React from "react";

export function GridContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="xxs:grid lg:grid lg:grid-cols-3 md:gap-y-5  lg:gap-x-5 lg:gap-y-10 h-full xxs:gap-y-5 xxs:gap-x-10  justify-center">
      {children}
    </div>
  );
}
