import React from "react";
import Collapse from "./Collapse";
import { FaAngleDown } from "react-icons/fa";
const Faq = (props: any) => {

 
  if (!props?.data[0]?.question?.length) {
    
  }
  const faq = props.data
  return (
    <div id="faq" className="scroll-mt-40">
      <h5 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
        Frequently asked questions
      </h5>

      {faq.map(function (d, id) {
        const data = { d, id };
        return (
          <React.Fragment key={id}>
            <hr className="border-sky-700 dark:border-white" />
            <Collapse
              down={<FaAngleDown className="mx-4 text-lg font-thin" />}
              data={data.d}
            />
          </React.Fragment>
        );
      })}
      <hr className="border-sky-700 dark:border-white my-7"></hr>
    </div>
  );
};
export default Faq;
