import React, { useState, useEffect } from "react";
import ApiKey from "../api/ApiKey";
import Banner from '../components/Banner';
import Background from '../components/Background';
import ImageCard from '../components/ImageCard';
import DatePicker from '../components/DatePicker';
import ShowMoreButton from '../components/ShowMoreButton';

const baseUrl = "https://api.nasa.gov/EPIC/api/natural/date/";

const EarthPicturesPage = () => {
    const [images, setImages] = useState([]);
    const [displayedImages, setDisplayedImages] = useState([]);
    const [date, setDate] = useState(() => {
        const specificDate = new Date(Date.UTC(2025, 0,  1));
        return specificDate.toISOString().slice(0, 10);
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [limit, setLimit] = useState(5);

    useEffect(() => {
        fetchImages();
    }, [date]);

    const fetchImages = async () => {
        setLoading(true);
        setError("");
        try {
            const formattedDate = date;
            const url = `${baseUrl}${formattedDate}?api_key=${ApiKey}`;

            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch images.");
            const data = await response.json();

            if (data.length === 0) {
                setImages([]);
                setError("No images found for the selected date. Please try a different date.");
            } else {
                setImages(data);
                setDisplayedImages(data.slice(0, limit));
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const paginatedImages = images.slice(0, limit);
        setDisplayedImages(paginatedImages);
    }, [images, limit]);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        setLimit(5);
        setImages([]);
        setError("");
    };

    const handleShowMore = () => {
        setLimit((prevLimit) => prevLimit + 5);
    };

    return (
        <Background>
            {/* Banner Section */}
            <Banner
                message="The NASA EPIC API provides images captured by the EPIC camera on the DSCOVR satellite. Images are not uploaded in real-time and may take 1-2 days to appear."/>
            {/* Page Title */}
            <h1 id="earth-pictures-title"
                className="text-3xl md:text-4xl font-extrabold text-center mb-6 tracking-wide text-white"
                aria-label="Explore Earth from Space">
                Explore Earth from Space
            </h1>
            {/* Date Picker */}
            <h3 className="text-lg font-semibold mb-2 text-white text-center">Search by date:</h3>

            <DatePicker date={date} onChange={handleDateChange}/>
            {/* Loading Indicator */}
            {loading && (
                <div className="text-yellow-400 text-center text-lg font-semibold mb-6" aria-live="polite">
                    Loading images...
                </div>
            )}
            {/* Error Message */}
            {error && (
                <div className="text-red-500 text-center text-lg font-semibold mb-6" role="alert" aria-live="assertive">
                    {error}
                </div>
            )}
            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Earth images">
                {displayedImages.length > 0 ? (
                    displayedImages.map((image, index) => {
                        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${image.date.split(" ")[0].replace(/-/g, "/")}/jpg/${image.image}.jpg`;

                        return (
                            <ImageCard
                                key={index}
                                imageUrl={imageUrl}
                                caption={image.caption}
                                date={new Date(date).toLocaleDateString()}
                            />
                        );
                    })
                ) : (
                    !loading &&
                    !error && (
                        <p className="text-gray-400 text-center col-span-full">
                            No images found for this date. Try adjusting your date.
                        </p>
                    )
                )}
            </div>
            {/* Show More Button */}
            <ShowMoreButton
                onClick={handleShowMore}
                isVisible={images.length > displayedImages.length}
            />
        </Background>
    );
};

export default EarthPicturesPage;