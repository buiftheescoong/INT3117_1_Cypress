import React, { useState, useEffect } from "react";
import styles from "./PlanItinerary.module.css";
import axios from "axios";

const PlanItinerary = () => {
  const [promotions, setPromotions] = useState([]);
    
  const fetchPromotions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/promotions/getAllPromotions"
      );
      setPromotions(response.data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);
  
  const cards = promotions.map((item, index) => ({
    id: index + 1,
    title: item.title,
    description: item.content,
    imageUrl: item.imageUrl,
  }));
  console.log(cards);

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 4;

  const handleNext = () => {
    if (currentIndex + cardsPerPage < cards.length) {
      setCurrentIndex(currentIndex + cardsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - cardsPerPage >= 0) {
      setCurrentIndex(currentIndex - cardsPerPage);
    }
  };

  const visibleCards = cards.slice(currentIndex, currentIndex + cardsPerPage);

  return (
    <div className={styles.container}>
      <h2 className="text-[35px] md:text-[50px] font-bold text-[#00008B]">Plan your journey</h2>
      <p className={styles.subtitle}>Some tips to start an amazing adventure with QAlines</p>
      <div className={styles.cardContainer}>
        {visibleCards.map((card) => (
          <div key={card.id} className={styles.card}>
            <img src={card.imageUrl} alt={card.title} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.navigation}>
        <button className="w-[45px] h-[45px] border-[1px] border-black flex justify-center items-center rounded-full hover:bg-black hover:text-white cursor-pointer transition duration-200 swiper-button-next" 
        onClick={handlePrev} disabled={currentIndex === 0} >
          &larr;
        </button>
        <button className="w-[45px] h-[45px] border-[1px] border-black flex justify-center items-center rounded-full hover:bg-black hover:text-white cursor-pointer transition duration-200 swiper-button-next"
          onClick={handleNext}
          disabled={currentIndex + cardsPerPage >= cards.length}
          
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default PlanItinerary;
