import React, { useState, useEffect } from "react";
import ApiKey from "../api/ApiKey";

const Mars = () => {
    const [photos, setPhotos] = useState([]);
    const [rover, setRover] = useState("curiosity");
    const [sol, setSol] = useState(1000);
    const [camera, setCamera] = useState("all");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const photosPerPage = 12;
    const baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

    const fetchMarsPhotos = async (pageNumber) => {
        setLoading(true);
        setError(null);
        try {
            let url = `${baseUrl}${rover}/photos?sol=${sol}&api_key=${ApiKey}&page=${pageNumber}`;
            if (camera !== "all") {
                url += `&camera=${camera}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to fetch Mars photos. Please try again.");
            }

            const data = await response.json();
            const totalPhotos = data.photos.length;
            setPhotos(data.photos);
            setTotalPages(Math.ceil(totalPhotos / photosPerPage));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMarsPhotos(currentPage);
    }, [currentPage, rover, sol, camera]);

    const changePage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-6">

            {/* Banner Section */}
            <div className="bg-blue-500 text-white py-4 px-6 rounded-md shadow-lg mb-8">
                <p className="text-sm md:text-base text-center">
                    <strong>Notice:</strong> Technical issues with the NASA Mars Rover Photos API may affect image display.
                    Thank you for your patience while we resolve this.
                </p>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-extrabold text-center mb-6 tracking-wide">
                Explore Mars Rover Photos
            </h1>

            {/* Filters Section */}
            <div className="flex flex-wrap justify-center gap-6 mb-6 items-center">

                {/* Rover Filter */}
                <div className="flex flex-col w-full sm:w-1/4">
                    <label className="mb-2 text-sm font-medium text-gray-200">Rover</label>
                    <select
                        value={rover}
                        onChange={(e) => setRover(e.target.value)}
                        className="p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="curiosity">Curiosity</option>
                        <option value="opportunity">Opportunity</option>
                        <option value="spirit">Spirit</option>
                    </select>
                </div>

                {/* Sol Filter */}
                <div className="flex flex-col w-full sm:w-1/4">
                    <label className="mb-2 text-sm font-medium text-gray-200">Martian Day (Sol)</label>
                    <input
                        type="number"
                        value={sol}
                        onChange={(e) => setSol(e.target.value)}
                        min="0"
                        className="p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Camera Filter */}
                <div className="flex flex-col w-full sm:w-1/4">
                    <label className="mb-2 text-sm font-medium text-gray-200">Camera</label>
                    <select
                        value={camera}
                        onChange={(e) => setCamera(e.target.value)}
                        className="p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Cameras</option>
                        <option value="FHAZ">FHAZ (Front Hazard)</option>
                        <option value="RHAZ">RHAZ (Rear Hazard)</option>
                        <option value="MAST">MAST (Mast Camera)</option>
                        <option value="NAVCAM">NAVCAM (Navigation Camera)</option>
                    </select>
                </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center mb-8">
                <button
                    onClick={() => fetchMarsPhotos(currentPage)}
                    className="bg-blue-600 text-white w-full sm:w-auto h-12 px-6 rounded-md shadow-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                    Search
                </button>
            </div>

            {/* Loading Indicator */}
            {loading && (
                <div className="text-yellow-400 text-center text-lg font-semibold mb-6">
                    Loading photos...
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-500 text-white py-3 px-5 rounded-md mb-6 text-center">
                    {error}
                </div>
            )}

            {/* No Data Message */}
            {!error && photos.length === 0 && !loading && (
                <div className="text-center text-gray-400">
                    No photos found for the selected filters. Try adjusting your search!
                </div>
            )}

            {/* Photo Information */}
            {photos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {photos.slice(0, photosPerPage).map((photo) => (
                        <div
                            key={photo.id}
                            className="bg-gray-800 p-6 rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        >
                            <img
                                src={photo.img_src}
                                alt={`Mars - ${photo.camera.full_name}`}
                                className="w-full h-64 object-cover rounded-md mb-4"
                            />
                            <p className="text-sm text-gray-400 mb-1">
                                <strong>Rover:</strong> {photo.rover.name}
                            </p>
                            <p className="text-sm text-gray-400 mb-1">
                                <strong>Camera:</strong> {photo.camera.full_name}
                            </p>
                            <p className="text-sm text-gray-400 mb-1">
                                <strong>Sol:</strong> {photo.sol}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => changePage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-blue-600 text-white h-12 px-6 rounded-md font-semibold shadow-lg hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    >
                        Previous
                    </button>

                    {/* Page Number Buttons */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => changePage(index + 1)}
                            className={`bg-blue-600 text-white h-12 w-12 rounded-md font-semibold shadow-lg hover:bg-blue-700 ${currentPage === index + 1 ? 'bg-blue-800' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => changePage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-blue-600 text-white h-12 px-6 rounded-md font-semibold shadow-lg hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Mars;
