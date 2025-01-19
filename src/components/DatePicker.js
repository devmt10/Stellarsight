import React from 'react';

const DatePicker = ({ date, onChange }) => {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center mb-8">

            <input
                id="date-picker"
                type="date"
                value={date}
                onChange={onChange}
                className="p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                aria-describedby="date-picker-description"
            />
        </div>
    );
};

export default DatePicker;