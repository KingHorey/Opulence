import React from "react";

export function SideBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg: w-[25%] flex-col flex gap-5 p-1 h-[90%]">
      {children}
    </div>
  );
}

export function DisplaySideBarContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:w-full flex-col gap-5 border h-fit rounded-md shadow-md bg-[#FAFAFA] overflow-y-scroll">
      {children}
    </div>
  );
}
