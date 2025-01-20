import React, { useState } from "react";

const testimonialsData = [
  {
    id: 1,
    text: `"Amazing quality and comfort. I love my new shoes!"`,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    description: "Satisfied Customer",
  },
  {
    id: 2,
    text: `"These shoes are stylish and durable, perfect for any occasion."`,
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    description: "Happy Customer",
  },
  {
    id: 3,
    text: `"Best purchase ever! These shoes exceeded my expectations."`,
    name: "Michael Brown",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    description: "Loyal Customer",
  },
  {
    id: 4,
    text: `"Super comfortable and stylish, I can wear them all day."`,
    name: "Emily Davis",
    image: "https://randomuser.me/api/portraits/women/35.jpg",
    description: "New Customer",
  },
];

const Testimonal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">What Our Customers Say</h2>
        <div className="relative">
          <div className="flex justify-center gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-64">
              <p className="text-lg text-gray-600 italic">
                {testimonialsData[currentIndex].text}
              </p>
              <div className="mt-4 flex justify-center">
                <img
                  src={testimonialsData[currentIndex].image}
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <h3 className="mt-2 font-semibold text-gray-800">
                {testimonialsData[currentIndex].name}
              </h3>
              <p className="text-gray-500">{testimonialsData[currentIndex].description}</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full shadow-lg"
          >
            &#8592;
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full shadow-lg"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonal;
