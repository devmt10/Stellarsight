import React from 'react';
import HomePageCard from './HomePageCard';
import YouTubeEmbed from './YouTubeEmbed'; // Import the YouTubeEmbed component

const MainContent = () => {
    return (
        <main className="p-5 font-space-mono">
            {/* YouTube Embed Component */}
            <YouTubeEmbed videoId="dQw4w9WgXcQ" /> {/* Replace with your desired YouTube video ID */}

            <div className="description text-center mb-10">
                {/* You can add a description here if needed */}
            </div>
            <section className="flex justify-center gap-8 flex-wrap mb-16">
                <HomePageCard
                    image="images/imageofday.jpeg"
                    title="Picture of the day"
                    description="Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer."
                    link="/pictureoftheday" // Link to the PictureOfTheDay page
                />
                <HomePageCard
                    image="images/nasa-earth-views-01-cr-courtesy.webp"
                    title="Pictures of the Earth"
                    description="Daily natural color imagery of Earth from the EPIC camera onboard the DSCOVR spacecraft."
                    link="/earthpictures" // Link to the EarthPicturesPage page
                />
                <HomePageCard
                    image="images/Asteroid_Bennu-1.jpeg"
                    title="Asteroids"
                    description="NASA has sent several robotic spacecraft to encounter asteroids up close to learn more about their composition and size."
                    link="/asteroids" // Link to the Asteroids page
                />
                <HomePageCard
                    image="images/mars.jpg"
                    title="Pictures of Mars"
                    description="Visualize image data gathered by NASA's Curiosity, Opportunity, and Spirit rovers on Mars."
                    link="/mars" // Link to the Mars page
                />
            </section>
        </main>
    );
};

export default MainContent;
