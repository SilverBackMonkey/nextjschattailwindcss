"use client";
import { useState } from "react";
import { BsSquare, BsCheckSquare } from "react-icons/bs";

const CustomeCheBox = ({ title, id }) => {
  const [check, setCheck] = useState("");
  return (
    <div
      className="flex items-center  cursor-pointer pt-2"
      onClick={() => setCheck(check === id ? "" : id)}
    >
      {check === id ? (
        <BsCheckSquare className="text-[#0369a1]" />
      ) : (
        <BsSquare className="" />
      )}
      <span className="pl-2">{title}</span>
    </div>
  );
};
export default CustomeCheBox;
