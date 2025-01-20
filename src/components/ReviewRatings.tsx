'use client';
import React, { useState } from 'react';

const ReviewRating: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Handle rating change
  const handleRating = (newRating: number) => {
    setRating(newRating);
    setHoveredRating(0); // Reset hover state
  };

  // Handle comment input change
  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);

    // Normally, you would send this data to an API or backend
    console.log('Rating:', rating);
    console.log('Comment:', comment);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-800">Write a Review</h3>

      {/* Star Rating */}
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill={star <= (hoveredRating || rating) ? 'gold' : 'gray'}
            viewBox="0 0 24 24"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => handleRating(star)}
          >
            <path d="M12 .587l3.668 7.431 8.214 1.191-5.939 5.729 1.401 8.203-7.544-3.96-7.544 3.96 1.401-8.203-5.939-5.729 8.214-1.191z" />
          </svg>
        ))}
      </div>

      {/* Comment Input */}
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="Write your comment here..."
        className="w-full p-4 border rounded-lg text-lg"
        rows={4}
        maxLength={300}
      ></textarea>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white p-4 rounded-lg text-xl hover:bg-blue-700 transition-all"
      >
        Submit Review
      </button>

      {submitted && (
        <div className="mt-4 text-green-600">
          <p>Thank you for your review!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewRating;
