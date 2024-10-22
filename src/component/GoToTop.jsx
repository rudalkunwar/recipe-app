import React, { useEffect, useState } from "react";
import "./goTop.css";
const GoToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
  
    const goToBtn = () => {
        console.log("first")
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
    const listenToScroll = () => {
      let heightToHidden = 70;
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
  
      if (winScroll > heightToHidden) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", listenToScroll);
      return () => window.removeEventListener("scroll", listenToScroll);
    }, []);

    return (
      <div className="work flex justify-center items-center relative z-40">
  {isVisible && (
    <button className="top-btn fixed right-5 bottom-[5%] z-10 bg-blue-500 p-1.5 sm:p-2 sm:right-7 rounded-full cursor-pointer flex justify-center items-center" onClick={goToBtn}>
      <img src="/arrowUp.png" alt="arrow" className="w-5 sm:w-6" />
    </button>
  )}
</div>
    )
};

export default GoToTop;