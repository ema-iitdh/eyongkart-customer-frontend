import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { fetchProductWithComments } from "../../BaseURL/Product";
import { useParams } from "react-router-dom";
import { Rating } from "@mantine/core";

const Reviews = () => {
  const { productId } = useParams();
  const { data: reviewData = {} } = useQuery({
    queryKey: ["review", productId],
    queryFn: () => fetchProductWithComments(productId),
  });

  const commentRatings = reviewData.commentRating || [];

  // Ensure the filter works properly by checking if the productId exists
  const filteredComments = commentRatings?.filter(
    (comment) => comment?.productId?._id === productId
  );

  return (
    <div className="w-full p-4 bg-gray-100">
      <h2 className="sm:text-2xl font-bold text-gray-800 text-center mb-6">
        Customer Reviews
      </h2>
      <div>
        {(filteredComments?.length || 0) === 0 ? (
          <div className="flex flex-col items-center py-10 bg-white shadow-md rounded-lg border border-gray-200">
            <h3 className="text-gray-600 text-lg font-medium">
              No reviews yet
            </h3>
            <p className="text-gray-500 mt-2 text-sm text-center max-w-md">
              It looks like this product hasn’t received any reviews yet. Be the
              first to share your thoughts and help others make informed
              decisions.
            </p>
            <button
              type="button"
              className="mt-4 px-6 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition-all"
            >
              Write a Review
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComments?.map((review) => {
              return (
                <div
                  key={review._id}
                  className="bg-white p-4 shadow-md rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-2">
                      <BsFillPersonFill size={20} color="red" />
                      <h3 className="font-semibold text-gray-900">
                        {review.userId?.userName || "Anonymous"}
                      </h3>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Rating
                    value={review.ratings?.[0]?.rating || 0}
                    fractions={2}
                  />
                  <p className="text-gray-700 font-bold text-[15px]">
                    {review.title}
                  </p>
                  <p className="text-gray-700 text-[12px] sm:text-[15px]">
                    {review.commentText}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
