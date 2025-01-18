import React, { useState, useEffect } from 'react';
import SpotifyEmbed from '../components/SpotifyEmbed';

const Mars = () => {
    const [photos, setPhotos] = useState([]);
    const [rover, setRover] = useState('curiosity');
    const [sol, setSol] = useState(1000);
    const [camera, setCamera] = useState('all');
    const [loading, setLoading] = useState(false);

    const apiKey = '1x75JYgken7PLOG5wYbPy8z4ymg2qYz8Yk0qn4No';

    useEffect(() => {
        fetchMarsPhotos();
    }, []);

    //there's currently an issue with the API from Nasa (showing the pictures just for rover curiosity)
    const fetchMarsPhotos = async () => {
        setLoading(true);
        let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${apiKey}`;
        if (camera !== 'all') {
            url += `&camera=${camera}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            setPhotos(data.photos || []);
        } catch (error) {
            console.error('Error fetching Mars photos:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center text-white">
            {/* Spotify Embed */}
            <SpotifyEmbed src="https://open.spotify.com/embed/track/3ZE3wv8V3w2T2f7nOCjV0N?utm_source=generator&theme=0" />

            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-6">Mars Rover Photos</h1>

            {/* Filters */}
            <div className="mb-6">
                <label className="mr-4">
                    Select rover:
                    <select
                        value={rover}
                        onChange={(e) => setRover(e.target.value)}
                        className="ml-2 p-2 rounded bg-gray-700 text-white"
                    >
                        <option value="curiosity">Curiosity</option>
                        <option value="opportunity">Opportunity</option>
                        <option value="spirit">Spirit</option>
                    </select>
                </label>
                <label className="mr-4">
                    Sol (Martian day):
                    <input
                        type="number"
                        value={sol}
                        onChange={(e) => setSol(e.target.value)}
                        className="ml-2 p-2 rounded bg-gray-700 text-white"
                        min="0"
                    />
                </label>
                <label className="mr-4">
                    Select Camera:
                    <select
                        value={camera}
                        onChange={(e) => setCamera(e.target.value)}
                        className="ml-2 p-2 rounded bg-gray-700 text-white"
                    >
                        <option value="all">All cameras</option>
                        <option value="FHAZ">FHAZ (Front Hazard)</option>
                        <option value="RHAZ">RHAZ (Rear Hazard)</option>
                        <option value="MAST">MAST (Mast Camera)</option>
                        <option value="NAVCAM">NAVCAM (Navigation Camera)</option>
                    </select>
                </label>

                {/* Search Button */}
                <button
                    onClick={fetchMarsPhotos}
                    className="bg-[#47555D] text-white border-none py-2 px-5 rounded-md cursor-pointer text-lg transition-colors duration-300 hover:bg-[#102737]"
                >
                    Search
                </button>
            </div>

            {/* Loading Indicator */}
            {loading && <p>Loading...</p>}

            {/* Photo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.length > 0 ? (
                    photos.map((photo) => (
                        <div key={photo.id} className="bg-gray-800 p-4 rounded shadow-lg">
                            <img
                                src={photo.img_src}
                                alt="Mars"
                                className="w-full h-64 object-cover rounded mb-4"
                            />
                            <p><strong>Rover:</strong> {photo.rover.name}</p>
                            <p><strong>Camera:</strong> {photo.camera.full_name}</p>
                            <p><strong>Sol:</strong> {photo.sol}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 mt-6">No photos found. Try different parameters.</p>
                )}
            </div>
        </div>
    );
};

export default Mars;
