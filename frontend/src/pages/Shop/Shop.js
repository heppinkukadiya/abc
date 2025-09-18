import FilterBar from "./FilterBar";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../../services/Api";
import Spinner from "../component/Spinner";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadProducts() {
            setLoading(true);
            try {
                const res = await axios.get(Api.FETCH_PRODUCTS);
                setProducts(res.data.products);
            } catch (e) {
                // handle error
            }
            setLoading(false);
        }

        loadProducts();
    }, []);

    return (
        <div>
            <FilterBar ProductList={setProducts} setLoading={setLoading} />
            {loading ? (
                <div className="flex justify-center mt-10">
                    <Spinner />
                </div>
            ) : (
                <ProductList Products={products} />
            )}
        </div>
    );
}
