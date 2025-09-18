import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import Product from './Product';
import axios from "axios";
import { Api } from "../../services/Api";
import Spinner from '../component/Spinner';

function AddProduct() {
    const { fields, selectOptions } = Product;
    const navigate = useNavigate();

    const initialFormState = Object.fromEntries(
        Object.entries(fields).map(([field, config]) => [field, config.type === 'file' ? null : ''])
    );

    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);

    const entries = Object.entries(fields);
    const colSize = Math.ceil(entries.length / 3);
    const cols = [
        entries.slice(0, colSize),
        entries.slice(colSize, 2 * colSize),
        entries.slice(2 * colSize),
    ];

    const inputBaseClasses = "bg-white focus:outline-none focus:ring-0 px-2 py-1 rounded text-[#333333]";

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => {
            const updated = { ...prev, [name]: value };

            if (name === 'Price' || name === 'Discount') {
                const price = parseFloat(updated.Price) || 0;
                const discount = parseFloat(updated.Discount) || 0;
                updated.Final_Price = Math.round(price - (price * discount / 100));
            }

            return updated;
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files[0] || null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const data = new FormData();
        for (const key in formData) {
            if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        }

        try {
            const res = await axios.post(Api.ADD_PRODUCT, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if(res.status === 201) {
                alert('Product added successfully!');
            }
            setFormData(initialFormState);
            navigate('/admin/java');
        } catch (err) {
            console.error('Failed to add product:', err);
            alert('Error adding product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-[1200px] mx-auto relative">
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
                    <Spinner />
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className={`grid grid-cols-3 gap-0 bg-gray-200 rounded-lg overflow-hidden border border-gray-400 text-[#333333] ${loading ? 'pointer-events-none opacity-70' : ''}`}
                style={{ boxShadow: '0 0 10px 2px rgba(51, 51, 51, 0.2)' }}
            >
                {cols.map((colFields, colIndex) => (
                    <div key={colIndex} className="bg-gray-100 p-6 flex flex-col space-y-6">
                        {colFields.map(([field, config]) => {
                            const label = field.replace(/_/g, ' ');

                            if (config.type === 'select') {
                                return (
                                    <div key={field} className="flex flex-col">
                                        <label className="font-semibold mb-1 capitalize">{label}</label>
                                        <select
                                            name={field}
                                            value={formData[field]}
                                            required
                                            onChange={handleChange}
                                            className={inputBaseClasses}
                                            disabled={loading}
                                        >
                                            <option value="">Select {label}</option>
                                            {(selectOptions[field] || []).map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                );
                            } else if (config.type === 'file') {
                                return (
                                    <div key={field} className="flex flex-col">
                                        <label className="font-semibold mb-1 capitalize">{label}</label>
                                        <input
                                            type="file"
                                            name={field}
                                            required
                                            onChange={handleFileChange}
                                            className={inputBaseClasses}
                                            disabled={loading}
                                        />
                                    </div>
                                );
                            } else {
                                const inputType = config.type === 'int' ? 'number' : 'text';
                                return (
                                    <div key={field} className="flex flex-col">
                                        <label className="font-semibold mb-1 capitalize">{label}</label>
                                        <input
                                            type={inputType}
                                            name={field}
                                            required
                                            value={formData[field]}
                                            onChange={handleChange}
                                            className={inputBaseClasses}
                                            readOnly={field === 'Final_Price'}
                                            disabled={loading}
                                        />
                                    </div>
                                );
                            }
                        })}
                    </div>
                ))}

                <div className="col-span-3 mt-6 px-6">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct;
