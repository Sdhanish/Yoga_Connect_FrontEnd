import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ViewClassPage = () => {
    // Fetch the data using useLoaderData
    const classDetails = useLoaderData();

    return (
        <div className="flex flex-col items-center justify-between h-screen p-6">
            {/* Iframe Container */}
            <div className="w-full h-4/5 mb-2"> {/* Reduced margin-bottom */}
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${
                        classDetails.videoLink.split("youtu.be/")[1].split("?")[0]
                    }`}
                    title={classDetails.name}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Video Details */}
            <div className="w-full "> {/* Center text in this div */}
                {/* Video Title */}
                <h1 className="text-3xl font-bold mb-1">{classDetails.name}</h1> {/* Reduced margin-bottom */}
                <h2 className="text-xl font-semibold mb-1">Instructor: {classDetails.instructorName}</h2> {/* Reduced margin-bottom */}
                <p className="text-lg">{classDetails.description}</p>
            </div>
        </div>
    );
};

export default ViewClassPage;
