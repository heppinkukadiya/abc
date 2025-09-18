import { useLocation } from "react-router-dom";

export default function ProductDetail() {
    const location = useLocation();
    const { product } = location.state || {};

    if (!product) return <div>No product data found.</div>;

    console.log(product);

    return (
        <div>
            <h1>{product.Name}</h1>
        </div>
    );
}
