import React from 'react';
import HomePageCard from './HomePageCard';
import YouTubeEmbed from './YouTubeEmbed';

const MainContent = () => {
    return (
        <main className="p-6 font-space-mono">
            {/* YouTube Embed Component */}
            <YouTubeEmbed videoId="dQw4w9WgXcQ" /> {/* Replace with your desired YouTube video ID */}

            <div className="description text-center mb-10">
                <p className="text-lg text-gray-300">Welcome to StellarSight, where you can explore the wonders of the universe!</p>
            </div>

            <section className="flex justify-center gap-8 flex-wrap mb-16">
                <HomePageCard
                    image="images/imageofday.jpeg"
                    title="Picture of the day"
                    description="Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured."
                    link="/pictureoftheday"
                />
                <HomePageCard
                    image="images/nasa-earth-views-01-cr-courtesy.webp"
                    title="Pictures of the Earth"
                    description="Daily natural color imagery of Earth from the EPIC camera onboard the DSCOVR spacecraft."
                    link="/earthpictures"
                />
                <HomePageCard
                    image="images/Asteroid_Bennu-1.jpeg"
                    title="Asteroids"
                    description="NASA has sent several robotic spacecraft to encounter asteroids up close to learn more about their composition."
                    link="/asteroids"
                />
                <HomePageCard
                    image="images/mars.jpg"
                    title="Pictures of Mars"
                    description="Visualize image data gathered by NASA's Curiosity, Opportunity, and Spirit rovers on Mars."
                    link="/mars"
                />
            </section>
        </main>
    );
};

export default MainContent;
