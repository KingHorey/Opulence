import { Link, useLocation } from "react-router-dom";

function Pagination({
  currentPage,
  totalDocuments,
  limit = 9,
}: {
  currentPage: number;
  totalDocuments: number;
  limit?: number;
}) {
  const location = useLocation();
  const { pathname } = location;

  const numbers: (number | string)[] = [];
  const totalPages = Math.ceil(totalDocuments / limit);
  if (currentPage < 4 && totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      numbers.push(i);
    }
  } else if (totalPages >= 4) {
    numbers.push(1);
    numbers.push("...");
    numbers.push(currentPage);
    for (currentPage; currentPage <= totalPages; currentPage++) {
      if (currentPage - totalPages === 2) {
        numbers.push(currentPage);
      }
    }
  }
  return (
    <div className="mx-auto mb-5 mt-10 flex gap-2">
      {numbers.map((item) => {
        return (
          <Link
            to={`${pathname}?page=${item.toString()}`}
            key={item}
            className="border-gray-300 border px-2 mr-2 cursor-pointer"
            title="Page 2"
          >
            {item}
          </Link>
        );
      })}
    </div>
  );
}

export default Pagination;
