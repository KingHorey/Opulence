// import axios from "axios";
import { useState, useEffect } from "react";
import { filterCategories } from "../types";
import { fetchCategories } from "../misc/externalCalls";

export function Filter() {
  const [categories, setCategories] = useState<null | filterCategories[]>([]);
  const [filterState, setFilterState] = useState(false);

  function handleFilter() {
    setFilterState(!filterState);
  }
  useEffect(() => {
    const data = async () => {
      fetchCategories()
        .then((response) => {
          setCategories(response);
        })
        .catch(() => {
          setCategories([]);
        });
    };
    data();
  }, []);
  return (
    <div className="">
      <button
        className={
          filterState
            ? "bg-black text-white border border-black px-2 rounded-full font-semibold transition-all duration-300 my-auto relative"
            : "bg-white text-black border border-black px-2 rounded-full font-semibold mb-5 my-auto relative"
        }
        onClick={handleFilter}
      >
        filter
        <img src="./svg/filter-lines.svg" className="inline-block w-3 h-3" />
      </button>
      {filterState ? (
        <div className="duration-400 transition-all absolute">
          <ul className="w-fit flex flex-col gap-4">
            {categories?.map((item) => {
              return (
                <li key={item._id} className="cursor-pointer w-fit mx-auto">
                  {item.type}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="duration-400 transition-all"></div>
      )}
      <div></div>
    </div>
  );
}
