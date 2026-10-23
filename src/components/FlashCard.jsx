import { useState, useEffect } from "react";
import { getMastery } from "../hooks/useSM2";

// ── Prompt Engineering Layer ────────────────────────────────────────────────
// Structured prompts engineered for retention: Define → Analogy → Exam Hook
function generateHint(card) {
  return {
    prompt: `You are an Azure study coach helping someone prepare for AZ-900.\n\nExplain "${card.question.replace("?","")}" using exactly this structure:\n1. ONE-LINE DEFINITION: Plain English, no jargon\n2. REAL-WORLD ANALOGY: Compare it to something from everyday life\n3. EXAM HOOK: The single fact most likely to appear on AZ-900`,
    response: buildHintResponse(card),
  };
}

function buildHintResponse(card) {
  // Pre-engineered responses for each card using the Define→Analogy→Exam Hook pattern
  const hints = {
    "What is an Azure Region?":
      "📌 A geographic area containing one or more Azure datacenters connected by a fast network.\n🌍 Think of it like a city — Azure has 'cities' (regions) around the world, and you pick which city hosts your app.\n🎯 Exam hook: Regions provide data residency and compliance boundaries. You choose a region when creating any resource.",
    "What is an Availability Zone?":
      "📌 Physically separate buildings within one region, each with their own power, cooling, and network.\n🌍 Like having three separate bank vaults in the same city — if one burns down, the others are fine.\n🎯 Exam hook: AZs protect against datacenter-level failures. Not all regions have AZs.",
    "What is a Resource Group?":
      "📌 A logical container that holds related Azure resources so you can manage them together.\n🌍 Like a project folder on your desktop — everything for one project lives in one place.\n🎯 Exam hook: Resources in a group share the same lifecycle. Deleting a resource group deletes everything in it.",
    "What is the Azure Resource Manager (ARM)?":
      "📌 The management layer that handles ALL requests to create, update, or delete Azure resources.\n🌍 Like a hotel front desk — every request (booking, cancelling, upgrading) goes through one central point.\n🎯 Exam hook: ARM provides consistent RBAC, tagging, and logging regardless of which tool you use (portal, CLI, SDK).",
    "What is a Subscription in Azure?":
      "📌 A billing and access boundary — resources are created inside a subscription and billed to it.\n🌍 Like a mobile phone plan — your account (subscription) determines what services you can use and who pays.\n🎯 Exam hook: Every Azure resource must belong to exactly one subscription.",
    "What are Azure Management Groups?":
      "📌 Containers that let you apply policies and access controls across multiple subscriptions at once.\n🌍 Like a school district managing multiple schools — rules applied to the district apply to all schools.\n🎯 Exam hook: Management Groups sit above subscriptions in the hierarchy: Management Group → Subscription → Resource Group → Resource.",
    "What is Azure Virtual Machine (VM)?":
      "📌 An on-demand computer in the cloud where you control the OS, software, and configuration.\n🌍 Like renting a physical computer but hosted in Microsoft's datacenter — you manage everything on it.\n🎯 Exam hook: VMs are IaaS. You manage the OS and above; Microsoft manages the hardware.",
    "What is Azure App Service?":
      "📌 A managed platform for hosting web apps without dealing with the underlying server.\n🌍 Like renting a furnished apartment vs. buying a house — you just bring your code, Azure handles the building.\n🎯 Exam hook: App Service is PaaS. Supports .NET, Node, Java, Python, PHP. Auto-scales and patches itself.",
    "What is Azure Kubernetes Service (AKS)?":
      "📌 A managed service for running containerised applications using Kubernetes.\n🌍 Like hiring a shipping company to manage your cargo containers — you load the containers, they handle logistics.\n🎯 Exam hook: AKS is managed Kubernetes. Azure manages the control plane for free; you pay for agent nodes.",
    "What is Azure Functions?":
      "📌 Serverless compute — you write small code functions, Azure runs them and charges per execution.\n🌍 Like a vending machine — you don't need to staff it, it just runs when someone puts money in.\n🎯 Exam hook: Functions are event-driven (HTTP, Timer, Blob, Queue triggers). You pay only when code runs.",
    "What is Azure Blob Storage?":
      "📌 Object storage for any unstructured data — files, images, videos, backups, logs.\n🌍 Like a massive filing cabinet in the cloud that can hold any type of file in any size.\n🎯 Exam hook: Three tiers — Hot (frequent access), Cool (infrequent), Archive (rare). Moving between tiers changes cost.",
    "What is an Azure Virtual Network (VNet)?":
      "📌 A private network in Azure where your resources communicate securely with each other.\n🌍 Like the internal wiring in an office building — staff can talk to each other without going through the public internet.\n🎯 Exam hook: VNets are regional. To connect VNets across regions, use VNet Peering.",
    "What is a Network Security Group (NSG)?":
      "📌 A firewall-like set of rules that controls what traffic can flow in and out of Azure resources.\n🌍 Like a bouncer at a club with a list — only approved traffic (by IP, port, protocol) gets in.\n🎯 Exam hook: Rules have priority numbers — lower number = higher priority. Applied at subnet or NIC level.",
    "What is Microsoft Entra ID (formerly Azure Active Directory)?":
      "📌 Microsoft's cloud identity service — manages who can log in and what they can access.\n🌍 Like the company receptionist who checks your badge before letting you through the door.\n🎯 Exam hook: Entra ID handles authentication (who you are). RBAC handles authorization (what you can do).",
    "What is Role-Based Access Control (RBAC)?":
      "📌 A system that controls who can do what to which Azure resources.\n🌍 Like job titles in a company — a Manager can approve expenses, a Staff member can only submit them.\n🎯 Exam hook: Three built-in roles: Owner (full access), Contributor (no access management), Reader (view only).",
    "What is Azure Key Vault?":
      "📌 A secure, managed store for secrets, API keys, passwords, certificates, and encryption keys.\n🌍 Like a bank safe — instead of keeping your valuables at home (in code), you lock them in a vault.\n🎯 Exam hook: Key Vault eliminates hardcoded secrets in code. Use Managed Identity to access it without passwords.",
    "What is Microsoft Defender for Cloud?":
      "📌 A security monitoring tool that checks your Azure setup for vulnerabilities and threats.\n🌍 Like a home security system — it watches everything and alerts you if something looks wrong.\n🎯 Exam hook: Gives you a Secure Score (0–100). Higher score = better security posture.",
    "What is Azure Monitor?":
      "📌 The central service for collecting and analysing metrics and logs from all Azure resources.\n🌍 Like the dashboard on a car — shows you speed, fuel, temperature all in one place.\n🎯 Exam hook: Azure Monitor feeds into Log Analytics (for querying) and Alerts (for notifications).",
    "What is Azure SQL Database?":
      "📌 A fully managed relational database based on SQL Server — no patching or backups needed.\n🌍 Like hiring a DBA who handles all maintenance — you just query the database.\n🎯 Exam hook: Azure SQL is PaaS. Microsoft handles patching, HA, and backups automatically.",
    "What is Azure Cosmos DB?":
      "📌 A globally distributed NoSQL database that can replicate data worldwide with very low latency.\n🌍 Like having copies of a book in every library around the world — readers get it from their nearest branch.\n🎯 Exam hook: Cosmos DB guarantees single-digit millisecond latency. Supports multiple APIs (SQL, MongoDB, etc).",
    "What is Azure Policy?":
      "📌 Rules that enforce standards across your Azure resources — can audit or block non-compliant resources.\n🌍 Like a building code inspector — ensures all buildings (resources) meet required standards.\n🎯 Exam hook: Policies can Audit (flag), Deny (block), or DeployIfNotExists (auto-fix) non-compliant resources.",
  };

  return (
    hints[card.question] ||
    `📌 ${card.answer.split(".")[0]}.\n🌍 Think of it as a building block in Azure's infrastructure — each service solves a specific problem.\n🎯 Exam hook: ${card.tags ? "Key terms to remember: " + card.tags.join(", ") : "Review this concept carefully for AZ-900."}`
  );
}

export default function FlashCard({ card, cardState, onRate, onSkip }) {
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [exitDir, setExitDir] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [lastRating, setLastRating] = useState(null);

  // Reset when card changes
  useEffect(() => {
    setFlipped(false);
    setExitDir(null);
    setAnimating(false);
    setShowHint(false);
    setLastRating(null);
  }, [card.id]);

  const mastery = getMastery(cardState);
  const hint = generateHint(card);

  function handleFlip() {
    if (animating) return;
    setFlipped((f) => !f);
  }

  function handleRate(rating) {
    if (animating) return;
    setLastRating(rating);

    // Show hint briefly for missed cards before advancing
    if (rating <= 2 && !showHint) {
      setShowHint(true);
      return; // Don't advance yet — let them read the hint first
    }

    setAnimating(true);
    setExitDir(rating >= 3 ? "right" : "left");
    setTimeout(() => {
      onRate(rating);
      setAnimating(false);
      setExitDir(null);
    }, 400);
  }

  function handleRateFromHint(rating) {
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
        onClick={!showHint ? handleFlip : undefined}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => !showHint && e.key === "Enter" && handleFlip()}
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

      {/* AI Hint Panel — shown when card is missed */}
      {showHint && (
        <div className="hint-panel">
          <div className="hint-header">
            <span className="hint-badge">💡 AI Study Hint</span>
            <span className="hint-prompt-label">Prompt: Define → Analogy → Exam Hook</span>
          </div>
          <pre className="hint-body">{hint.response}</pre>
          <div className="hint-actions">
            <span className="hint-cta">Now rate yourself honestly:</span>
            <div className="hint-rate-row">
              <button className="rate-btn rate-bad" onClick={() => handleRateFromHint(1)}>
                <span className="rate-icon">✕</span><span>Still missed</span>
              </button>
              <button className="rate-btn rate-ok" onClick={() => handleRateFromHint(3)}>
                <span className="rate-icon">〜</span><span>Makes sense</span>
              </button>
              <button className="rate-btn rate-good" onClick={() => handleRateFromHint(4)}>
                <span className="rate-icon">✓</span><span>Got it now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rating buttons — only shown after flip, hidden when hint is showing */}
      {!showHint && (
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
      )}

      {!showHint && (
        <button className="skip-btn" onClick={onSkip}>
          Skip for now →
        </button>
      )}
    </div>
  );
}
