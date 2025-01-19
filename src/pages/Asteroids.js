import React, { useState, useEffect } from "react";
import ApiKey from "../api/ApiKey";
import Background from '../components/Background';
import AsteroidCard from '../components/AsteroidCard';
import DatePicker from '../components/DatePicker';
import ShowMoreButton from '../components/ShowMoreButton';

const baseUrl = "https://api.nasa.gov/neo/rest/v1/feed?";

const Asteroids = () => {
    const [asteroids, setAsteroids] = useState([]);
    const [displayedAsteroids, setDisplayedAsteroids] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Track the current page
    const [itemsPerPage, setItemsPerPage] = useState(5);

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
            setDisplayedAsteroids(asteroidsForDate.slice(0, itemsPerPage)); // Display initial items
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchAsteroidData(date);
    }, [date]);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        setPage(1);
    };

    const showMoreAsteroids = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        const nextItems = asteroids.slice(0, nextPage * itemsPerPage);
        setDisplayedAsteroids(nextItems);
    };

    return (
        <Background>

            {/* Title */}
            <h1 id="asteroids-title" className="text-4xl font-extrabold text-center mb-6 tracking-wide" aria-label="Asteroids Near Earth">
                Asteroids near Earth
            </h1>

            {/* Date Picker */}
            <DatePicker date={date} onChange={handleDateChange} />

            {/* Error Message */}
            {error && (
                <div className="bg-red-500 text-white py-3 px-5 rounded-md mb-6 text-center" role="alert" aria-live="assertive">
                    {error}
                </div>
            )}

            {/* No Data Message */}
            {!error && asteroids.length === 0 && (
                <div className="text-center text-gray-400" aria-live="polite">
                    No asteroids found for the selected date. Try another date!
                </div>
            )}

            {/* Asteroid Information */}
            {displayedAsteroids.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Asteroid Information">
                    {displayedAsteroids.map((asteroid, index) => (
                        <AsteroidCard key={index} asteroid={asteroid} />
                    ))}
                </div>
            )}

            {/* Show More Button */}
            {asteroids.length > displayedAsteroids.length && (
                <ShowMoreButton
                    onClick={showMoreAsteroids}
                    isVisible={asteroids.length > displayedAsteroids.length}
                />
            )}
        </Background>
    );
};

export default Asteroids;