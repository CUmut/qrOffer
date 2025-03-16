import React, { useState, useEffect } from 'react';
import './IntroPage.css';

const IntroPage = ({ onContinue }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Sayfa yüklendiğinde animasyonu başlat
    setIsAnimating(true);
  }, []);

  return (
    <div className="intro-container">
      <div className={`intro-content ${isAnimating ? 'animate' : ''}`}>
        <h1>Sana Özel Bir Davetim Var</h1>
        <p>Küçük bir sürpriz hazırladım. Hazır mısın?</p>
        
        <div className="disclaimer-box">
          <p className="disclaimer-text">
            <strong>Not:</strong> Bu davet sadece ÖZEL olduğu düşünülen bir kişi için bir defaya mahsus olmak üzere özel olarak hazırlandı. Evli veya ilişkisi olması durumunda bu davet yok sayılmalıdır !
          </p>
        </div>
        
        <button 
          className="intro-button"
          onClick={onContinue}
        >
          <span>Sürprizi Göster</span>
        </button>
      </div>
    </div>
  );
};

export default IntroPage; 