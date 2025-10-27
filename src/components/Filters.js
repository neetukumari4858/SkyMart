import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  setSort,
  applyFilters,
  clearFilters,
} from "../Redux/ProductsSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const { filters, sort } = useSelector((state) => state.products);

  const handleChange = (e) => {
    dispatch(setFilters({ [e.target.name]: e.target.value }));
    dispatch(applyFilters());
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(applyFilters()); // (ensures filtered list resets immediately)
  };

  return (
    <div className="w-full md:w-64 bg-white p-4 rounded-xl shadow-md h-fit ">
      <div className="flex justify-between">
        <span className="text-xl font-bold text-blue-600">Filters</span>
        <button
          className="border rounded-lg px-2 py-1 mb-2"
          onClick={handleClearFilters}
        >
          Clear
        </button>
      </div>
      <label className="block text-sm font-semibold mt-2">Status</label>
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="w-full border rounded-lg px-2 py-1 mb-2"
      >
        <option value="">All</option>
        <option>Available</option>
        <option>Out of Stock</option>
        <option>Coming Soon</option>
      </select>
      <label className="block text-sm font-semibold mt-2">Category</label>
      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="w-full border rounded-lg px-2 py-1 mb-2"
      >
        <option value="">All</option>
        <option>Clothing</option>
        <option>Electronics</option>
        <option>Furniture</option>
      </select>
      <label className="block text-sm font-semibold mt-2">Brand</label>
      <input
        name="brand"
        value={filters.brand}
        onChange={handleChange}
        placeholder="Enter brand..."
        className="w-full border rounded-lg px-2 py-1 mb-2"
      />
      <label className="block text-sm font-semibold mt-2">Price Range</label>
      <div className="flex gap-2">
        <input
          name="minPrice"
          type="number"
          placeholder="Min"
          value={filters.minPrice}
          onChange={handleChange}
          className="w-1/2 border rounded-lg px-2 py-1"
        />
        <input
          name="maxPrice"
          type="number"
          placeholder="Max"
          value={filters.maxPrice}
          onChange={handleChange}
          className="w-1/2 border rounded-lg px-2 py-1"
        />
      </div>
      <label className="block text-sm font-semibold mt-4">Sort by Rating</label>
      <select
        value={sort}
        onChange={(e) => {
          dispatch(setSort(e.target.value));
          dispatch(applyFilters());
        }}
        className="w-full border rounded-lg px-2 py-1"
      >
        <option value="">None</option>
        <option value="high-to-low">High → Low</option>
        <option value="low-to-high">Low → High</option>
      </select>
    </div>
  );
};

export default Filters;
