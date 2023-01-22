import React from "react";
import { FcBusinessman } from "react-icons/fc";
import { RiMailLine } from "react-icons/ri"; 
import { AiFillLinkedin } from "react-icons/ai";


const Author = (props) => {
  
  return (
    <div id="author" className="flex flex-col border border-gray-200 p-3 rounded-lg">
      <h5 className="text-base">ABOUT THE AUTHOR</h5>
      <div className="flex items-center">
        <div>
          <FcBusinessman className="text-6xl" />
        </div>
        <div className="flex flex-col">
          <h5 className="text-3xl">{props.data.author}</h5>
          <div className="flex text-sm space-x-4 my-2">
            <span className="flex items-center">
              <RiMailLine />
              Email
            </span>
            <span className="flex items-center">
              <AiFillLinkedin />
              Linkedin
            </span>
          </div>
        </div>
      </div>
      <p className="my-6">
        {props.data.authorText}
      </p>
    </div>
  );
};
export default Author;
