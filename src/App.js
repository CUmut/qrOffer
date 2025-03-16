import React, { useState } from 'react';
import './App.css';
import IntroPage from './IntroPage';

const App = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showMainPage, setShowMainPage] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedOption) {
      setError('Lütfen bir seçenek seçin!');
      return;
    }
    
    if (selectedOption === '2' && !rejectionReason.trim()) {
      setError('Lütfen bir ret nedeni girin!');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    // Seçenek değerlerini daha anlamlı metinlere dönüştürme
    let optionText = '';
    if (selectedOption === '1') optionText = 'Evet, Çok İsterim! ☕';
    else if (selectedOption === '2') optionText = 'Hayır, Teşekkürler 😔';
    else if (selectedOption === '3') optionText = 'Kesinlikle! 🥰';

    try {
      // Formspree'ye form gönderimi
      const response = await fetch('https://formspree.io/f/xjkykrej', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          option: optionText,
          rejectionReason: rejectionReason || 'Belirtilmedi',
          date: new Date().toLocaleString('tr-TR')
        })
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setIsSubmitting(false);
      } else {
        throw new Error('Form gönderimi başarısız');
      }
    } catch (error) {
      console.error('Form gönderilirken hata oluştu:', error);
      setError('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      setIsSubmitting(false);
    }
  };

  if (!showMainPage) {
    return <IntroPage onContinue={() => setShowMainPage(true)} />;
  }

  if (isSubmitted) {
    return (
      <div className="container success-container">
        <div className="success-icon">✓</div>
        <h1>Teşekkürler!</h1>
        <p>Cevabınız başarıyla iletildi.</p>
        
        {selectedOption === '1' || selectedOption === '3' ? (
          <strong>Beni nerede bulacağını çok iyi biliyorsun! En kısa sürede görüşmek üzere.</strong>
        ) : (
          <p>Belki başka bir zaman buluşabiliriz.</p>
        )}
        
        <button className="back-button" onClick={() => window.location.reload()}>
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Benimle Kahve İçmeye Var mısın?</h1>
      
      <div className="disclaimer-box">
        <p className="disclaimer-text">
        <strong>Not:</strong> Bu davet sadece ÖZEL olduğu düşünülen bir kişi için bir defaya mahsus olmak üzere özel olarak hazırlandı. Evli veya ilişkisi olması durumunda bu davet yok sayılmalıdır !
        </p>
      </div>
      
      <form id="contact-form" onSubmit={handleSubmit}>
        <div className="options">
          <div 
            className={`option ${selectedOption === '1' ? 'selected' : ''}`}
            onClick={() => handleOptionChange('1')}
          >
            <h2>Evet, Çok İsterim! ☕</h2>
            <p>Seninle kahve içmek harika olur!</p>
          </div>
          
          <div 
            className={`option ${selectedOption === '2' ? 'selected' : ''}`}
            onClick={() => handleOptionChange('2')}
          >
            <h2>Hayır, Teşekkürler 😔</h2>
            <p>Maalesef şu an uygun değilim.</p>
          </div>
          
          <div 
            className={`option ${selectedOption === '3' ? 'selected' : ''}`}
            onClick={() => handleOptionChange('3')}
          >
            <h2>Kesinlikle! 🥰</h2>
            <p>Kahve değil, akşam yemeği bile olur!</p>
          </div>
        </div>
        
        {selectedOption === '2' && (
          <div className="rejection-reason">
            <label htmlFor="rejectionReason">Neden olmasın? (Lütfen belirtin)</label>
            <textarea
              id="rejectionReason"
              name="rejectionReason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Nedenini paylaşmak ister misin?"
              required
            />
          </div>
        )}
        
        {error && <div className="error">{error}</div>}
        
        <button 
          className="submit-button" 
          type="submit"
          disabled={isSubmitting || !selectedOption}
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Cevabımı Gönder'}
        </button>
      </form>
    </div>
  );
};

export default App; 