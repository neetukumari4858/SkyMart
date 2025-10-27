import { createSlice } from "@reduxjs/toolkit";
import productsData from "../products.json";

const initialState = {
  products: productsData,
  filteredProducts: productsData,
  search: "",
  filters: {
    status: "",
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
  },
  sort: "",
  currentPage: 1,
  itemsPerPage: 20,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    applyFilters(state) {
      let result = [...state.products];
      const { search, filters, sort } = state;

      // Search
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );

      // Filters
      if (filters.status)
        result = result.filter((p) => p.status === filters.status);
      if (filters.category)
        result = result.filter((p) => p.category === filters.category);
      if (filters.brand)
        result = result.filter((p) =>
          p.brand.toLowerCase().includes(filters.brand.toLowerCase())
        );
      if (filters.minPrice)
        result = result.filter((p) => p.price >= Number(filters.minPrice));
      if (filters.maxPrice)
        result = result.filter((p) => p.price <= Number(filters.maxPrice));

      // Sort
      if (sort === "high-to-low") result.sort((a, b) => b.price - a.price);
      if (sort === "low-to-high") result.sort((a, b) => a.price - b.price);

      state.filteredProducts = result;
    },
    clearFilters(state) {
      state.filters = {
        status: "",
        category: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
      };
      state.search = "";
      state.sort = "";
      state.filteredProducts = state.products; // reset to all
    },
  },
});

export const {
  setSearch,
  setFilters,
  setSort,
  setCurrentPage,
  addProduct,
  applyFilters,
  clearFilters,
} = productsSlice.actions;
export default productsSlice.reducer;
