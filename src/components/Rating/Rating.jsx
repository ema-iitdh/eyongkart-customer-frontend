import React from "react";
import { useProductWithComments } from "../../BaseURL/Product";

const Rating = ({ productId }) => {
  const { data } = useProductWithComments(productId);

  const { product, comments } = data;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Display comments */}
      <div>
        <h2>Comments</h2>
        {comments?.map((comment) => (
          <div key={comment._id}>
            {/* <p>
              {comment.name}: {comment.commentText}
            </p> */}
            <p>Rating: {comment.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rating;
