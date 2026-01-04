
import './App.css'


import { useState, useEffect } from "react";

function App() {
  const [hearts, setHearts] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  // Floating hearts animation
  useEffect(() => {
    const interval = setInterval(() => {
      const size = Math.random() * 30 + 15;
      const newHeart = {
        id: Math.random(),
        left: Math.random() * 100,
        size: size,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 3,
        color: ["#ff6b6b", "#ff8e8e", "#ff9ece", "#ffb3ba", "#ff69b4"][
          Math.floor(Math.random() * 5)
        ],
      };
      setHearts((prev) => [...prev.slice(-30), newHeart]); // keep max ~30 hearts
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const handleSurprise = () => {
    setShowMessage(true);
    // you can add confetti libraries later if you want ✨
  };

  return (
    <div className="birthday-page">
      {/* Floating hearts background */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            "--left": `${heart.left}vw`,
            "--size": `${heart.size}px`,
            "--duration": `${heart.duration}s`,
            "--delay": `${heart.delay}s`,
            color: heart.color,
          }}
        >
          ♥
        </div>
      ))}

      <div className="content-wrapper">
        <h1 className="title bounce">Happy Birthday Ridu! 🎉💕</h1>

        <div className="nickname-container">
          <span className="my-name">From your</span>
          <span className="heart-big">❤️</span>
          <span className="nickname">Abres</span>
        </div>

        <div className="date-reveal">
          <p className="special-date">7th January 2025 ✨</p>
        </div>

        {!showMessage ? (
          <button className="surprise-btn" onClick={handleSurprise}>
            Click for your surprise Ridu →
          </button>
        ) : (
          <div className="message-box fade-in">
            <p className="main-message">
              My sweetest Ridu,
              <br />
              You're my favorite notification,
              <br />
              my best view in the morning,
              <br />
              my safest place in every storm 🌸
            </p>

            <p className="second-message">
              Thank you for being you.
              <br />
              For laughing at my stupid jokes,
              <br />
              for stealing my heart,
              <br />
              for making every ordinary day feel like magic.
            </p>

            <p className="big-love">
              I LOVE YOU
              <br />
              more than yesterday
              <br />
              and less than tomorrow 💗
            </p>

            <div className="small-hearts">
              <span>💗</span>
              <span>💗</span>
              <span>💗</span>
              <span>💗</span>
              <span>💗</span>
            </div>
          </div>
        )}

        <div className="footer">
          <p>Made with lots of love just for you • 2025</p>
        </div>
      </div>
    </div>
  );
}

export default App;
