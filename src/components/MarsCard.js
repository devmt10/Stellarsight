import React from 'react';

const MarsCard = ({ imageUrl, title, rover, camera, sol }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src={imageUrl} alt={title} className="w-full h-64 object-cover rounded-md mb-4" />
            <p className="text-sm text-gray-400 mb-1">
                <strong>Rover:</strong> {rover}
            </p>
            <p className="text-sm text-gray-400 mb-1">
                <strong>Camera:</strong> {camera}
            </p>
            <p className="text-sm text-gray-400 mb-1">
                <strong>Sol:</strong> {sol}
            </p>
        </div>
    );
};

export default MarsCard;