/**
 * KSRTC Overlay Features — v2 (Scoped & Fixed)
 * ─────────────────────────────────────────────────────────────────
 * ALL CSS is scoped under #ag-ksrtc-overlay to prevent ANY leakage
 * into the existing site styles. Zero global CSS modifications.
 * ─────────────────────────────────────────────────────────────────
 */

/* ══════════════════════════════════════════════════════════════════
   GEMINI & GOOGLE CONFIGURATION
   Values are deliberately not stored in this repository. Copy
   config/app_config.example.js to config/app_config.js and add them there.
   ══════════════════════════════════════════════════════════════════ */
const AG_CONFIG = window.SMARTTRANSIT_CONFIG || {};
const GEMINI_API_KEY = (AG_CONFIG.geminiApiKey || "").trim();
const GOOGLE_CLIENT_ID = (AG_CONFIG.googleClientId || "").trim();
const GEMINI_ENDPOINT = AG_CONFIG.geminiEndpoint ||
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

/* ══════════════════════════════════════════════════════════════════
   DATASET LOADER
   ══════════════════════════════════════════════════════════════════ */
const AG_DATA_FILES = [
  "data/fare_rates.json",
  "data/ksrtc_depots.json",
  "data/major_stops.json",
  "data/sample_routes.json",
  "data/districts.json",
  "data/metro_stations.json",
  "data/ferry_routes.json",
];

let agKsrtcDataset = "";

async function agLoadDataset() {
  const results = await Promise.allSettled(
    AG_DATA_FILES.map((f) =>
      fetch(f).then((r) => r.json()).then((d) => ({ file: f, data: d }))
    )
  );
  const lines = [];
  for (const r of results) {
    if (r.status === "fulfilled") {
      lines.push(`=== ${r.value.file} ===\n${JSON.stringify(r.value.data, null, 2)}`);
    }
  }
  agKsrtcDataset = lines.join("\n\n");
}

function agBuildSystemPrompt() {
  return `You are SmartTransit Data Assistant. Answer only with facts found in
the DATASET below. Do not use outside knowledge, make estimates, or invent a
route, schedule, fare, contact detail, or policy. If the answer is not in the
dataset, say: "I don't have that information in the loaded transport dataset."
Keep answers concise and identify the relevant route, stop, depot, district,
metro station, ferry service, or fare record where possible.

## DATASET
${agKsrtcDataset}`;
}

/* ══════════════════════════════════════════════════════════════════
   SCOPED CSS INJECTION — ALL rules prefixed with #ag-ksrtc-overlay
   No global selectors. No overrides to existing site styles.
   ══════════════════════════════════════════════════════════════════ */
(function agInjectStyles() {
  const style = document.createElement("style");
  style.id = "ag-ksrtc-overlay-styles";
  style.textContent = `

  /* ── Root isolation wrapper ── */
  #ag-ksrtc-overlay * {
    box-sizing: border-box;
    font-family: 'Manrope', 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* ── FAB Group — bottom-right, non-overlapping ── */
  #ag-fab-group {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 8000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    pointer-events: none;
  }
  #ag-fab-group > * { pointer-events: auto; }

  .ag-fab {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0 18px 0 12px;
    height: 48px;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 13.5px;
    text-decoration: none !important;
    color: #fff !important;
    box-shadow: 0 6px 24px -6px rgba(0,0,0,0.55);
    transition: transform 0.22s cubic-bezier(.2,.8,.2,1),
                box-shadow 0.22s ease,
                opacity 0.22s ease;
    white-space: nowrap;
    line-height: 1;
    outline: none;
  }
  .ag-fab:hover {
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 12px 32px -8px rgba(0,0,0,0.6);
  }
  .ag-fab:active { transform: scale(0.97); }

  #ag-fab-booking  { background: linear-gradient(135deg, #25D366, #128C7E); }
  #ag-fab-ai       { background: linear-gradient(135deg, #c3372c, #8f2620); }
  #ag-fab-login    { background: linear-gradient(135deg, #39b6a0, #1f7a6d); }

  .ag-fab-icon { font-size: 18px; line-height: 1; flex-shrink: 0; }

  /* ── Auth Modal ── */
  #ag-auth-modal {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.78);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 9100;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.28s ease;
  }
  #ag-auth-modal.ag-active {
    opacity: 1;
    pointer-events: auto;
  }
  .ag-auth-card {
    background: #12151a;
    border: 1px solid rgba(244,239,230,0.16);
    border-radius: 20px;
    padding: 34px 30px 28px;
    width: 90%;
    max-width: 390px;
    box-shadow: 0 28px 56px -18px rgba(0,0,0,0.85);
    position: relative;
    animation: agSlideUp 0.3s cubic-bezier(.2,.8,.2,1);
  }
  @keyframes agSlideUp {
    from { opacity:0; transform: translateY(18px); }
    to   { opacity:1; transform: translateY(0); }
  }
  .ag-auth-close {
    position: absolute;
    top: 14px; right: 16px;
    background: none; border: none;
    color: #69727c; font-size: 20px;
    cursor: pointer; line-height: 1;
    padding: 4px;
    transition: color 0.2s;
  }
  .ag-auth-close:hover { color: #f4efe6; }

  .ag-auth-logo  { text-align: center; font-size: 34px; margin-bottom: 4px; }
  .ag-auth-title {
    text-align: center;
    font-family: 'Fraunces', serif;
    font-size: 21px;
    color: #f4efe6;
    margin: 0 0 3px;
    font-weight: 560;
    letter-spacing: -0.01em;
  }
  .ag-auth-sub {
    text-align: center;
    font-size: 12.5px;
    color: #69727c;
    margin: 0 0 22px;
  }

  .ag-auth-tabs {
    display: flex;
    background: rgba(244,239,230,0.06);
    border-radius: 100px;
    padding: 4px;
    margin-bottom: 22px;
  }
  .ag-tab {
    flex: 1;
    padding: 8px;
    border: none;
    background: none;
    border-radius: 100px;
    color: #69727c;
    font-weight: 600;
    font-size: 13.5px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .ag-tab.ag-tab-active {
    background: linear-gradient(135deg, #c3372c, #8f2620);
    color: #f4efe6;
  }

  .ag-form { display: flex; flex-direction: column; gap: 13px; }
  .ag-form.ag-hidden { display: none; }

  .ag-field { display: flex; flex-direction: column; gap: 5px; }
  .ag-field label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10.5px;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #f0b23e;
  }
  .ag-field input {
    background: rgba(244,239,230,0.06) !important;
    border: 1px solid rgba(244,239,230,0.13) !important;
    border-radius: 10px !important;
    padding: 11px 13px !important;
    color: #f4efe6 !important;
    font-size: 13.5px !important;
    outline: none !important;
    transition: border-color 0.2s !important;
    width: 100% !important;
    box-shadow: none !important;
  }
  .ag-field input:focus {
    border-color: rgba(240,178,62,0.45) !important;
  }
  .ag-field input::placeholder { color: #3a404a !important; }

  .ag-err {
    font-size: 11.5px;
    color: #f87171;
    min-height: 15px;
    margin-top: -5px;
  }
  .ag-submit {
    width: 100%;
    padding: 12px;
    border-radius: 100px;
    border: none;
    background: linear-gradient(135deg, #c3372c, #8f2620);
    color: #f4efe6;
    font-weight: 700;
    font-size: 14.5px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    margin-top: 3px;
  }
  .ag-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 22px -8px rgba(195,55,44,0.6);
  }
  #ag-auth-status {
    text-align: center;
    font-size: 12.5px;
    color: #39b6a0;
    margin-top: 12px;
    min-height: 18px;
    font-weight: 600;
  }
  .ag-google-section { margin: 0 0 18px; text-align: center; }
  #ag-google-button { display: flex; justify-content: center; min-height: 40px; }
  .ag-google-help { margin: 9px 0 0; color: #69727c; font-size: 11.5px; line-height: 1.45; }
  .ag-auth-divider { display: flex; align-items: center; gap: 10px; color: #69727c; font-size: 11px; margin: 18px 0; }
  .ag-auth-divider::before, .ag-auth-divider::after { content: ''; height: 1px; background: rgba(244,239,230,0.12); flex: 1; }

  /* ── User Badge ── */
  #ag-user-badge {
    position: fixed;
    top: 18px;
    right: 200px;
    z-index: 8000;
    display: none;
    align-items: center;
    gap: 7px;
    background: rgba(57,182,160,0.14);
    border: 1px solid rgba(57,182,160,0.28);
    border-radius: 100px;
    padding: 6px 13px;
    font-size: 12.5px;
    color: #39b6a0;
    font-family: 'IBM Plex Mono', monospace;
  }
  #ag-user-badge.ag-visible { display: flex; }
  #ag-logout-btn {
    background: none; border: none;
    color: #f87171; cursor: pointer;
    font-size: 11.5px;
    padding: 0; margin-left: 4px;
    font-family: inherit;
  }
  #ag-logout-btn:hover { color: #ef4444; }

  /* ── Chat Drawer ── */
  #ag-chat-drawer {
    position: fixed;
    bottom: 90px;
    right: 28px;
    width: 360px;
    max-width: calc(100vw - 44px);
    height: 510px;
    max-height: calc(100vh - 120px);
    background: #12151a;
    border: 1px solid rgba(244,239,230,0.13);
    border-radius: 20px;
    box-shadow: 0 28px 56px -18px rgba(0,0,0,0.9);
    z-index: 8500;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform: translateY(16px) scale(0.97);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.28s cubic-bezier(.2,.8,.2,1), opacity 0.28s ease;
  }
  #ag-chat-drawer.ag-open {
    transform: translateY(0) scale(1);
    opacity: 1;
    pointer-events: auto;
  }

  .ag-chat-hdr {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(244,239,230,0.08);
    flex-shrink: 0;
  }
  .ag-chat-hdr-icon {
    width: 34px; height: 34px;
    border-radius: 10px;
    background: linear-gradient(135deg, #c3372c, #8f2620);
    display: flex; align-items: center; justify-content: center;
    font-size: 17px; flex-shrink: 0;
  }
  .ag-chat-hdr-text h4 {
    margin: 0;
    font-family: 'Fraunces', serif;
    font-size: 15px;
    color: #f4efe6;
    font-weight: 560;
  }
  .ag-chat-hdr-text span {
    font-size: 10.5px;
    color: #39b6a0;
    font-family: 'IBM Plex Mono', monospace;
  }
  .ag-chat-close {
    margin-left: auto;
    background: none; border: none;
    color: #69727c; font-size: 18px;
    cursor: pointer; padding: 4px;
    transition: color 0.2s;
  }
  .ag-chat-close:hover { color: #f4efe6; }

  #ag-api-notice {
    padding: 6px 14px;
    font-size: 11px;
    color: #f87171;
    text-align: center;
    background: rgba(239,68,68,0.08);
    border-bottom: 1px solid rgba(239,68,68,0.15);
    display: none;
    flex-shrink: 0;
  }

  .ag-chat-msgs {
    flex: 1;
    overflow-y: auto;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 11px;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.07) transparent;
  }
  .ag-chat-msgs::-webkit-scrollbar { width: 3px; }
  .ag-chat-msgs::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.07); border-radius: 99px;
  }

  .ag-bubble {
    max-width: 86%;
    padding: 10px 13px;
    border-radius: 15px;
    font-size: 13px;
    line-height: 1.6;
    word-break: break-word;
    animation: agBubble 0.22s ease;
  }
  @keyframes agBubble {
    from { opacity:0; transform: translateY(5px); }
    to   { opacity:1; transform: translateY(0); }
  }
  .ag-bubble.ag-user {
    background: linear-gradient(135deg, #c3372c, #8f2620);
    color: #f4efe6;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  }
  .ag-bubble.ag-bot {
    background: rgba(244,239,230,0.07);
    border: 1px solid rgba(244,239,230,0.1);
    color: #d8d2c6;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  }
  .ag-bubble.ag-err-bubble {
    background: rgba(239,68,68,0.12);
    border: 1px solid rgba(239,68,68,0.25);
    color: #fca5a5;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  }

  .ag-typing {
    display: flex; gap: 5px; align-items: center;
    padding: 10px 13px;
    background: rgba(244,239,230,0.07);
    border: 1px solid rgba(244,239,230,0.1);
    border-radius: 15px;
    border-bottom-left-radius: 4px;
    align-self: flex-start;
  }
  .ag-typing span {
    width: 6px; height: 6px; border-radius: 50%;
    background: #f0b23e;
    animation: agTyping 1.3s infinite;
  }
  .ag-typing span:nth-child(2) { animation-delay: 0.18s; }
  .ag-typing span:nth-child(3) { animation-delay: 0.36s; }
  @keyframes agTyping {
    0%,60%,100% { transform: translateY(0); opacity: 0.35; }
    30% { transform: translateY(-5px); opacity: 1; }
  }

  .ag-welcome {
    text-align: center;
    padding: 18px 8px 10px;
  }
  .ag-welcome .ag-wicon { font-size: 30px; margin-bottom: 8px; }
  .ag-welcome h5 {
    margin: 0 0 5px;
    font-family: 'Fraunces', serif;
    font-size: 16px;
    color: #f4efe6;
    font-weight: 560;
  }
  .ag-welcome p { font-size: 12px; color: #69727c; margin: 0 0 12px; }

  .ag-chips {
    display: flex; flex-wrap: wrap; gap: 6px; justify-content: center;
  }
  .ag-chip {
    padding: 5px 11px;
    border-radius: 100px;
    border: 1px solid rgba(240,178,62,0.28);
    background: rgba(240,178,62,0.07);
    color: #f0b23e;
    font-size: 11px;
    cursor: pointer;
    transition: background 0.18s, transform 0.18s;
  }
  .ag-chip:hover {
    background: rgba(240,178,62,0.15);
    transform: translateY(-2px);
  }

  .ag-chat-input-row {
    padding: 11px 13px;
    border-top: 1px solid rgba(244,239,230,0.08);
    display: flex;
    gap: 8px;
    align-items: flex-end;
    flex-shrink: 0;
  }
  #ag-chat-input {
    flex: 1;
    background: rgba(244,239,230,0.06) !important;
    border: 1px solid rgba(244,239,230,0.11) !important;
    border-radius: 11px !important;
    padding: 9px 12px !important;
    color: #f4efe6 !important;
    font-size: 13px !important;
    outline: none !important;
    resize: none !important;
    max-height: 96px !important;
    min-height: 38px !important;
    line-height: 1.5 !important;
    transition: border-color 0.2s !important;
    box-shadow: none !important;
    font-family: 'Manrope', sans-serif !important;
  }
  #ag-chat-input:focus {
    border-color: rgba(240,178,62,0.38) !important;
  }
  #ag-chat-input::placeholder { color: #3a404a !important; }
  #ag-send-btn {
    width: 38px; height: 38px;
    border-radius: 11px;
    border: none;
    background: linear-gradient(135deg, #c3372c, #8f2620);
    color: #f4efe6;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-size: 15px;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
  }
  #ag-send-btn:hover:not(:disabled) {
    transform: scale(1.08);
    box-shadow: 0 5px 16px -5px rgba(195,55,44,0.5);
  }
  #ag-send-btn:disabled { opacity: 0.32; cursor: not-allowed; }

  `;
  document.head.appendChild(style);
})();

/* ══════════════════════════════════════════════════════════════════
   HTML INJECTION — All inside #ag-ksrtc-overlay
   ══════════════════════════════════════════════════════════════════ */
(function agInjectHTML() {
  const root = document.createElement("div");
  root.id = "ag-ksrtc-overlay";
  root.innerHTML = `

  <!-- User Badge -->
  <div id="ag-user-badge">
    <span>👤</span>
    <span id="ag-badge-name">User</span>
    <button id="ag-logout-btn" onclick="agLogout()">Logout</button>
  </div>

  <!-- FAB Group -->
  <div id="ag-fab-group">
    <button class="ag-fab" id="ag-fab-login" onclick="agOpenAuth()">
      <span class="ag-fab-icon">🔑</span> Login
    </button>
    <button class="ag-fab" id="ag-fab-ai" onclick="agToggleChat()">
      <span class="ag-fab-icon">🤖</span> AI Assistant
    </button>
    <a class="ag-fab" id="ag-fab-booking"
       href="https://wa.me/919447071021?text=Hi"
       target="_blank" rel="noopener noreferrer">
      <span class="ag-fab-icon">🚌</span> KSRTC Booking
    </a>
  </div>

  <!-- Auth Modal -->
  <div id="ag-auth-modal" role="dialog" aria-modal="true" aria-label="Login or Sign Up">
    <div class="ag-auth-card">
      <button class="ag-auth-close" onclick="agCloseAuth()" aria-label="Close">✕</button>
      <div class="ag-auth-logo">🚌</div>
      <h3 class="ag-auth-title">KSRTC SmartTransit</h3>
      <p class="ag-auth-sub">Sign in to access personalised features</p>

      <div class="ag-google-section">
        <div id="ag-google-button"></div>
        <p class="ag-google-help" id="ag-google-help">Google Sign-In is ready when you add your Client ID.</p>
      </div>

      <div class="ag-auth-divider">or use local demo access</div>

      <div class="ag-auth-tabs">
        <button class="ag-tab ag-tab-active" id="ag-tab-login" onclick="agSwitchTab('login')">Login</button>
        <button class="ag-tab" id="ag-tab-signup" onclick="agSwitchTab('signup')">Sign Up</button>
      </div>

      <!-- Login Form -->
      <form class="ag-form" id="ag-form-login" onsubmit="agHandleLogin(event)">
        <div class="ag-field">
          <label for="ag-login-email">Email</label>
          <input type="email" id="ag-login-email" placeholder="you@example.com" autocomplete="email" />
        </div>
        <div class="ag-field">
          <label for="ag-login-pw">Password</label>
          <input type="password" id="ag-login-pw" placeholder="••••••••" autocomplete="current-password" />
        </div>
        <p class="ag-err" id="ag-login-err"></p>
        <button type="submit" class="ag-submit">Login →</button>
      </form>

      <!-- Sign Up Form -->
      <form class="ag-form ag-hidden" id="ag-form-signup" onsubmit="agHandleSignup(event)">
        <div class="ag-field">
          <label for="ag-signup-name">Full Name</label>
          <input type="text" id="ag-signup-name" placeholder="Your name" autocomplete="name" />
        </div>
        <div class="ag-field">
          <label for="ag-signup-email">Email</label>
          <input type="email" id="ag-signup-email" placeholder="you@example.com" autocomplete="email" />
        </div>
        <div class="ag-field">
          <label for="ag-signup-pw">Password</label>
          <input type="password" id="ag-signup-pw" placeholder="Min. 6 characters" autocomplete="new-password" />
        </div>
        <p class="ag-err" id="ag-signup-err"></p>
        <button type="submit" class="ag-submit">Create Account →</button>
      </form>

      <div id="ag-auth-status"></div>
    </div>
  </div>

  <!-- Chat Drawer -->
  <div id="ag-chat-drawer" role="complementary" aria-label="KSRTC AI Assistant">
    <div class="ag-chat-hdr">
      <div class="ag-chat-hdr-icon">🤖</div>
      <div class="ag-chat-hdr-text">
        <h4>KSRTC AI Assistant</h4>
        <span>● Powered by Gemini</span>
      </div>
      <button class="ag-chat-close" onclick="agToggleChat()" aria-label="Close">✕</button>
    </div>
    <p id="ag-api-notice">⚠️ Add your Gemini key in config/app_config.js to activate responses.</p>
    <div class="ag-chat-msgs" id="ag-msgs">
      <div class="ag-welcome" id="ag-welcome">
        <div class="ag-wicon">🚌</div>
        <h5>How can I help you?</h5>
        <p>Ask about routes, fares, schedules, or KSRTC services.</p>
        <div class="ag-chips">
          <button class="ag-chip" onclick="agSendChip(this)">Fare for Ordinary bus?</button>
          <button class="ag-chip" onclick="agSendChip(this)">SWIFT vs Minnal?</button>
          <button class="ag-chip" onclick="agSendChip(this)">First bus from TVM?</button>
          <button class="ag-chip" onclick="agSendChip(this)">Lost baggage help</button>
          <button class="ag-chip" onclick="agSendChip(this)">Student concession?</button>
        </div>
      </div>
    </div>
    <div class="ag-chat-input-row">
      <textarea id="ag-chat-input" placeholder="Ask about KSRTC…" rows="1"
        onkeydown="agInputKeydown(event)"
        oninput="agAutoResize(this)"></textarea>
      <button id="ag-send-btn" onclick="agSendMessage()" aria-label="Send">➤</button>
    </div>
  </div>

  `;
  document.body.appendChild(root);
})();

/* ══════════════════════════════════════════════════════════════════
   AUTH LOGIC — frontend-only, localStorage
   ══════════════════════════════════════════════════════════════════ */
function agOpenAuth() {
  document.getElementById("ag-auth-modal").classList.add("ag-active");
  const user = JSON.parse(localStorage.getItem("ag_ksrtc_user") || "null");
  if (user) {
    document.getElementById("ag-auth-status").textContent =
      `✅ Logged in as ${user.name || user.email}`;
  }
}

function agCloseAuth() {
  document.getElementById("ag-auth-modal").classList.remove("ag-active");
  document.getElementById("ag-login-err").textContent = "";
  document.getElementById("ag-signup-err").textContent = "";
  document.getElementById("ag-auth-status").textContent = "";
}

// Close on backdrop click
document.addEventListener("click", function(e) {
  const modal = document.getElementById("ag-auth-modal");
  if (e.target === modal) agCloseAuth();
});

function agSwitchTab(tab) {
  const isLogin = tab === "login";
  document.getElementById("ag-tab-login").classList.toggle("ag-tab-active", isLogin);
  document.getElementById("ag-tab-signup").classList.toggle("ag-tab-active", !isLogin);
  document.getElementById("ag-form-login").classList.toggle("ag-hidden", !isLogin);
  document.getElementById("ag-form-signup").classList.toggle("ag-hidden", isLogin);
  document.getElementById("ag-login-err").textContent = "";
  document.getElementById("ag-signup-err").textContent = "";
  document.getElementById("ag-auth-status").textContent = "";
}

function agValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

function agHandleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("ag-login-email").value.trim();
  const pw = document.getElementById("ag-login-pw").value;
  const err = document.getElementById("ag-login-err");

  if (!email) { err.textContent = "Email is required."; return; }
  if (!agValidEmail(email)) { err.textContent = "Enter a valid email."; return; }
  if (!pw) { err.textContent = "Password is required."; return; }

  const accounts = JSON.parse(localStorage.getItem("ag_ksrtc_accounts") || "{}");
  if (!accounts[email]) { err.textContent = "No account found. Please sign up."; return; }
  if (accounts[email].password !== pw) { err.textContent = "Incorrect password."; return; }

  const user = { email, name: accounts[email].name, isLoggedIn: true };
  localStorage.setItem("ag_ksrtc_user", JSON.stringify(user));
  err.textContent = "";
  document.getElementById("ag-auth-status").textContent = `✅ Welcome back, ${user.name || email}!`;
  agUpdateUI();
  setTimeout(agCloseAuth, 1200);
}

function agHandleSignup(e) {
  e.preventDefault();
  const name = document.getElementById("ag-signup-name").value.trim();
  const email = document.getElementById("ag-signup-email").value.trim();
  const pw = document.getElementById("ag-signup-pw").value;
  const err = document.getElementById("ag-signup-err");

  if (!name) { err.textContent = "Full name is required."; return; }
  if (!email) { err.textContent = "Email is required."; return; }
  if (!agValidEmail(email)) { err.textContent = "Enter a valid email."; return; }
  if (pw.length < 6) { err.textContent = "Password must be at least 6 characters."; return; }

  const accounts = JSON.parse(localStorage.getItem("ag_ksrtc_accounts") || "{}");
  if (accounts[email]) { err.textContent = "Account already exists. Please login."; return; }

  accounts[email] = { name, password: pw };
  localStorage.setItem("ag_ksrtc_accounts", JSON.stringify(accounts));

  const user = { email, name, isLoggedIn: true };
  localStorage.setItem("ag_ksrtc_user", JSON.stringify(user));
  err.textContent = "";
  document.getElementById("ag-auth-status").textContent = `🎉 Welcome, ${name}!`;
  agUpdateUI();
  setTimeout(agCloseAuth, 1400);
}

function agLogout() {
  localStorage.removeItem("ag_ksrtc_user");
  agUpdateUI();
  agCloseAuth();
}

function agUpdateUI() {
  const user = JSON.parse(localStorage.getItem("ag_ksrtc_user") || "null");
  const badge = document.getElementById("ag-user-badge");
  const loginBtn = document.getElementById("ag-fab-login");
  if (user && user.isLoggedIn) {
    badge.classList.add("ag-visible");
    document.getElementById("ag-badge-name").textContent = user.name || user.email;
    loginBtn.replaceChildren();
    const icon = document.createElement("span");
    icon.className = "ag-fab-icon";
    icon.textContent = "👤";
    loginBtn.append(icon, document.createTextNode(` ${(user.name || "Account").split(" ")[0]}`));
  } else {
    badge.classList.remove("ag-visible");
    loginBtn.replaceChildren();
    const icon = document.createElement("span");
    icon.className = "ag-fab-icon";
    icon.textContent = "🔑";
    loginBtn.append(icon, document.createTextNode(" Login"));
  }
}

function agDecodeGoogleJwt(credential) {
  const payload = credential.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(decodeURIComponent(atob(payload).split("").map((c) =>
    `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`).join("")));
}

function agHandleGoogleCredential(response) {
  try {
    const profile = agDecodeGoogleJwt(response.credential);
    if (!profile.email) throw new Error("Google did not provide an email address.");
    const user = {
      email: profile.email,
      name: profile.name || profile.email,
      picture: profile.picture || "",
      provider: "google",
      isLoggedIn: true,
    };
    // This front end displays the signed-in profile only. Verify the credential
    // on a server before using it to protect backend resources.
    localStorage.setItem("ag_ksrtc_user", JSON.stringify(user));
    document.getElementById("ag-auth-status").textContent = `✅ Signed in as ${user.name}`;
    agUpdateUI();
    setTimeout(agCloseAuth, 900);
  } catch (error) {
    document.getElementById("ag-google-help").textContent = `Google Sign-In failed: ${error.message}`;
  }
}

function agInitGoogleSignIn() {
  const help = document.getElementById("ag-google-help");
  if (!GOOGLE_CLIENT_ID) {
    help.textContent = "Add googleClientId in config/app_config.js to enable Google Sign-In.";
    return;
  }

  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  script.onload = () => {
    google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: agHandleGoogleCredential });
    google.accounts.id.renderButton(document.getElementById("ag-google-button"), {
      theme: "outline", size: "large", text: "signin_with", width: 300,
    });
    help.textContent = "Use your Google account to sign in.";
  };
  script.onerror = () => { help.textContent = "Unable to load Google Sign-In. Check your connection and Client ID."; };
  document.head.appendChild(script);
}

/* ══════════════════════════════════════════════════════════════════
   CHAT LOGIC
   ══════════════════════════════════════════════════════════════════ */
let agChatOpen = false;
let agChatHistory = [];
let agChatBusy = false;

function agToggleChat() {
  agChatOpen = !agChatOpen;
  document.getElementById("ag-chat-drawer").classList.toggle("ag-open", agChatOpen);
  if (agChatOpen && !GEMINI_API_KEY) {
    document.getElementById("ag-api-notice").style.display = "block";
  }
}

function agSendChip(btn) {
  document.getElementById("ag-chat-input").value = btn.textContent.trim();
  agSendMessage();
}

function agInputKeydown(e) {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); agSendMessage(); }
}

function agAutoResize(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 96) + "px";
}

async function agSendMessage() {
  const inp = document.getElementById("ag-chat-input");
  const text = inp.value.trim();
  if (!text || agChatBusy) return;

  const welcome = document.getElementById("ag-welcome");
  if (welcome) welcome.style.display = "none";

  agAddBubble("ag-user", text);
  agChatHistory.push({ role: "user", parts: [{ text }] });

  inp.value = "";
  inp.style.height = "auto";
  agSetBusy(true);

  if (!GEMINI_API_KEY) {
    agAddBubble("ag-err-bubble",
      "⚠️ Gemini is not configured. Copy config/app_config.example.js to config/app_config.js and add your Gemini API key there.");
    agSetBusy(false);
    return;
  }

  try {
    const res = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: agBuildSystemPrompt() }] },
        contents: agChatHistory,
        generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `API error ${res.status}`);
    }

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, no response received.";
    agChatHistory.push({ role: "model", parts: [{ text: reply }] });
    agAddBubble("ag-bot", reply);
  } catch (err) {
    agAddBubble("ag-err-bubble", `❌ ${err.message}`);
    agChatHistory.pop();
  } finally {
    agSetBusy(false);
  }
}

function agAddBubble(cls, text) {
  const container = document.getElementById("ag-msgs");
  const b = document.createElement("div");
  b.className = `ag-bubble ${cls}`;
  b.textContent = text;
  b.style.whiteSpace = "pre-wrap";
  container.appendChild(b);
  container.scrollTop = container.scrollHeight;
}

function agSetBusy(state) {
  agChatBusy = state;
  document.getElementById("ag-send-btn").disabled = state;
  const existing = document.getElementById("ag-typing-indicator");
  if (state && !existing) {
    const d = document.createElement("div");
    d.className = "ag-typing";
    d.id = "ag-typing-indicator";
    d.innerHTML = "<span></span><span></span><span></span>";
    document.getElementById("ag-msgs").appendChild(d);
    document.getElementById("ag-msgs").scrollTop = 999999;
  } else if (!state && existing) {
    existing.remove();
  }
}

/* ══════════════════════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════════════════════ */
(async function agInit() {
  agUpdateUI();
  agInitGoogleSignIn();
  await agLoadDataset();
})();
