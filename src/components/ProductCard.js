const ProductCard = ({ product }) => {
  return (
    <div
      className=" max-w-xs w-64 bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
      key={product?.id}
    >
      <div className="flex flex-col items-center justify-items-center">
        <div className="py-3 ">
          <img
            src={product?.image}
            alt={product?.name}
            className="px-7 bg-gray-100 w-full h-56 object-contain"
          />
        </div>
        <div className=" flex flex-col justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {product?.name}
          </h3>
          <div>
            <span className="text-sm text-gray-500 mb-2">
              {product?.brand}{" "}
            </span>
            <span> {product?.category}</span>
            <p className="text-center">Color: {product?.color}</p>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-xl font-bold text-blue-600">
              ₹{product.price}/-
            </span>
            <span
              className={`text-sm px-2 py-1 rounded ${
                product.inStock
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product.status}
            </span>
          </div>
          <div className="mt-3 flex justify-center items-center mb-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
