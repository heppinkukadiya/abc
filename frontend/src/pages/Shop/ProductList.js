// ProductList.jsx
import { useNavigate } from "react-router-dom";

export default function ProductList({ Products }) {
    const navigate = useNavigate();

    if (!Products || Products.length === 0) {
        return <div>No products found.</div>;
    }

    const handleClick = (product) => {
        navigate(`/product`, { state: { product } });
    };

    return (
        <div className="px-4 sm:px-8 md:px-32">
            <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 p-4">
                {Products.map((product) => (
                    <div
                        key={product.Product_Id}
                        onClick={() => handleClick(product)}
                        className="cursor-pointer bg-gray-100 rounded-lg p-4 shadow-md flex flex-col items-center text-center relative aspect-square hover:shadow-lg transition-shadow"
                    >
                        {product.Discount != null && (
                            <span className="absolute top-2 right-2 bg-gray-800 text-blue-50 text-sm px-2 py-1 rounded">
                Saving {product.Discount}%
              </span>
                        )}
                        <img
                            src={product.Image}
                            alt={product.Name}
                            className="w-40 h-40 mb-2"
                        />
                        <h3 className="text-md font-semibold mb-1">
                            {product.Carat} Carat {product.Shape} Cut {product.Product_Type} Diamond
                        </h3>
                        <p className="text-gray-500">
                            {product.Color} Color | {product.Clarity} Clarity
                        </p>

                        <div className="text-xl font-bold mt-2 text-black">
                            ${product.Final_Price}
                            {product.Discount != null && (
                                <span className="text-gray-400 text-base line-through ml-2">
                  ${product.Price}
                </span>
                            )}
                        </div>

                        <div className="flex gap-2 mt-4">
              <span className="bg-[#777777] text-white px-3 py-1 text-sm rounded">
                GIA Authenticated
              </span>
                            <span className="bg-[#777777] text-white px-3 py-1 text-sm rounded">
                Express Shipping
              </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
