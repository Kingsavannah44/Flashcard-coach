import { computeStats } from "../hooks/useSM2";

export default function SessionComplete({ progress, allCards, sessionStats, onRestart, onShowDashboard }) {
  const global = computeStats(progress, allCards);

  const { reviewed, correct, skipped } = sessionStats;
  const sessionAccuracy = reviewed > 0 ? Math.round((correct / reviewed) * 100) : 0;

  const getMessage = () => {
    if (sessionAccuracy === 100) return { emoji: "🏆", text: "Flawless! You absolutely crushed it." };
    if (sessionAccuracy >= 80) return { emoji: "🎯", text: "Great session! You're getting there." };
    if (sessionAccuracy >= 60) return { emoji: "📈", text: "Solid progress. Keep pushing!" };
    return { emoji: "💪", text: "Every attempt builds memory. Come back tomorrow!" };
  };

  const msg = getMessage();

  return (
    <div className="session-complete">
      <div className="complete-card">
        <div className="complete-emoji">{msg.emoji}</div>
        <h2 className="complete-title">Session Complete!</h2>
        <p className="complete-msg">{msg.text}</p>

        <div className="session-stats-grid">
          <div className="session-stat">
            <span className="ssval">{reviewed}</span>
            <span className="sslbl">Reviewed</span>
          </div>
          <div className="session-stat">
            <span className="ssval green">{correct}</span>
            <span className="sslbl">Correct</span>
          </div>
          <div className="session-stat">
            <span className="ssval red">{reviewed - correct}</span>
            <span className="sslbl">Missed</span>
          </div>
          <div className="session-stat">
            <span className="ssval">{sessionAccuracy}%</span>
            <span className="sslbl">Accuracy</span>
          </div>
        </div>

        <div className="global-progress-wrap">
          <span className="global-label">Overall Mastery</span>
          <div className="global-bar-bg">
            <div
              className="global-bar-fill"
              style={{
                width: `${Math.round(((global.mastered + global.familiar) / global.total) * 100)}%`,
              }}
            />
          </div>
          <span className="global-pct">
            {global.mastered + global.familiar} / {global.total} cards
          </span>
        </div>

        <div className="complete-actions">
          <button className="btn-primary" onClick={onRestart}>
            🔄 Study Again
          </button>
          <button className="btn-secondary" onClick={onShowDashboard}>
            📊 View Progress
          </button>
        </div>

        {global.dueCount > 0 && (
          <p className="due-note">
            ⏰ You have <strong>{global.dueCount}</strong> cards due for review.
          </p>
        )}
      </div>
    </div>
  );
}
