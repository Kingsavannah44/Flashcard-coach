import { computeStats } from "../hooks/useSM2";
import logoImg from "../assets/image.png";

export default function Header({
  progress,
  allCards,
  onShowDashboard,
  onReset,
  selectedCategory,
  onCategoryChange,
  categories,
}) {
  const stats = computeStats(progress, allCards);
  const masteryPct = Math.round(((stats.mastered + stats.familiar) / stats.total) * 100);

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">
          <img src={logoImg} alt="Flashcard Coach logo" className="logo-img" />
          <div>
            <span className="logo-title">Azure Flashcard Coach</span>
            <span className="logo-sub">Spaced Repetition · SM-2 Algorithm</span>
          </div>
        </div>
      </div>

      <div className="header-center">
        <select
          className="cat-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Select category"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="header-right">
        <div className="header-mini-stats">
          <div className="mini-stat">
            <span className="mini-val">{stats.dueCount}</span>
            <span className="mini-lbl">Due</span>
          </div>
          <div className="mini-divider" />
          <div className="mini-stat">
            <span className="mini-val">{masteryPct}%</span>
            <span className="mini-lbl">Mastery</span>
          </div>
          {stats.streak > 0 && (
            <>
              <div className="mini-divider" />
              <div className="mini-stat">
                <span className="mini-val">{stats.streak}🔥</span>
                <span className="mini-lbl">Streak</span>
              </div>
            </>
          )}
        </div>

        <button className="btn-progress" onClick={onShowDashboard}>
          📊 Stats
        </button>
        <button className="btn-reset" onClick={onReset} title="Reset all progress">
          ↺
        </button>
      </div>
    </header>
  );
}
