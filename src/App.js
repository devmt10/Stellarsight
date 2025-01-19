import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

import PictureOfTheDay from './pages/PictureOfTheDay';
import EarthPicturesPage from './pages/EarthPicturesPage';
import Asteroids from './pages/Asteroids';
import Mars from './pages/Mars';

const App = () => {
    return (
        <Router>
            <div className="font-sans min-h-screen relative">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover"
                    style={{
                        backgroundImage: "url('/images/virtualbackground-02.webp')",
                        backgroundAttachment: 'fixed',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-80"></div>
                </div>

                {/* Content Section */}
                <div className="relative z-10">
                    <Header />
                    <main className="px-4 sm:px-6 py-8 relative z-1">
                        <Routes>
                            <Route path="/" element={<MainContent />} />
                            <Route path="/pictureoftheday" element={<PictureOfTheDay />} />
                            <Route path="/earthpictures" element={<EarthPicturesPage />} />
                            <Route path="/asteroids" element={<Asteroids />} />
                            <Route path="/mars" element={<Mars />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </div>
        </Router>
    );
};

export default App;