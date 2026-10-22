import { useState, useEffect } from "react";
import { getMastery } from "../hooks/useSM2";

export default function FlashCard({ card, cardState, onRate, onSkip }) {
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [exitDir, setExitDir] = useState(null);

  // Reset flip when card changes
  useEffect(() => {
    setFlipped(false);
    setExitDir(null);
    setAnimating(false);
  }, [card.id]);

  const mastery = getMastery(cardState);

  function handleFlip() {
    if (animating) return;
    setFlipped((f) => !f);
  }

  function handleRate(rating) {
    if (animating) return;
    setAnimating(true);
    setExitDir(rating >= 3 ? "right" : "left");
    setTimeout(() => {
      onRate(rating);
      setAnimating(false);
      setExitDir(null);
    }, 400);
  }

  const exitClass = exitDir === "right" ? "exit-right" : exitDir === "left" ? "exit-left" : "";

  return (
    <div className={`card-wrapper ${exitClass}`}>
      {/* Mastery badge */}
      <div className="mastery-badge" style={{ background: mastery.color }}>
        {mastery.label}
      </div>

      {/* Category pill */}
      <div className="category-pill">{card.category}</div>

      {/* The 3D flip card */}
      <div
        className={`flip-card ${flipped ? "flipped" : ""}`}
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleFlip()}
        aria-label={flipped ? "Card answer, click to flip back" : "Card question, click to reveal answer"}
      >
        <div className="flip-card-inner">
          {/* FRONT */}
          <div className="flip-card-front">
            <div className="card-face-content">
              <span className="face-label">QUESTION</span>
              <p className="card-question">{card.question}</p>
              <span className="flip-hint">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 4v6h6M23 20v-6h-6"/>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                </svg>
                Click to reveal
              </span>
            </div>
          </div>

          {/* BACK */}
          <div className="flip-card-back">
            <div className="card-face-content">
              <span className="face-label answer-label">ANSWER</span>
              <p className="card-answer">{card.answer}</p>
              {card.tags && (
                <div className="tag-row">
                  {card.tags.map((t) => (
                    <span key={t} className="tag">#{t}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rating buttons — only shown after flip */}
      <div className={`rating-row ${flipped ? "visible" : ""}`}>
        <button className="rate-btn rate-bad" onClick={() => handleRate(1)} title="Didn't know it">
          <span className="rate-icon">✕</span>
          <span>Missed it</span>
        </button>
        <button className="rate-btn rate-ok" onClick={() => handleRate(3)} title="Got it with effort">
          <span className="rate-icon">〜</span>
          <span>Almost</span>
        </button>
        <button className="rate-btn rate-good" onClick={() => handleRate(4)} title="Knew it well">
          <span className="rate-icon">✓</span>
          <span>Got it</span>
        </button>
        <button className="rate-btn rate-perfect" onClick={() => handleRate(5)} title="Perfect recall">
          <span className="rate-icon">★</span>
          <span>Perfect</span>
        </button>
      </div>

      <button className="skip-btn" onClick={onSkip}>
        Skip for now →
      </button>
    </div>
  );
}
