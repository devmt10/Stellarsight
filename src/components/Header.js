import React from 'react';

const Header = () => {
    return (
        <header className="flex flex-col items-center justify-center text-center font-space-mono py-8">
            <a
                href="/"
                className="text-yellow-300 text-4xl hover:text-[#47555D] transition-colors duration-300"
            >
                STELLARSIGHT
            </a>
            <p className="text-lg text-gray-200 mt-2">in collaboration with</p>
            <img src="images/nasa-logo.svg" alt="Logo" className="mt-4" />
        </header>
    );
};

export default Header;
