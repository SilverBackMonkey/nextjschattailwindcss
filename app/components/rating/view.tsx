"use client";

import React, { useState } from "react";
import { useEffect, lazy } from "react";
const factoryRatingModal = () => import('../RatingModal');
const RatingModal = lazy(factoryRatingModal);
import SelectRating from "../SelectRating";
import RatingComponent from "../RatingComponent";
import { useSession } from "next-auth/react";

const RatingView = ({ type, parent, myRating, addRating }) => {
  const [rating, setRating] = useState(myRating);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  const userEmail = session?.user?.email;

  async function saveRating(rating) {
    if (!userEmail) return;
    setRating(rating);
    if(userEmail)
      await addRating(rating, type, parent);
  }

  return (
    <>
    {!loading && 
    <>
      <div className="flex flex-col items-center py-6 space-y-3">
        <RatingComponent rating={rating} />
        {rating == 0 && userEmail && (
          <button
            className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 rounded-lg my-10 flex items-center justify-center"
            onClick={(e) => setShowRatingModal(true)}
          >
            Setting star rating...
          </button>
        )}
        {!userEmail && <>You should sign in for star rating...</>}
      </div>
      <RatingModal
        show={showRatingModal}
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
