"use client";
import {
    FaChevronCircleDown,
    FaChevronCircleUp,
  } from "react-icons/fa";
import React, { useState } from "react";
export default function ShowTermsLink(d, bonusTerms) {
    const [showTerms, setShowTerms] = useState<boolean>(false);
  return (
    <>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setShowTerms(showTerms === d.id ? "" : d.id)}
      >
        <p className="mr-2 select-none">Bonus Details </p>
        {showTerms === d.id ? <FaChevronCircleUp /> : <FaChevronCircleDown />}
      </div>
      {showTerms === d.id && (
        <div className="flex pt-3 text-sm">
          <h6>{bonusTerms}</h6>
        </div>
      )}
    </>
  );
}
