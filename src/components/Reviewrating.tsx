'use client';
import React, { useState } from "react";

const ReviewRating = ({ ratings = [5, 4, 3, 5, 4] }) => {
  const [userRating, setUserRating] = useState(0);
  const totalRatings = ratings.length;
  const averageRating =
    totalRatings > 0 ? ratings.reduce((acc, curr) => acc + curr, 0) / totalRatings : 0;

  const handleRating = (rating) => {
    setUserRating(rating);
    // Here, you could send the rating to an API or save it locally
    console.log(`User rated: ${rating}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            className={`cursor-pointer text-2xl ${
              userRating >= star ? "text-yellow-400" : "text-gray-400"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-lg">Your Rating: {userRating}</p>
      <p className="mt-2 text-lg">Average Rating: {averageRating.toFixed(1)} ({totalRatings} ratings)</p>
    </div>
  );
};

export default ReviewRating;
