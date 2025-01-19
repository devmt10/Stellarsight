import React from 'react';

const ShowMoreButton = ({ onClick, isVisible }) => {
    if (!isVisible) return null;
    return (
        <div className="flex justify-center mt-8">
            <button
                onClick={onClick}
                className="bg-blue-600 text-white
                px-6 py-3 rounded-md font-semibold shadow-lg hover:bg-blue-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                aria-label="Show more images"
            >
                Show More
            </button>
        </div>
    );
};

export default ShowMoreButton;