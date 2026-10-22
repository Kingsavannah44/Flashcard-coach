/**
 * SM-2 Spaced Repetition Algorithm
 * Rating scale: 0=Blackout, 1=Wrong, 2=Wrong but familiar, 3=Correct (hard), 4=Correct, 5=Perfect
 */

const STORAGE_KEY = "azure_flashcard_progress";

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getCardState(progress, cardId) {
  return (
    progress[cardId] || {
      interval: 0,
      repetitions: 0,
      easeFactor: 2.5,
      nextReview: new Date().toISOString(),
      totalSeen: 0,
      correctStreak: 0,
      lastRating: null,
      history: [],
    }
  );
}

/**
 * Apply SM-2 algorithm after a rating
 * Returns updated card state
 */
export function applyRating(cardState, rating) {
  let { interval, repetitions, easeFactor, correctStreak, history } = cardState;

  const now = new Date();
  history = [...(history || []), { rating, date: now.toISOString() }].slice(-20);

  if (rating < 3) {
    // Failed — reset repetitions
    repetitions = 0;
    interval = 1;
    correctStreak = 0;
  } else {
    // Passed
    correctStreak += 1;
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Update ease factor (bounded between 1.3 and 2.5)
  easeFactor = Math.max(
    1.3,
    easeFactor + 0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02)
  );

  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    interval,
    repetitions,
    easeFactor: parseFloat(easeFactor.toFixed(2)),
    nextReview: nextReview.toISOString(),
    totalSeen: (cardState.totalSeen || 0) + 1,
    correctStreak,
    lastRating: rating,
    history,
  };
}

/**
 * Determine if a card is due for review
 */
export function isDue(cardState) {
  if (!cardState.nextReview) return true;
  return new Date(cardState.nextReview) <= new Date();
}

/**
 * Get mastery level label and color
 */
export function getMastery(cardState) {
  const { repetitions, easeFactor, correctStreak } = cardState;
  if (repetitions === 0) return { label: "New", color: "#6366f1", level: 0 };
  if (repetitions <= 1 || correctStreak < 2)
    return { label: "Learning", color: "#f59e0b", level: 1 };
  if (repetitions <= 3 || easeFactor < 2.0)
    return { label: "Reviewing", color: "#3b82f6", level: 2 };
  if (repetitions <= 6)
    return { label: "Familiar", color: "#10b981", level: 3 };
  return { label: "Mastered", color: "#22c55e", level: 4 };
}

/**
 * Compute global stats from all card states
 */
export function computeStats(progress, allCards) {
  const total = allCards.length;
  let mastered = 0;
  let familiar = 0;
  let learning = 0;
  let newCards = 0;
  let totalCorrect = 0;
  let totalAttempts = 0;
  let dueCount = 0;

  allCards.forEach((card) => {
    const state = getCardState(progress, card.id);
    const mastery = getMastery(state);

    if (mastery.level === 4) mastered++;
    else if (mastery.level === 3) familiar++;
    else if (mastery.level >= 1) learning++;
    else newCards++;

    if (isDue(state)) dueCount++;

    const history = state.history || [];
    totalAttempts += history.length;
    totalCorrect += history.filter((h) => h.rating >= 3).length;
  });

  const accuracy =
    totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  const streak = computeStreak(progress, allCards);

  return {
    total,
    mastered,
    familiar,
    learning,
    newCards,
    dueCount,
    accuracy,
    totalAttempts,
    streak,
  };
}

function computeStreak(progress, allCards) {
  // Gather all review dates across all cards
  const dates = new Set();
  allCards.forEach((card) => {
    const state = progress[card.id];
    if (!state) return;
    (state.history || []).forEach((h) => {
      dates.add(h.date.split("T")[0]);
    });
  });

  const sorted = Array.from(dates).sort().reverse();
  if (!sorted.length) return 0;

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;

  let streak = 0;
  let check = sorted[0] === today ? today : yesterday;

  for (const date of sorted) {
    if (date === check) {
      streak++;
      const prev = new Date(new Date(check).getTime() - 86400000);
      check = prev.toISOString().split("T")[0];
    } else {
      break;
    }
  }
  return streak;
}
