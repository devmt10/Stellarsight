import React, { useState, useEffect } from "react";
import SpotifyEmbed from "../components/SpotifyEmbed"; // Adjust the path as needed

const Asteroids = () => {
    const [asteroids, setAsteroids] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today's date
    const [error, setError] = useState(null);

    const baseUrl = "https://api.nasa.gov/neo/rest/v1/feed?";
    const apiKey = "1x75JYgken7PLOG5wYbPy8z4ymg2qYz8Yk0qn4No";

    // Function to fetch asteroid data
    const fetchAsteroidData = async (chosenDate) => {
        setError(null);
        setAsteroids([]);
        try {
            const url = `${baseUrl}start_date=${chosenDate}&end_date=${chosenDate}&api_key=${apiKey}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    "Oops! It seems the asteroid data is off on a cosmic journey!"
                );
            }

            const data = await response.json();
            setAsteroids(data.near_earth_objects[chosenDate] || []);
        } catch (err) {
            setError(err.message);
        }
    };

    // Fetch data whenever the date changes
    useEffect(() => {
        fetchAsteroidData(date);
    }, [date]);

    return (
        <div className="min-h-screen flex flex-col items-center py-8">
            {/* Spotify Embed */}
            <div className="mb-6 w-full max-w-[500px]">
                <SpotifyEmbed src="https://open.spotify.com/embed/track/3gdewACMIVMEWVbyb8O9sY?utm_source=generator&theme=0" />
            </div>

            {/* Title for Asteroids */}
            <h1 className="text-3xl font-bold mb-4 text-center text-white">
                Asteroids Close to the Earth
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

            {/* Asteroid Information Section */}
            <div id="info-section" className="mt-6 w-full max-w-[1200px]">
                {!error && asteroids.length === 0 && (
                    <p className="text-gray-700 text-center">
                        Looks like the asteroids took a day off! Check back later!
                    </p>
                )}

                {asteroids.length > 0 && (
                    <div
                        id="asteroid-list"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
                    >
                        {asteroids.map((asteroid, index) => (
                            <div
                                key={index}
                                className="asteroid-info p-6 bg-gray-700 text-white shadow-lg rounded-lg text-left"
                            >
                                <p>
                                    <strong>Asteroid name:</strong> {asteroid.name}
                                </p>
                                <p>
                                    <strong>Diameter:</strong>{" "}
                                    {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                                        2
                                    )}{" "}
                                    km -{" "}
                                    {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                                        2
                                    )}{" "}
                                    km
                                </p>
                                <p>
                                    <strong>Hazardous:</strong>{" "}
                                    {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                                </p>
                                <p>
                                    <strong>Close Approach Date:</strong>{" "}
                                    {asteroid.close_approach_data[0].close_approach_date}
                                </p>
                                <p>
                                    <strong>Miss Distance:</strong>{" "}
                                    {asteroid.close_approach_data[0].miss_distance.kilometers}{" "}
                                    km
                                </p>
                                <p>
                                    <strong>Relative Velocity:</strong>{" "}
                                    {
                                        asteroid.close_approach_data[0].relative_velocity
                                            .kilometers_per_hour
                                    }{" "}
                                    km/h
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Asteroids;
