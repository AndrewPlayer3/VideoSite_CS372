import React, { useState, useEffect } from "react";

const postRating = (video_rating, video_id) => {
    console.log('Client Rating: ', video_rating);
    console.log('Client ID: ', video_id);
    fetch('http://localhost:3000/api/rate', {
        method: 'POST',
        body: JSON.stringify({
            rating: video_rating,
            id: video_id
        })
    }).then((res) => res.json()).then(console.log("Rating finished."));
}

export default function Rating({ video_id }) {
    let [rating, setRating] = useState(0);
    let [hover, setHover] = useState(0);

    return (
        <div className="star-rating">
        {[...Array(5)].map((star, index) => {
            index += 1;
            return (
                <button
                    type="button"
                    key={index}
                    className={index <= (hover || rating) ? "text-[#1F2937] text-2xl" : "text-[#ccc] text-2xl"}
                    onClick={() => {setRating(index); postRating(index, video_id);}}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)} >
                    <span className="star">&#9733;</span>
                </button>
            );
        })}
        </div>
    );
}