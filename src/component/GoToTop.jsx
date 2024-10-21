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
        <div className="work">
        {isVisible && (
        <button className="top-btn" onClick={goToBtn}>
          <img src="/arrowUp.png" alt="arrow" />
        </button>
      )}
        </div>
    )
};

export default GoToTop;