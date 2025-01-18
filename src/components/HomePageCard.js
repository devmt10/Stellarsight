import React from 'react';
import { Link } from 'react-router-dom';

const HomePageCard = ({ image, title, description, link }) => {
    return (
        <article className="flex flex-col justify-between bg-[#061f4a] p-6 rounded-lg shadow-lg w-80 min-h-[380px] text-center transition-transform duration-300 hover:shadow-2xl hover:scale-105">
            <img
                src={image}
                alt={title}
                className="w-full h-[230px] rounded-lg mb-4 object-cover"
            />
            <h2 className="text-xl mb-3 text-white">{title}</h2>
            <p className="mb-3 flex-grow text-white text-base">{description}</p>
            <div className="mt-auto">
                <Link to={link}>
                    <button className="bg-[#47555D] text-white border-none py-2 px-5 rounded-md cursor-pointer text-lg transition-colors duration-300 hover:bg-[#102737]">
                        Discover
                    </button>
                </Link>
            </div>
        </article>
    );
};

export default HomePageCard;
