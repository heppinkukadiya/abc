import { useEffect, useState } from 'react';
import axios from 'axios';
import { Api } from "../../services/Api";
import { Link } from 'react-router-dom';

function Inventory() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            try {
                const res = await axios.get(Api.FETCH_PRODUCTS);
                setItems(res.data.products);
            } catch (err) {
                console.error('Failed to fetch inventory:', err);
            }
        }
        fetchItems();
    }, []);

    const headers = items.length > 0 ? Object.keys(items[0]) : [];

    async function handleDelete(productId) {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await axios.delete(`${Api.DELETE_PRODUCT}/${productId}`);
            setItems((prevItems) => prevItems.filter(item => item.Product_Id !== productId));
        } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Failed to delete product.');
        }
    }

    return (
        <div className="p-4 overflow-x-auto">
            <div className="top-0 bg-white z-10 flex justify-between items-center py-4 border-b border-gray-300 ">
                <h2 className="font-bold text-xl m-0">Inventory</h2>
                <Link
                    to="/admin/java/AddProduct"
                    className="px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition"
                >
                    Add Product
                </Link>
            </div>

            {items.length === 0 ? (
                <p className="mt-4 text-center text-gray-600">No items found.</p>
            ) : (
                <table className="border-collapse min-w-full mt-4">
                    <thead>
                    <tr>
                        <th className="sticky top-[56px] bg-gray-100 border border-gray-300 px-4 py-2 whitespace-nowrap z-5">
                            Actions
                        </th>
                        {headers.map((header) => (
                            <th
                                key={header}
                                className="sticky top-[56px] bg-gray-100 border border-gray-300 text-left px-4 py-2 whitespace-nowrap z-5"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={item.Product_Id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                                <button
                                    onClick={() => handleDelete(item.Product_Id)}
                                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </td>
                            {headers.map((header) => (
                                <td
                                    key={header}
                                    className="border border-gray-300 px-4 py-2 whitespace-nowrap"
                                >
                                    {item[header]?.toString()}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Inventory;
