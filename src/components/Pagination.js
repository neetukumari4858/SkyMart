import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../Redux/ProductsSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, filteredProducts, itemsPerPage } = useSelector(
    (state) => state.products
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="flex justify-center gap-3 mb-4">
      <button
        onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-gray-800 font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() =>
          dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)))
        }
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
