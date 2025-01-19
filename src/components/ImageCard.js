import React from 'react';

const ImageCard = ({ imageUrl, caption, date }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-md shadow-lg transition transform hover:scale-105" role="article">
            <img
                src={imageUrl}
                alt={caption || "Earth Image"}
                className="w-full h-48 md:h-64 object-cover rounded-md mb-4"
            />
            <p className="text-xs md:text-sm text-gray-400 mb-1">
                <strong>Caption:</strong> {caption || "No description available"}
            </p>
            <p className="text-xs md:text-sm text-gray-400">
                <strong>Selected Date:</strong> {date}
            </p>
        </div>
    );
};

export default ImageCard;