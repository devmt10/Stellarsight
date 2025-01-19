import React, { useState, useEffect } from "react";
import ApiKey from "../api/ApiKey";
import Banner from '../components/Banner';
import Background from '../components/Background';
import MarsCard from '../components/MarsCard';
import ShowMoreButton from '../components/ShowMoreButton';

const baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

const Mars = () => {
    const [photos, setPhotos] = useState([]);
    const [rover, setRover] = useState("curiosity");
    const [sol, setSol] = useState(1000);
    const [camera, setCamera] = useState("all");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visibleCount, setVisibleCount] = useState(5);

    const fetchMarsPhotos = async () => {
        setLoading(true);
        setError(null);
        try {
            let url = `${baseUrl}${rover}/photos?sol=${sol}&api_key=${ApiKey}`;
            if (camera !== "all") {
                url += `&camera=${camera}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to fetch Mars photos. Please try again.");
            }

            const data = await response.json();
            setPhotos(data.photos);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch photos whenever rover, sol, or camera changes
    useEffect(() => {
        fetchMarsPhotos();
    }, [rover, sol, camera]);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 5);
    };
//Error with the Nasa API (not showing all images, informing user via banner)
// API currently showing pictures for 1000 and 3000 (sol), curiosity rover and all cameras
    return (
        <Background>
            {/* Banner Section */}
            <Banner message="Technical issues with the NASA Mars Rover Photos API may affect image display. Thank you for your patience while we resolve this." />

            {/* Title */}
            <h1 className="text-4xl font-extrabold text-center mb-6 tracking-wide text-white"
                aria-label="Explore Mars rover photos">
                Explore Mars rover photos
            </h1>

            {/* Filters Section */}
            <div className="flex flex-wrap justify-center gap-6 mb-6 items-center">

                {/* Rover Filter */}
                <div className="flex flex-col w-full sm:w-1/4">
                    <label className="mb-2 text-sm font-medium text-gray-200" htmlFor="rover-select">Rover</label>
                    <select
                        id="rover-select"
                        value={rover}
                        onChange={(e) => setRover(e.target.value)}
                        className="p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                        aria-label="Select Rover"
                    >
                        <option value="curiosity">Curiosity</option>
                        <option value="opportunity">Opportunity</option>
                        <option value="spirit">Spirit</option>
                    </select>
                </div>

                {/* Sol Filter */}
                <div className="flex flex-col w-full sm:w-1/4">
                    <label className="mb-2 text-sm font-medium text-gray-200" htmlFor="sol-input">Martian Day (Sol)</label>
                    <input
                        id="sol-input"
                        type="number"
                        value={sol}
                        onChange={(e) => setSol(e.target.value)}
                        min="0"
                        className="p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                        aria-label="Enter Martian Day (Sol)"
                    />
                </div>

                {/* Camera Filter */}
                <div className="flex flex-col w-full sm:w-1/4">
                    <label className="mb-2 text-sm font-medium text-gray-200" htmlFor="camera-select">Camera</label>
                    <select
                        id="camera-select"
                        value={camera}
                        onChange={(e) => setCamera(e.target.value)}
                        className="p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                        aria-label="Select Camera"
                    >
                        <option value="all">All Cameras</option>
                        <option value="FHAZ">FHAZ (Front Hazard)</option>
                        <option value="RHAZ">RHAZ (Rear Hazard)</option>
                        <option value="MAST">MAST (Mast Camera)</option>
                        <option value="NAVCAM">NAVCAM (Navigation Camera)</option>
                    </select>
                </div>
            </div>

            {/* Loading Indicator */}
            {loading && (
                <div className="text-yellow-400 text-center text-lg font-semibold mb-6" aria-live="polite">
                    Loading photos...
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-500 text-white py-3 px-5 rounded-md mb-6 text-center" role="alert">
                    {error}
                </div>
            )}

            {/* No Data Message */}
            {!error && photos.length === 0 && !loading && (
                <div className="text-center text-gray-400">
                    No photos found for the selected filters. Please try adjusting your search.
                </div>
            )}

            {/* Photo Information */}
            {photos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {photos.slice(0, visibleCount).map((photo) => (
                        <MarsCard
                            key={photo.id}
                            imageUrl={photo.img_src}
                            title={`Mars - ${photo.camera.full_name}`}
                            rover={photo.rover.name}
                            camera={photo.camera.full_name}
                            sol={photo.sol}
                        />
                    ))}
                </div>
            )}

            {/* Show More Button */}
            {visibleCount < photos.length && (
                <ShowMoreButton onClick={handleShowMore} isVisible={visibleCount < photos.length} />
            )}
        </Background>
    );
};

export default Mars;