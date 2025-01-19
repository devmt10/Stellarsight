import React from 'react';

const Background = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-900 via-gray-800 to-black text-white p-4 md:p-6" role="region">
            {children}
        </div>
    );
};

export default Background;