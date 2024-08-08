import axios from "axios";
import { useEffect, useState } from "react";
import ResponsiveNavBar from "../components/responsiveNavBar";
import { PageContainer } from "../components/pageContainer";
import { H2Tags } from "../components/headers";
import { SideBar } from "../components/sideBar";

function NewArrivals() {
  const [newArrivals, setNewArrivals] = useState([]);
  // useEffect(() => {

  // })
  return (
    <PageContainer>
      <ResponsiveNavBar />
      <div className="">
        <H2Tags text="New Arrivals" />
      </div>
      <hr></hr>
      <SideBar>
        <div className="lg:w-full flex-col gap-5  bg-[#fefefe] border-r-black border-r h-screen">
          <form action="" className="flex flex-col gap-2 justify-start">
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
          </form>
        </div>
      </SideBar>
    </PageContainer>
  );
}

export default NewArrivals;
