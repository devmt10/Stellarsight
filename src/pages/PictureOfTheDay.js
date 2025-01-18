import React, { useState, useEffect } from "react";
import SpotifyEmbed from "../components/SpotifyEmbed"; // Adjust the path as needed

const PictureOfTheDay = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [mediaType, setMediaType] = useState(""); // For handling image or video
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today's date
    const [copyright, setCopyright] = useState("");
    const [error, setError] = useState(null);

    const baseUrl = "https://api.nasa.gov/planetary/apod?api_key=";
    const apiKey = "1x75JYgken7PLOG5wYbPy8z4ymg2qYz8Yk0qn4No";

    // Function to fetch the Picture of the Day
    const fetchPOD = async (chosenDate) => {
        setError(null);
        try {
            const url = chosenDate
                ? `${baseUrl}${apiKey}&date=${chosenDate}`
                : `${baseUrl}${apiKey}`;
            const response = await fetch(url);

            // Log the full response to help diagnose issues
            const responseData = await response.json();
            console.log("API Response:", responseData);

            if (!response.ok) {
                throw new Error(
                    "Oops! It seems the picture you're looking for is off on a cosmic journey!"
                );
            }

            if (responseData.error) {
                throw new Error(responseData.error.message);
            }

            displayPOD(responseData);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);
        }
    };

    // Function to display the Picture of the Day data
    const displayPOD = (data) => {
        setTitle(data.title);
        setDescription(data.explanation);
        setCopyright(data.copyright ? `© ${data.copyright}` : "© NASA");
        setMediaType(data.media_type);
        setImageUrl(data.url);
    };

    // Handle date input change
    useEffect(() => {
        fetchPOD(date);
    }, [date]);

    return (
        <div className="min-h-screen flex flex-col items-center py-8">
            {/* Spotify Embed */}
            <div className="mb-6 w-full max-w-[500px]">
                <SpotifyEmbed src="https://open.spotify.com/embed/track/6pWgRkpqVfxnj3WuIcJ7WP?utm_source=generator" />
            </div>

            {/* Title for Picture of the Day */}
            <h1 className="text-3xl font-bold mb-4 text-center text-white">
                NASA's Astronomy Picture of the Day
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

            {/* Error Message */}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* Image or Video Section */}
            <div id="media-section" className="mt-6 w-full max-w-[1200px]">
                {mediaType === "video" ? (
                    <iframe
                        id="videoLink"
                        width="560"
                        height="315"
                        src={imageUrl}
                        frameBorder="0"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <img
                        id="image_of_the_day"
                        src={imageUrl}
                        alt={title}
                        className="w-full rounded-lg shadow-lg"
                    />
                )}
            </div>

            {/* Description */}
            <p id="description" className="mt-6 text-lg text-center text-white">
                {description || "No description available"}
            </p>
            <p id="copyright" className="mt-2 text-sm text-center text-gray-500">
                {copyright}
            </p>
        </div>
    );
};

export default PictureOfTheDay;
