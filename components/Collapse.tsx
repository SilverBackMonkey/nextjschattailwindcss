"use client";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const Collapse = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div key = {props.data.id} className="flex flex-col">
      <div className="flex p-4 font-medium text-lg items-center justify-between md:text-2xl">
        {props.data.d.question}
        <FaAngleDown
          className="mx-4 text-lg font-thin"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div
        className={`w-full p-4 text-base font-medium my-6 text-justify md:text-2xl ${
          open ? "flex" : "hidden"
        }`}
      >
        {props.data.d.answer}
      </div>
    </div>
  );
};

export default Collapse;
