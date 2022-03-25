import React, { useState } from "react";

export async function getServerSideProps(context) {

    const id = context.query.id;

    console.log(id);

    const res = await fetch('http://localhost:3000/api/rate', {
            method: 'POST',
            body: {
                id: id,
                rating: rating
            }
        }
    )

    const data = await res.json()

    return {
        props: {
            title: data.title,
            location: data.location,
            rating: 0
        },
    }
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
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)} >
                    <span className="star">&#9733;</span>
                </button>
            );
        })}
        </div>
    );
}