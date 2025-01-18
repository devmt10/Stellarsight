import React, { useState, useEffect } from "react";
import ApiKey from "../api/ApiKey";

const PictureOfTheDay = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [mediaType, setMediaType] = useState(""); // For handling image or video
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today's date
    const [copyright, setCopyright] = useState("");
    const [error, setError] = useState(null);

    const baseUrl = "https://api.nasa.gov/planetary/apod?api_key=";

    // Function to fetch the Picture of the Day
    const fetchPOD = async (chosenDate) => {
        setError(null);
        console.log("Fetching data for date:", chosenDate);  // Log the date being fetched
        try {
            const url = chosenDate
                ? `${baseUrl}${ApiKey}&date=${chosenDate}`
                : `${baseUrl}${ApiKey}`;
            const response = await fetch(url);

            // Log the full API response for debugging
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
        console.log("Date changed to:", date); // Log the selected date
        fetchPOD(date);  // Fetch picture based on selected date
    }, [date]); // Trigger fetching whenever the date changes

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-900 via-gray-800 to-black text-white p-6">
            {/* Title for Picture of the Day */}
            <h1 className="text-3xl font-bold text-center mb-4 tracking-wide text-white">
                NASA's Astronomy Picture of the Day
            </h1>

            {/* Date Picker */}
            <h3 className="text-lg font-semibold mb-2 text-white text-center">Search by date:</h3>
            <div className="flex justify-center mb-6">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)} // Update the date on change
                    className="p-3 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-500 text-white py-3 px-5 rounded-md mb-6 text-center">
                    {error}
                </div>
            )}

            {/* Image or Video Card */}
            <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
                <div className="mb-6">
                    {mediaType === "video" ? (
                        <iframe
                            width="100%"
                            height="500"
                            src={imageUrl}
                            frameBorder="0"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                            title="Astronomy Picture of the Day"
                        ></iframe>
                    ) : (
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-auto object-cover rounded-lg shadow-lg"
                        />
                    )}
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
                    <p className="text-lg text-gray-300 mb-4">{description || "No description available."}</p>
                    <p className="text-sm text-gray-500">{copyright}</p>
                </div>
            </div>
        </div>
    );
};

export default PictureOfTheDay;
