import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Product from "../admin/Product";
import { FaSlidersH } from "react-icons/fa";
import { Api } from "../../services/Api";

export default function FilterBar({ ProductList, setLoading }) {
    const outerFilters = [
        { label: "Shape", key: "Shape", type: "select" },
        { label: "Pair", key: "Pair", type: "select" },
        { label: "Product Type", key: "Product_Type", type: "select" },
        { label: "Carat", key: "Carat", type: "input" }, // Carat as input
    ];

    const slideFilters = [
        "Fancy_Color_Dominant_Color",
        "Color",
        "Fancy_Color_Overtone",
        "Clarity",
        "Fancy_Color_Intensity",
        "Fluor_Intensity",
        "Lab",
        "Certification",
        "Culet_Carat",
    ];

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [outsideFilters, setOutsideFilters] = useState(
        outerFilters.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {})
    );

    const [selectedFilters, setSelectedFilters] = useState(
        slideFilters.reduce((acc, key) => ({ ...acc, [key]: "" }), {})
    );

    const [appliedFilters, setAppliedFilters] = useState(selectedFilters);

    const [items, setItems] = useState([]);

    const menuRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isFilterOpen) {
            fetchData({ ...outsideFilters, ...selectedFilters });
        }
    }, [isFilterOpen]);

    function handleClickOutside(e) {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsFilterOpen(false);
        }
    }

    function handleOutsideChange(key, value) {
        if (key === "Carat") {
            if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                const newOutsideFilters = { ...outsideFilters, [key]: value };
                setOutsideFilters(newOutsideFilters);
                fetchData({ ...newOutsideFilters, ...appliedFilters });
            }
        } else {
            const newOutsideFilters = { ...outsideFilters, [key]: value };
            setOutsideFilters(newOutsideFilters);
            fetchData({ ...newOutsideFilters, ...appliedFilters });
        }
    }

    function handleInsideChange(key, value) {
        setSelectedFilters((prev) => ({ ...prev, [key]: value }));
    }

    function applyFilters() {
        setAppliedFilters(selectedFilters);
        fetchData({ ...outsideFilters, ...selectedFilters });
        setIsFilterOpen(false);
    }

    async function fetchData(filters) {
        try {
            setLoading(true);
            const res = await axios.get(Api.FETCH_PRODUCTS, {
                params: filters,
            });
            setItems(res.data.products);
            ProductList(res.data.products);
        } catch (err) {
            console.error("Failed to fetch products:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative">
            <div className="flex flex-wrap justify-center items-center gap-4 p-4 sm:p-6">
                {outerFilters.map(({ label, key, type }) => (
                    <div
                        key={key}
                        className="w-36 sm:w-40 h-20 border rounded-xl flex flex-col items-center justify-center text-gray-700 text-center"
                    >
                        <div className="text-base font-semibold">{label}</div>
                        {type === "select" ? (
                            <select
                                value={outsideFilters[key]}
                                onChange={(e) => handleOutsideChange(key, e.target.value)}
                                className="text-sm w-full bg-white outline-none rounded px-2 py-1 text-center appearance-none"
                            >
                                <option value="">All</option>
                                {(Product.selectOptions[key] || []).map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                value={outsideFilters[key]}
                                onChange={(e) => handleOutsideChange(key, e.target.value)}
                                className="text-sm w-full bg-white outline-none rounded px-2 py-1 text-center"
                                placeholder="Enter carat"
                            />
                        )}
                    </div>
                ))}

                <div
                    onClick={() => setIsFilterOpen(true)}
                    className="w-16 h-16 sm:w-20 sm:h-20 border rounded-xl flex items-center justify-center text-gray-700 cursor-pointer"
                    aria-label="Open More Filters"
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === "Enter" && setIsFilterOpen(true)}
                >
                    <FaSlidersH className="text-xl sm:text-2xl" />
                </div>
            </div>

            {/* Slide Menu */}
            <div
                ref={menuRef}
                className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-white shadow-lg p-6 transform transition-transform duration-300 z-50 overflow-y-auto ${
                    isFilterOpen ? "translate-x-0" : "translate-x-full"
                }`}
                style={{ maxHeight: "100vh" }}
            >
                <h2 className="text-lg font-semibold mb-4">More Filters</h2>
                <div className="flex flex-col gap-4 max-h-[80vh] pr-2 overflow-y-auto">
                    {slideFilters.map((key) => (
                        <div key={key}>
                            <label
                                htmlFor={key}
                                className="block mb-1 font-medium text-sm text-gray-700"
                            >
                                {key.replace(/_/g, " ")}
                            </label>
                            <select
                                id={key}
                                value={selectedFilters[key]}
                                onChange={(e) => handleInsideChange(key, e.target.value)}
                                className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-center"
                            >
                                <option value="">All</option>
                                {(Product.selectOptions[key] || []).map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
                <button
                    onClick={applyFilters}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                >
                    Apply
                </button>
            </div>
        </div>
    );
}
