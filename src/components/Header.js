import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-[#061f4a] to-[#2a3d58] text-white shadow-lg py-6 px-4" role="banner">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">

                <Link to="/" className="flex items-center space-x-2" aria-label="Home">
                    <img
                        src="images/nasa-logo.svg"
                        alt="NASA Logo"
                        className="h-12"
                        aria-hidden="true"
                    />
                    <h1 className="text-3xl font-semibold tracking-wide text-yellow-300
                    hover:text-white transition-colors duration-300"
                        aria-label="StellarSight">
                        STELLARSIGHT
                    </h1>
                </Link>

                <nav className="hidden md:block">
                    <ul className="flex space-x-6 font-medium">

                        <li>
                            <Link
                                to="/pictureoftheday"
                                className="hover:text-yellow-300 transition-colors duration-300"
                                aria-label="Picture of the Day"
                            >
                                Picture of the Day
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/earthpictures"
                                className="hover:text-yellow-300 transition-colors duration-300"
                                aria-label="Earth Pictures"
                            >
                                Earth Pictures
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/asteroids"
                                className="hover:text-yellow-300 transition-colors duration-300"
                                aria-label="Asteroids"
                            >
                                Asteroids
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/mars"
                                className="hover:text-yellow-300 transition-colors duration-300"
                                aria-label="Mars"
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