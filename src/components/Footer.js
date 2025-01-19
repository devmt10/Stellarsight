import React from 'react';

const Footer = () => {
    return (
        <footer className=" bg-[#061f4a] text-white text-center py-4" role="contentinfo" aria-label="Footer">
            <p aria-label="Copyright Information">
                &copy; {new Date().getFullYear()} Maria Teresa Gueli
            </p>
        </footer>
    );
};

export default Footer;