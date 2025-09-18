import React from 'react';

const Spinner = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

export default Spinner;
