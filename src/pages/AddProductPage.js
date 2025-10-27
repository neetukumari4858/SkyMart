import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, applyFilters } from "../Redux/ProductsSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

// ✅ Validation Schema
const schema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z0-9\s]+$/, "Only letters and numbers allowed")
    .required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  color: Yup.string().trim().required("Color is required"),
  status: Yup.string().required("Status is required"),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .integer("Quantity must be an integer")
    .positive("Quantity must be positive")
    .required("Quantity is required"),
  category: Yup.string().required("Category is required"),
  brand: Yup.string().required("Brand is required"),
  sku: Yup.string().required("SKU is required"),
  image: Yup.string().nullable().required("Image is required"),
});

const AddProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.filteredProducts);
  const [imagePreview, setImagePreview] = useState("");
  const [isInStock, setIsInStock] = useState(false); // to Track checkbox state

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Check for unique SKU
  const isUniqueSKU = (sku) => !products.some((p) => p.sku === sku);

  // Handle image upload (local preview)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const image = URL.createObjectURL(file);
      setImagePreview(image);
      setValue("image", image); // store preview URL in form
    }
  };
  //  Handle checkbox toggle
  const handleInStockChange = (e) => {
    const checked = e.target.checked;
    setIsInStock(checked);

    // Auto-update status when checkbox changes
    if (checked) {
      setValue("status", "Available");
    } else {
      setValue("status", "Out of Stock");
    }
  };
  const onSubmit = (data) => {
    if (!isUniqueSKU(data.sku)) {
      alert("❌ SKU must be unique!");
      return;
    }

    //  Sanitize inputs to prevent XSS
    const sanitizedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        DOMPurify.sanitize(value),
      ])
    );

    const imageToSave =
      imagePreview ||
      sanitizedData.image ||
      "https://via.placeholder.com/200x200.png?text=New+Product";

    const newProduct = {
      id: Date.now().toString(),
      ...sanitizedData,
      inStock: isInStock,
      rating: 0,
      image: imageToSave,
    };
    dispatch(addProduct(newProduct));
    dispatch(applyFilters());
    alert("✅ Product added successfully!");
    reset();
    setImagePreview("");
    setIsInStock(false);
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            {...register("name")}
            placeholder="Product Name"
            className="border px-3 py-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          <input
            {...register("price")}
            type="number"
            placeholder="Price"
            className="border px-3 py-2 rounded"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("inStock")}
              onChange={handleInStockChange}
              checked={isInStock}
            />
            In Stock
          </label>
          {errors.inStock && (
            <p className="text-red-500">{errors.inStock.message}</p>
          )}
          <select
            {...register("category")}
            className="border px-3 py-2 rounded"
          >
            <option value="">Select Category</option>
            <option>Clothing</option>
            <option>Electronics</option>
            <option>Furniture</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
          <input
            {...register("brand")}
            placeholder="Brand Name"
            className="border px-3 py-2 rounded"
          />
          {errors.brand && (
            <p className="text-red-500 text-sm">{errors.brand.message}</p>
          )}
          {/* Dynamic Status Options */}
          <select {...register("status")} className="border px-3 py-2 rounded">
            {isInStock ? (
              <option>Available</option>
            ) : (
              <>
                {" "}
                <option value="">Select Status</option>
                <option>Out of Stock</option>
                <option>Coming Soon</option>
              </>
            )}
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
          <input
            {...register("quantity")}
            type="number"
            placeholder="Quantity"
            className="border px-3 py-2 rounded"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}

          <input
            {...register("color")}
            placeholder="Color"
            className="border px-3 py-2 rounded"
          />
          {errors.color && (
            <p className="text-red-500">{errors.color.message}</p>
          )}

          <input
            {...register("sku")}
            placeholder="SKU"
            className="border px-3 py-2 rounded"
          />
          {errors.sku && (
            <p className="text-red-500 text-sm">{errors.sku.message}</p>
          )}
          {/* ✅ Image Upload or URL */}
          <div className="flex flex-col gap-2 mt-2">
            <label className="font-medium">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border px-3 py-2 rounded"
            />

            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mt-2 border"
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded mt-3 hover:bg-blue-700 transition-all"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProductPage;
