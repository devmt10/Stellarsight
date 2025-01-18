import React from 'react';

const SpotifyEmbed = ({ src }) => {
    const theme = "0"; //spotity only allows 0 and 1

    const updatedSrc = `${src}?utm_source=generator&theme=${theme}`;

    return (
        <div className="mb-6 flex justify-center w-full">
            <div className="w-full max-w-[700px]">
                <iframe
                    className="w-full rounded-xl"
                    style={{ height: "200px" }}
                    src={updatedSrc}
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Spotify Embed"
                ></iframe>
            </div>
        </div>
    );
};

export default SpotifyEmbed;
