import { computeStats, getMastery, getCardState, isDue } from "../hooks/useSM2";
import { categories } from "../data/azureCards";

export default function ProgressDashboard({ progress, allCards, onClose }) {
  const stats = computeStats(progress, allCards);

  const masterySegments = [
    { label: "Mastered", count: stats.mastered, color: "#22c55e" },
    { label: "Familiar", count: stats.familiar, color: "#10b981" },
    { label: "Reviewing", count: stats.learning, color: "#3b82f6" },
    { label: "New", count: stats.newCards, color: "#6366f1" },
  ];

  // Per-category breakdown
  const catStats = categories.map((cat) => {
    const cards = allCards.filter((c) => c.category === cat);
    const masteredCount = cards.filter((c) => {
      const s = getCardState(progress, c.id);
      return getMastery(s).level >= 3;
    }).length;
    const pct = Math.round((masteredCount / cards.length) * 100);
    return { cat, total: cards.length, mastered: masteredCount, pct };
  });

  return (
    <div className="dashboard-overlay" onClick={onClose}>
      <div className="dashboard-panel" onClick={(e) => e.stopPropagation()}>
        <div className="dashboard-header">
          <h2>📊 Your Progress</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close dashboard">✕</button>
        </div>

        {/* Top stats row */}
        <div className="stat-grid">
          <StatCard value={stats.total} label="Total Cards" icon="🃏" color="#6366f1" />
          <StatCard value={stats.mastered} label="Mastered" icon="🏆" color="#22c55e" />
          <StatCard value={`${stats.accuracy}%`} label="Accuracy" icon="🎯" color="#3b82f6" />
          <StatCard value={stats.dueCount} label="Due Now" icon="⏰" color="#f59e0b" />
          <StatCard value={stats.totalAttempts} label="Reviews Done" icon="📝" color="#ec4899" />
          <StatCard value={`${stats.streak}🔥`} label="Day Streak" icon="" color="#f97316" />
        </div>

        {/* Mastery donut */}
        <div className="section-title">Overall Mastery</div>
        <div className="mastery-bar-wrapper">
          <div className="mastery-stacked-bar">
            {masterySegments.map((seg) => {
              const pct = (seg.count / stats.total) * 100;
              return pct > 0 ? (
                <div
                  key={seg.label}
                  className="bar-segment"
                  style={{ width: `${pct}%`, background: seg.color }}
                  title={`${seg.label}: ${seg.count}`}
                />
              ) : null;
            })}
          </div>
          <div className="mastery-legend">
            {masterySegments.map((seg) => (
              <div key={seg.label} className="legend-item">
                <span className="legend-dot" style={{ background: seg.color }} />
                <span>{seg.label} ({seg.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Per category */}
        <div className="section-title">Progress by Category</div>
        <div className="cat-list">
          {catStats.map(({ cat, total, mastered, pct }) => (
            <div key={cat} className="cat-row">
              <div className="cat-info">
                <span className="cat-name">{cat}</span>
                <span className="cat-count">{mastered}/{total}</span>
              </div>
              <div className="cat-bar-bg">
                <div
                  className="cat-bar-fill"
                  style={{
                    width: `${pct}%`,
                    background: pct === 100 ? "#22c55e" : pct >= 60 ? "#10b981" : pct >= 30 ? "#3b82f6" : "#6366f1",
                  }}
                />
              </div>
              <span className="cat-pct">{pct}%</span>
            </div>
          ))}
        </div>

        {stats.totalAttempts === 0 && (
          <p className="no-data">Start reviewing cards to see your stats here!</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ value, label, icon, color }) {
  return (
    <div className="stat-card" style={{ borderTopColor: color }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-value" style={{ color }}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
