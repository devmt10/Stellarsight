import React, { useState } from 'react';
import Mars from '../components/Mars';
const MarsPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchMarsPhotos = async (rover, sol, camera) => {
        const apiKey = '1x75JYgken7PLOG5wYbPy8z4ymg2qYz8Yk0qn4No';
        let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${apiKey}`;
        if (camera !== 'all') {
            url += `&camera=${camera}`;
        }

        setLoading(true);
        setError('');
        setPhotos([]);

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch photos');
            const data = await response.json();
            setPhotos(data.photos);
        } catch (err) {
            setError(err.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        const rover = document.getElementById('rover').value;
        const sol = document.getElementById('sol').value;
        const camera = document.getElementById('camera').value;

        if (!sol || sol < 0) {
            alert('Please enter a valid Martian sol.');
            return;
        }

        fetchMarsPhotos(rover, sol, camera);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="flex flex-col mb-4 md:mb-0">
                    <label htmlFor="rover" className="text-gray-300">Select Rover:</label>
                    <select id="rover" className="p-2 bg-gray-700 text-white rounded-md">
                        <option value="curiosity">Curiosity</option>
                        <option value="opportunity">Opportunity</option>
                        <option value="spirit">Spirit</option>
                    </select>
                </div>
                <div className="flex flex-col mb-4 md:mb-0">
                    <label htmlFor="sol" className="text-gray-300">Martian Sol:</label>
                    <input
                        type="number"
                        id="sol"
                        placeholder="Enter Sol"
                        className="p-2 bg-gray-700 text-white rounded-md"
                    />
                </div>
                <div className="flex flex-col mb-4 md:mb-0">
                    <label htmlFor="camera" className="text-gray-300">Select Camera:</label>
                    <select id="camera" className="p-2 bg-gray-700 text-white rounded-md">
                        <option value="all">All Cameras</option>
                        <option value="FHAZ">Front Hazard Avoidance Camera</option>
                        <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                        <option value="MAST">Mast Camera</option>
                        <option value="NAVCAM">Navigation Camera</option>
                        <option value="PANCAM">Panoramic Camera</option>
                        <option value="MINITES">Mini-TES</option>
                    </select>
                </div>
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
                >
                    Search
                </button>
            </div>

            {loading && <p className="text-gray-300">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {photos.map((photo) => (
                    <div key={photo.id} className="p-4 bg-gray-700 rounded-lg shadow-md">
                        <img src={photo.img_src} alt="Mars" className="w-full rounded-md mb-4" />
                        <p className="text-gray-300"><strong>Rover:</strong> {photo.rover.name}</p>
                        <p className="text-gray-300"><strong>Camera:</strong> {photo.camera.full_name}</p>
                        <p className="text-gray-300"><strong>Sol:</strong> {photo.sol}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarsPhotos;
