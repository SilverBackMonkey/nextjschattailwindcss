"use client";
import PlayButton from "@/components/PlayButton";
import { useEffect } from "react";
import "tw-elements/dist/css/tw-elements.min.css";


const LandingImage = () => {

    useEffect(() => {
        const init = async () => {
          const { Animate,  initTE } = await import("tw-elements");
          initTE({ Animate });
        }
        init();
      }, []);
    return (
        <div className="md:container mx-auto flex flex-wrap flex-col md:flex-row items-center ">
          <div className="flex flex-col sm:w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p 
                data-te-animation-init
                data-te-animation-start="onLoad"
                data-te-animation-reset="false"
                data-te-animation="[fade-in-down_1s_ease-in-out]"
                data-te-animation-delay="100"
                className="uppercase tracking-loose w-full">What business are you?</p>
            <h1 
                data-te-animation-init
                data-te-animation-start="onLoad"
                data-te-animation-reset="false"
                data-te-animation="[fade-in-down_1s_ease-in-out]"
                data-te-animation-delay="500"
                className="animate-fade-in animate-duration-1000 animate-delay-500 my-4 text-5xl font-bold leading-tight">
              Free Game Playing Today!
            </h1>
            <PlayButton title="Play Now" />
            </div>
            <div
                className="sm:w-full md:w-3/5 py-12 text-center">
                <img
                    data-te-animation-init
                    data-te-animation-reset="false"
                    data-te-animation-start="onLoad"
                    data-te-animation="[fade-in-right_1s_ease-in-out]"
                    data-te-animation-delay="100"
                    className="sm:w-full md:w-4/5 z-50 animate-fade-left animate-ease-out animate-delay-500" src="/t2.png" />
            </div>        
        </div>
        
    )
}

export default LandingImage;