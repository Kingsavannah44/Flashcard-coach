import { useState, useCallback, useEffect } from "react";
import { azureCards, categories } from "./data/azureCards";
import {
  loadProgress,
  saveProgress,
  clearProgress,
  getCardState,
  applyRating,
  isDue,
  computeStats,
} from "./hooks/useSM2";
import FlashCard from "./components/FlashCard";
import ProgressDashboard from "./components/ProgressDashboard";
import Header from "./components/Header";
import SessionComplete from "./components/SessionComplete";
import "./App.css";

function buildQueue(cards, progress) {
  const due = [];
  const newCards = [];

  cards.forEach((card) => {
    const state = getCardState(progress, card.id);
    if (state.totalSeen === 0) {
      newCards.push(card);
    } else if (isDue(state)) {
      due.push(card);
    }
  });

  shuffle(due);
  shuffle(newCards);

  return [...due, ...newCards];
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export default function App() {
  const [progress, setProgress] = useState(() => loadProgress());
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showDashboard, setShowDashboard] = useState(false);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0, skipped: 0 });
  const [sessionDone, setSessionDone] = useState(false);

  const getFilteredCards = (cat) =>
    cat === "All" ? azureCards : azureCards.filter((c) => c.category === cat);

  const filteredCards = getFilteredCards(selectedCategory);

  const [queue, setQueue] = useState(() => buildQueue(filteredCards, loadProgress()));
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCard = queue[currentIndex] || null;
  const currentState = currentCard ? getCardState(progress, currentCard.id) : null;

  // ── Keyboard shortcuts ─────────────────────────────────────────────
  useEffect(() => {
    function handleKey(e) {
      if (showDashboard) {
        if (e.key === "Escape") setShowDashboard(false);
        return;
      }
      // 1-4 for ratings (only meaningful when shown — FlashCard handles display)
      // p = open progress
      if (e.key === "p" || e.key === "P") setShowDashboard(true);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showDashboard]);

  function handleCategoryChange(cat) {
    setSelectedCategory(cat);
    const cards = getFilteredCards(cat);
    const newQueue = buildQueue(cards, progress);
    setQueue(newQueue);
    setCurrentIndex(0);
    setSessionDone(false);
    setSessionStats({ reviewed: 0, correct: 0, skipped: 0 });
  }

  const handleRate = useCallback(
    (rating) => {
      if (!currentCard) return;

      const oldState = getCardState(progress, currentCard.id);
      const newState = applyRating(oldState, rating);
      const newProgress = { ...progress, [currentCard.id]: newState };

      setProgress(newProgress);
      saveProgress(newProgress);

      setSessionStats((s) => ({
        reviewed: s.reviewed + 1,
        correct: s.correct + (rating >= 3 ? 1 : 0),
        skipped: s.skipped,
      }));

      const nextIndex = currentIndex + 1;
      if (nextIndex >= queue.length) {
        setSessionDone(true);
      } else {
        setCurrentIndex(nextIndex);
      }
    },
    [currentCard, currentIndex, queue.length, progress]
  );

  const handleSkip = useCallback(() => {
    if (!currentCard) return;
    const newQueue = [...queue];
    const [skipped] = newQueue.splice(currentIndex, 1);
    newQueue.push(skipped);
    setQueue(newQueue);
    setSessionStats((s) => ({ ...s, skipped: s.skipped + 1 }));
  }, [currentCard, currentIndex, queue]);

  function handleReset() {
    if (!confirm("Reset all progress? This cannot be undone.")) return;
    clearProgress();
    const fresh = {};
    setProgress(fresh);
    const cards = getFilteredCards(selectedCategory);
    const newQueue = buildQueue(cards, fresh);
    setQueue(newQueue);
    setCurrentIndex(0);
    setSessionDone(false);
    setSessionStats({ reviewed: 0, correct: 0, skipped: 0 });
  }

  function handleRestart() {
    const cards = getFilteredCards(selectedCategory);
    let newQueue = buildQueue(cards, progress);
    if (newQueue.length === 0) {
      // All caught up — do a full review shuffle
      newQueue = [...cards];
      shuffle(newQueue);
    }
    setQueue(newQueue);
    setCurrentIndex(0);
    setSessionDone(false);
    setSessionStats({ reviewed: 0, correct: 0, skipped: 0 });
  }

  const stats = computeStats(progress, filteredCards);
  const totalInQueue = queue.length;
  const progressPct = totalInQueue > 0 ? Math.round((currentIndex / totalInQueue) * 100) : 100;

  return (
    <div className="app">
      <Header
        progress={progress}
        allCards={azureCards}
        onShowDashboard={() => setShowDashboard(true)}
        onReset={handleReset}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories}
      />

      <main className="main-content">
        {!sessionDone && currentCard ? (
          <>
            <div className="session-progress-wrap">
              <div className="session-progress-info">
                <span>Card {currentIndex + 1} of {totalInQueue}</span>
                <span>{stats.dueCount} due · {stats.mastered} mastered · Press <kbd>P</kbd> for stats</span>
              </div>
              <div className="session-bar-bg">
                <div
                  className="session-bar-fill"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <FlashCard
              key={`${currentCard.id}-${currentIndex}`}
              card={currentCard}
              cardState={currentState}
              onRate={handleRate}
              onSkip={handleSkip}
            />
          </>
        ) : sessionDone ? (
          <SessionComplete
            progress={progress}
            allCards={filteredCards}
            sessionStats={sessionStats}
            onRestart={handleRestart}
            onShowDashboard={() => setShowDashboard(true)}
          />
        ) : (
          <div className="empty-state">
            <div className="empty-emoji">🎉</div>
            <h2>You're all caught up!</h2>
            <p>No cards due in this category. Come back tomorrow or review all cards again.</p>
            <button className="btn-primary" onClick={handleRestart}>
              Review All Cards
            </button>
          </div>
        )}
      </main>

      {showDashboard && (
        <ProgressDashboard
          progress={progress}
          allCards={azureCards}
          onClose={() => setShowDashboard(false)}
        />
      )}
    </div>
  );
}
