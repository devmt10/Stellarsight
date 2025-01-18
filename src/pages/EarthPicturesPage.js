import React, { useState, useEffect } from "react";
import SpotifyEmbed from "../components/SpotifyEmbed";

const EarthPicturesPage = () => {
    const [images, setImages] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    const baseUrl = "https://api.nasa.gov/EPIC/api/natural/images?api_key=";
    const apiKey = "1x75JYgken7PLOG5wYbPy8z4ymg2qYz8Yk0qn4No";

    // Fetch images whenever the date changes
    useEffect(() => {
        fetchImages(date);
    }, [date]);

    // Fetch images from NASA API based on the date
    const fetchImages = async (chosenDate) => {
        setError(null); // Reset any previous errors
        try {
            const url = `${baseUrl}${apiKey}&date=${chosenDate}`;
            console.log("Fetching from:", url); // Debugging log to check the request URL

            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch images");

            const data = await response.json();
            console.log("Fetched data:", data); // Debugging log to check the fetched data

            setImages(data);

            if (data.length) {
                setDescription(data[0].caption);
            }
        } catch (error) {
            setError("Error fetching images. Please try again later.");
            console.error("Error fetching images:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-8 text-[#1d2a53] font-space-mono">
            {/* Spotify Embed */}
            <div className="mb-6 w-full max-w-[500px]">
                <SpotifyEmbed src="https://open.spotify.com/embed/track/3rHd4zysCyQoGYmo7rqjKH?utm_source=generator" />
            </div>

            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-6 text-center text-white">
                Pictures of the Earth
            </h1>
            {/* Date Picker */}
            <h3 className="text-lg font-semibold mb-2 text-white">Search by date:</h3>
            <div className="date-picker-container inline-block bg-[#47555D] text-[#FAF5EF] rounded-md py-2 px-4 cursor-pointer hover:bg-[#102737]">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent border-none focus:outline-none text-[#FAF5EF] cursor-pointer"
                />
            </div>

            {/* Error message */}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* Images */}
            <div
                id="images-container"
                className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {images.length ? (
                    images.slice(0, 10).map((image, index) => (
                        <div key={index} className="w-full rounded-lg shadow-lg">
                            <img
                                src={`https://epic.gsfc.nasa.gov/archive/natural/${image.date
                                    .split(" ")[0]
                                    .replace(/-/g, "/")}/jpg/${image.image}.jpg`}
                                alt={image.caption}
                                className="w-full rounded-lg shadow-lg"
                            />
                        </div>
                    ))
                ) : (
                    <p>No images found for this date.</p>
                )}
            </div>

            {/* Description */}
            <p id="description" className="mt-6 text-lg text-white">
                {description || "No description available"}
            </p>
        </div>
    );
};

export default EarthPicturesPage;
