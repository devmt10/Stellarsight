import React, { useState, useEffect } from "react";
import ApiKey from "../api/ApiKey"; // Import the API key component

const EarthPicturesPage = () => {
    const [images, setImages] = useState([]);
    const [displayedImages, setDisplayedImages] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today's date
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1); // Keep track of which page of images we are on
    const [totalPages, setTotalPages] = useState(1); // Total number of pages to show pagination buttons

    const baseUrl = "https://api.nasa.gov/EPIC/api/natural/date/";

    // Format date as YYYY-MM-DD for the API
    const formatDateForApi = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and ensure two digits
        const day = String(date.getDate()).padStart(2, '0'); // Get day and ensure two digits
        return `${year}-${month}-${day}`; // Return the date in YYYY-MM-DD format
    };

    useEffect(() => {
        fetchImages(); // Fetch images whenever the date or page changes
    }, [date]);

    useEffect(() => {
        paginateImages();
    }, [images, page]);

    const fetchImages = async () => {
        setLoading(true);
        setError("");
        try {
            const formattedDate = formatDateForApi(new Date(date)); // Format the date for the API
            console.log("Fetching images for date:", formattedDate); // Debugging log
            const url = `${baseUrl}${formattedDate}?api_key=${ApiKey}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch images.");
            const data = await response.json();
            console.log("Fetched data:", data); // Debugging log

            if (data.length === 0) {
                setImages([]); // Clear images if no data is returned
                setError("No images found for this date. Try adjusting your date.");
            } else {
                setImages(data); // Set the images for the current date
                setTotalPages(Math.ceil(data.length / 12)); // Set total pages for 12 images per page
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const paginateImages = () => {
        const startIndex = (page - 1) * 12;
        const endIndex = startIndex + 12;
        setDisplayedImages(images.slice(startIndex, endIndex)); // Display 12 images per page
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value; // Get the selected date from the input
        setDate(selectedDate); // Update the date when user selects a new one
        setPage(1); // Reset page to 1 when date changes
        setImages([]); // Clear images when changing date
        setError(""); // Clear error when changing date
    };

    const changePage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setPage(pageNumber); // Change the page to the selected number
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-900 via-gray-800 to-black text-white p-6">
            {/* Page Title */}
            <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wide text-white">
                Explore Earth from Space
            </h1>

            {/* Date Picker */}
            <div className="flex justify-center items-center mb-8">
                <label htmlFor="date-picker" className="text-lg font-medium mr-4 text-white">
                    Select Date:
                </label>
                <input
                    id="date-picker"
                    type="date"
                    value={date}
                    onChange={handleDateChange} // Use the updated date change handler
                    className="p-3 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Loading Indicator */}
            {loading && (
                <div className="text-yellow-400 text-center text-lg font-semibold mb-6">
                    Loading images...
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="text-red-500 text-center text-lg font-semibold mb-6">
                    {error}
                </div>
            )}

            {/* Image Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedImages.length > 0 ? (
                    displayedImages.map((image, index) => {
                        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${image.date.split(" ")[0].replace(/-/g, "/")}/jpg/${image.image}.jpg`;

                        return (
                            <div
                                key={index}
                                className="bg-gray-800 p-4 rounded-md shadow-lg transition transform hover:scale-105"
                            >
                                <img
                                    src={imageUrl}
                                    alt={image.caption || "Earth Image"}
                                    className="w-full h-64 object-cover rounded-md mb-4"
                                />
                                <p className="text-sm text-gray-400 mb-1">
                                    <strong>Caption:</strong> {image.caption || "No description available"}
                                </p>
                                {/* Show the selected date instead of the image's date */}
                                <p className="text-sm text-gray-400">
                                    <strong>Selected Date:</strong> {new Date(date).toLocaleDateString()}
                                </p>
                            </div>
                        );
                    })
                ) : (
                    !loading && !error && (
                        <p className="text-gray-400 text-center col-span-full">
                            No images found for this date. Try adjusting your date.
                        </p>
                    )
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 gap-4">
                <button
                    onClick={() => changePage(page - 1)}
                    disabled={page === 1}
                    className="bg-blue-600 text-white h-12 px-6 rounded-md font-semibold shadow-lg hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                    Previous
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => changePage(index + 1)}
                        className={`bg-blue-600 text-white h-12 w-12 rounded-md font-semibold shadow-lg hover:bg-blue-700 ${page === index + 1 ? 'bg-blue-800' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => changePage(page + 1)}
                    disabled={page === totalPages}
                    className="bg-blue-600 text-white h-12 px-6 rounded-md font-semibold shadow-lg hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default EarthPicturesPage;
