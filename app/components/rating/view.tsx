"use client";

import React, { useState } from "react";
import { useEffect, lazy } from "react";
const factoryRatingModal = () => import('../RatingModal');
const RatingModal = lazy(factoryRatingModal);
import SelectRating from "../SelectRating";
import RatingComponent from "../RatingComponent";

const RatingView = ({ authorId, type, parent, myRating, addRating }) => {
  const [rating, setRating] = useState(myRating);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [loading, setLoading] = useState(false);


  async function saveRating(rating) {
    if (!authorId) return;
    setRating(rating);
    let addedRating = await addRating(rating, type, parent, authorId);
  }

  return (
    <>
    {!loading && 
    <>
      <div className="flex flex-col items-center py-6 space-y-3">
        <RatingComponent rating={rating} />
        {rating == 0 && authorId && (
          <button
            className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 rounded-lg my-10 flex items-center justify-center"
            onClick={(e) => setShowRatingModal(true)}
          >
            Setting star rating...
          </button>
        )}
        {!authorId && <>You should sign in for star rating...</>}
      </div>
      <RatingModal
        show={showRatingModal}
        authorId={authorId}
        type={type}
        parentId={parent}
        setShow={setShowRatingModal}
        saveRating={saveRating}
      />
    </>}
    </>
  );
};

export { RatingView };
