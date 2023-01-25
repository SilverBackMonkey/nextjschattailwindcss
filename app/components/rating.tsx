"use client";

import React, { useState } from "react";
import { useEffect } from 'react';
import RatingModal from "./RatingModal";
import SelectRating from "./SelectRating";
import RatingComponent from "./RatingComponent";

const Rating = ({userId, type, parent, getRating, addRating}) => {  
  const [rating, setRating] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);
  
  useEffect(() => {
    async function fetchRating() {
      try {
        const initRating = await getRating(type, parent, userId);
        if(initRating)
          setRating(initRating);
        } catch (error) {
          console.error(error);
        }
    }
    fetchRating();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function saveRating(rating) {
    if(!userId) return;
    let addedRating = await addRating(rating, type, parent, userId);
    const rat = addedRating?.rating;
    if(rat) setRating(rat);
  }

  return <>
      <div className="flex flex-col items-center py-6 space-y-3">
        <RatingComponent rating={rating}/>
        {rating == 0 && userId && <button 
          className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 rounded-lg my-10 flex items-center justify-center" onClick={(e) => setShowRatingModal(true)}
          >
          Setting star rating...
        </button>}
        {!userId && <>You should sign in for star rating...</>}
      </div>
      <RatingModal
        show={showRatingModal}
        userId={userId}
        type={type}
        parentId={parent}
        setShow={setShowRatingModal}
        saveRating={saveRating}
        />
  </>;
};

export default Rating;
