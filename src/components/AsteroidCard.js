import React from 'react';

const AsteroidCard = ({ asteroid }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300" role="article">
            <h2 className="text-lg font-bold mb-4" aria-label={`Asteroid Name: ${asteroid.name}`}>
                {asteroid.name}
            </h2>
            <p className="text-sm text-gray-400 mb-2" aria-label={`Diameter of ${asteroid.name}`}>
                <strong>Diameter:</strong>{" "}
                {`${asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} km - ${asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km`}
            </p>
            <p className="text-sm text-gray-400 mb-2" aria-label={`Potentially Hazardous: ${asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}`}>
                <strong>Potentially Hazardous:</strong>{" "}
                {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-400 mb-2" aria-label={`Close Approach Date: ${asteroid.close_approach_data[0].close_approach_date}`}>
                <strong>Close Approach Date:</strong>{" "}
                {asteroid.close_approach_data[0].close_approach_date}
            </p>
            <p className="text-sm text-gray-400 mb-2" aria-label={`Miss Distance: ${parseInt(asteroid.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km`}>
                <strong>Miss Distance:</strong>{" "}
                {parseInt(asteroid.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km
            </p>
            <p className="text-sm text-gray-400" aria-label={`Relative Velocity: ${parseInt(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString()} km/h`}>
                <strong>Relative Velocity:</strong>{" "}
                {parseInt(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString()} km/h
            </p>
        </div>
    );
};

export default AsteroidCard;