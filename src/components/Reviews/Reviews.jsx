import React, { useState } from "react";
import { Axios } from "../../../api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchProductWithComments } from "../../BaseURL/Product";

const Reviews = () => {
  const [review, setReview] = useState([]);
  const { data: reviewData = {} } = useQuery({
    queryKey: ["review"],
    queryFn: fetchProductWithComments,
  });
  const reviewList = reviewData.products || [];

  console.log("fff", reviewList);

  return (
    <div className="w-full p-4 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Customer Reviews
      </h2>
      <div className="space-y-4">
        {reviewList?.map((review, _id) => {
          return (
            <div key={id} className="bg-white p-4 shadow-md rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{review.name}</h3>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p>{review.rating}</p>
              <p className="text-gray-700 font-bold">{review.title}</p>
              <p className="text-gray-700">{review.commentText}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;
