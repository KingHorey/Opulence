function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const numbers: (number | string)[] = [];

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
    <div>
      {numbers.map((item) => {
        return (
          <a href={item.toString()} key={item}>
            item
          </a>
        );
      })}
    </div>
  );
}

export default Pagination;
