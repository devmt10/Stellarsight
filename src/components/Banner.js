import React from 'react';

const Banner = ({ message }) => {
    return (
        <div className="bg-blue-500 text-white py-4 px-4 md:px-6 rounded-md shadow-lg mb-8">
            <p className="text-xs md:text-base text-center">
                <strong>Notice:</strong> {message}
            </p>
        </div>
    );
};

export default Banner;