import { useSelector } from "react-redux";

import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import Header from "../components/Header";

function ProductListing() {
  const { filteredProducts, currentPage, itemsPerPage } = useSelector(
    (state) => state.products
  );
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filteredProducts.slice(start, start + itemsPerPage);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-1 ">
        <div className="flex flex-col md:flex-row gap-8 px-8 py-3">
          <Filters />
          <div className="flex flex-col item-start items-center justify-items-center">
            <div className="w-full flex justify-between items-center flex-wrap">
              <p className="text-lg font-semibold mb-4 text-gray-800">
                Total Products ({filteredProducts.length})
              </p>
              {paginated.length > 0 && <Pagination />}
            </div>
            {paginated.length > 0 ? (
              <div className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 justify-items-center">
                {paginated.map((product) => (
                  <ProductCard productId={product?.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-lg flex justify-center items-center">
                Product Not Found!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductListing;
