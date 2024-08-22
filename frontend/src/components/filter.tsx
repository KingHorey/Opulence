// import axios from "axios";
import { useState, useEffect } from "react";
import { filterCategories } from "../types";
import { fetchCategories } from "../misc/externalCalls";
import { axiosConfig } from "../misc/axiosConfig";

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

  const handleFiltering = async (type: string) => {
    try {
      let response = await axiosConfig.get(
        `${import.meta.env.VITE_URL}${import.meta.env.VITE_GET_CATEGORIES_ENDPOINT}`,
        {
          params: {
            type: type,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (err: any) {
      return null;
    }
  };
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
          <form action="" className="flex flex-col gap-3">
            {categories?.map((item) => {
              return (
                <label>
                  <input
                    type="radio"
                    key={item._id}
                    className="cursor-pointer w-fit mx-auto"
                    onClick={() => handleFiltering(item.type)}
                  ></input>
                  {item.type}
                </label>
              );
            })}
          </form>
        </div>
      ) : (
        <div className="duration-400 transition-all"></div>
      )}
      <div></div>
    </div>
  );
}
