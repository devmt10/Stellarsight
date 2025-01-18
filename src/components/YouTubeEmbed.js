import React from 'react';

const YouTubeEmbed = () => {
    return (
        <div className="flex justify-center items-center mb-24">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/PPQ29WRT-rU?si=HXbT_xgvsO3g5rni"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default YouTubeEmbed;