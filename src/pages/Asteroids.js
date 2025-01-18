import React, { useState, useEffect } from "react";
import ApiKey from "../api/ApiKey";

const Asteroids = () => {
    const [asteroids, setAsteroids] = useState([]);
    const [displayedAsteroids, setDisplayedAsteroids] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today's date
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Track the current page
    const [totalPages, setTotalPages] = useState(1); // Track total number of pages

    const baseUrl = "https://api.nasa.gov/neo/rest/v1/feed?";

    const fetchAsteroidData = async (chosenDate) => {
        setError(null);
        setAsteroids([]);
        try {
            const url = `${baseUrl}start_date=${chosenDate}&end_date=${chosenDate}&api_key=${ApiKey}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to fetch asteroid data. Please try again.");
            }

            const data = await response.json();
            const asteroidsForDate = data.near_earth_objects[chosenDate] || [];
            setAsteroids(asteroidsForDate);
            setTotalPages(Math.ceil(asteroidsForDate.length / 12)); // Calculate total pages based on 12 per page
        } catch (err) {
            setError(err.message);
        }
    };

    const paginateAsteroids = () => {
        const startIndex = (page - 1) * 12;
        const endIndex = startIndex + 12;
        setDisplayedAsteroids(asteroids.slice(startIndex, endIndex)); // Display 12 asteroids per page
    };

    useEffect(() => {
        fetchAsteroidData(date); // Fetch asteroids for the selected date
    }, [date]);

    useEffect(() => {
        paginateAsteroids(); // Update displayed asteroids whenever the page or asteroids change
    }, [asteroids, page]);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value; // Get the selected date from the input
        setDate(selectedDate); // Update the date
        setPage(1); // Reset to page 1 when the date changes
    };

    const changePage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setPage(pageNumber); // Change the page
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-6">

            {/* Title */}
            <h1 className="text-4xl font-extrabold text-center mb-6 tracking-wide">
                Asteroids Near Earth
            </h1>

            {/* Date Picker */}
            <div className="flex justify-center items-center mb-8">
                <label htmlFor="date-picker" className="text-lg font-medium mr-4">
                    Select Date:
                </label>
                <input
                    id="date-picker"
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="p-3 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-500 text-white py-3 px-5 rounded-md mb-6 text-center">
                    {error}
                </div>
            )}

            {/* No Data Message */}
            {!error && asteroids.length === 0 && (
                <div className="text-center text-gray-400">
                    No asteroids found for the selected date. Try another date!
                </div>
            )}

            {/* Asteroid Information */}
            {displayedAsteroids.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedAsteroids.map((asteroid, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 p-6 rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        >
                            <h2 className="text-lg font-bold mb-4">{asteroid.name}</h2>
                            <p className="text-sm text-gray-400 mb-2">
                                <strong>Diameter:</strong>{" "}
                                {`${asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                                    2
                                )} km - ${asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                                    2
                                )} km`}
                            </p>
                            <p className="text-sm text-gray-400 mb-2">
                                <strong>Potentially Hazardous:</strong>{" "}
                                {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                            </p>
                            <p className="text-sm text-gray-400 mb-2">
                                <strong>Close Approach Date:</strong>{" "}
                                {asteroid.close_approach_data[0].close_approach_date}
                            </p>
                            <p className="text-sm text-gray-400 mb-2">
                                <strong>Miss Distance:</strong>{" "}
                                {parseInt(
                                    asteroid.close_approach_data[0].miss_distance.kilometers
                                ).toLocaleString()}{" "}
                                km
                            </p>
                            <p className="text-sm text-gray-400">
                                <strong>Relative Velocity:</strong>{" "}
                                {parseInt(
                                    asteroid.close_approach_data[0].relative_velocity
                                        .kilometers_per_hour
                                ).toLocaleString()}{" "}
                                km/h
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
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
            )}
        </div>
    );
};

export default Asteroids;
