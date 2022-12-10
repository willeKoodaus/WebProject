import React from 'react';

const Reviews = ({ recipe }) => {
  const stars = Array(5).fill(0); // create an array of 5 elements filled with 0
  const averageRating = recipe.reviews.reduce((a, b) => a + b, 0) / recipe.reviews.length; // calculate the average rating

  return (
    <div className="reviews">
      {stars.map((star, index) => {
        // for each star, if the index is less than the average rating, render a yellow star, otherwise render a grey star
        return index < averageRating ? (
          <span key={index} className="star yellow">&#9733;</span>
        ) : (
          <span key={index} className="star grey">&#9733;</span>
        );
      })}
    </div>
  );
}

export default Reviews;