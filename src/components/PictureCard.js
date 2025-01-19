import React from 'react';

const PictureCard = ({ imageUrl, title, description, mediaType }) => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="mb-6">
                {mediaType === "video" ? (
                    <iframe
                        className="w-full h-64 sm:h-80 lg:h-96"
                        src={imageUrl}
                        frameBorder="0"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        title="Astronomy Picture of the Day"
                        aria-label={title}
                    ></iframe>
                ) : (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                        aria-label={title}
                    />
                )}
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4"
                    aria-label="Title of the Picture of the Day">
                    {title}
                </h2>
                <p className="text-lg text-gray-300 mb-4"
                   aria-label="Description of the Picture of the Day">
                    {description || "No description available."}
                </p>
            </div>
        </div>
    );
};

export default PictureCard;