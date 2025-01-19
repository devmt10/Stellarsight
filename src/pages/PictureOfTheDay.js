import React, { useState, useEffect } from "react";
import ApiKey from "../api/ApiKey";
import Background from '../components/Background';
import DatePicker from '../components/DatePicker';
import PictureCard from '../components/PictureCard';

//The API can deliver both images and videos
const baseUrl = "https://api.nasa.gov/planetary/apod?api_key=";

const PictureOfTheDay = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [mediaType, setMediaType] = useState("");
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [copyright, setCopyright] = useState("");
    const [error, setError] = useState(null);

    const fetchPOD = async (chosenDate) => {
        setError(null);
        try {
            const url = chosenDate
                ? `${baseUrl}${ApiKey}&date=${chosenDate}`
                : `${baseUrl}${ApiKey}`;
            const response = await fetch(url);

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(
                    "We encountered an issue retrieving the requested image. Please try again later."
                );
            }

            if (responseData.error) {
                throw new Error(responseData.error.message);
            }

            displayPOD(responseData);
        } catch (error) {
            setError(error.message);
        }
    };

    const displayPOD = (data) => {
        setTitle(data.title);
        setDescription(data.explanation);
        setCopyright(data.copyright ? `© ${data.copyright} ` : "© NASA");
        setMediaType(data.media_type);
        setImageUrl(data.url);
    };

    useEffect(() => {
        fetchPOD(date);
    }, [date]);

    //Informing the user with a banner that pictures take a couple of days to be uploaded
    return (
        <Background>

            {/* Title for Picture of the Day */}
            <h1 id="pod-title" className="text-3xl font-bold text-center mb-4 tracking-wide text-white"
                aria-label="NASA's Astronomy Picture of the Day">
                NASA's Astronomy picture of the day
            </h1>

            {/* Date Picker */}
            <h3 className="text-lg font-semibold mb-2 text-white text-center">Search by date:</h3>
            <DatePicker date={date} onChange={(e) => setDate(e.target.value)} />

            {/* Error Message */}
            {error && (
                <div className="bg-red-500 text-white py-3 px-5 rounded-md mb-6 text-center" role="alert"
                     aria-live="assertive">
                    {error}
                </div>
            )}

            {/* Picture Card */}
            <PictureCard
                imageUrl={imageUrl}
                title={title}
                description={description}
                mediaType={mediaType}
            />
            <p className="text-sm text-gray-500 text-center" aria-label="Copyright Information">
                {copyright}
            </p>
        </Background>
    );
};

export default PictureOfTheDay;