import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-[#061f4a] to-[#2a3d58] text-white shadow-lg py-6 px-4">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <Link to="/" className="flex items-center space-x-2">
                    <img
                        src="images/nasa-logo.svg"
                        alt="NASA Logo"
                        className="h-12"
                    />
                    <h1 className="text-3xl font-semibold tracking-wide text-yellow-300 hover:text-white transition-colors duration-300">
                        STELLARSIGHT
                    </h1>
                </Link>

                {/* Navigation Menu */}
                <nav>
                    <ul className="flex space-x-6 font-medium">
                        <li>
                            <Link
                                to="/"
                                className="hover:text-yellow-300 transition-colors duration-300"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/pictureoftheday"
                                className="hover:text-yellow-300 transition-colors duration-300"
                            >
                                Picture of the Day
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/earthpictures"
                                className="hover:text-yellow-300 transition-colors duration-300"
                            >
                                Earth Pictures
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/asteroids"
                                className="hover:text-yellow-300 transition-colors duration-300"
                            >
                                Asteroids
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/mars"
                                className="hover:text-yellow-300 transition-colors duration-300"
                            >
                                Mars
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
