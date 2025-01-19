import React from 'react';
import HomePageCard from './HomePageCard';
import YouTubeEmbed from './YouTubeEmbed';

const MainContent = () => {
    return (
        <main className="p-6 font-space-mono" role="main" aria-label="Main Content">

            <YouTubeEmbed videoId="dQw4w9WgXcQ"
                          aria-label="YouTube Video"/>

            <div className="description text-center mb-10">
                <p className="text-lg text-gray-300" aria-label="Welcome Message">
                    Welcome to StellarSight, your gateway to exploring the vast wonders of the universe. Join us on an
                    extraordinary journey through the cosmos, where your curiosity will illuminate the path to the stars
                    and beyond.
                </p>
            </div>

            <section className="flex justify-center gap-8 flex-wrap mb-16" aria-label="Explore Sections">
                <HomePageCard
                    image="images/imageofday.jpeg"
                    title="Picture of the Day"
                    description="Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured."
                    link="/pictureoftheday"
                />
                <HomePageCard
                    image="images/nasa-earth-views-01-cr-courtesy.webp"
                    title="Earth Pictures"
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