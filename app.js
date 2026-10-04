/* ==========================================================================
   ALBERT UNIVERSITY - DYNAMIC DATA & INTERACTIVITY ENGINE
   ========================================================================== */

// CLAN ROSTER DATA
const clanRoster = [
    { id: 1, name: "Albert", handle: "@Albert", rank: "HEADMASTER", position: "C", wins: 412, losses: 38, points: "85k", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Albert", nextRank: "MAX", progress: 100 },
    { id: 2, name: "Shadow", handle: "@Shadow", rank: "FOUNDER", position: "PG", wins: 380, losses: 42, points: "72k", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Shadow", nextRank: "MAX", progress: 100 },
    { id: 3, name: "Brad", handle: "@rexxstuffs", rank: "MANAGEMENT", position: "SG", wins: 295, losses: 31, points: "54k", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Brad", nextRank: "MAX", progress: 100 },
    { id: 4, name: "Jx7", handle: "@Jx7", rank: "SUPERINTENDENT", position: "SF", wins: 210, losses: 29, points: "41k", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Jx7", nextRank: "HEADMASTER", progress: 85 },
    { id: 5, name: "Snack", handle: "@Snack", rank: "CAPTAINS", position: "PF", wins: 184, losses: 35, points: "32k", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Snack", nextRank: "SUPERINTENDENT", progress: 70 },
    { id: 6, name: "Bull", handle: "@BubaNaved", rank: "PLAYERS", position: "PG", wins: 95, losses: 18, points: "18k", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Bull", nextRank: "CAPTAINS", progress: 50 },
    { id: 7, name: "Lay", handle: "@layme17", rank: "PLAYERS", position: "SG", wins: 88, losses: 22, points: "15k", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Lay", nextRank: "CAPTAINS", progress: 40 }
];

// RANKS HIERARCHY
const clanRanks = [
    { name: "TRIAL", desc: "Newly accepted tryouts proving competitive capability.", req: "Pass official tryout evaluation", icon: "fa-user-clock" },
    { name: "MEMBER", desc: "Verified roster member active in squad queues.", req: "20k Points & 65% FG", icon: "fa-user-check" },
    { name: "STARTER", desc: "Core competitive squad rotation player.", req: "50 Matches played & 70% Win Rate", icon: "fa-basketball" },
    { name: "ELITE", desc: "Top-tier tournament player and squad leader.", req: "Handpicked by Brad or Headmaster", icon: "fa-crown" },
    { name: "CAPTAIN", desc: "Competitive team lead organizing team scrims.", req: "Leadership position vote", icon: "fa-shield-halved" },
    { name: "LEGEND", desc: "Hall of fame member with supreme clan impact.", req: "Multiple tournament victories", icon: "fa-star" }
];

// ACHIEVEMENTS
const clanAchievements = [
    { id: "a1", name: "First Victory", desc: "Win your first competitive clan match.", icon: "fa-trophy", unlocked: true },
    { id: "a2", name: "Hot Streak", desc: "Win 10 games in a row in Basketball Legends.", icon: "fa-fire-flame-curved", unlocked: true },
    { id: "a3", name: "Sharpshooter", desc: "Maintain over 70% FG accuracy in a tournament.", icon: "fa-crosshair", unlocked: false },
    { id: "a4", name: "Veteran", desc: "Play 100+ competitive matches for AU.", icon: "fa-medal", unlocked: true },
    { id: "a5", name: "Tournament Winner", desc: "Place 1st in an official clan race tournament.", icon: "fa-award", unlocked: false }
];

// EVENTS DATA
const clanEvents = [
    { title: "AU Season 4 Clan Race", date: "2026-10-15", time: "6:00 PM EST", type: "Tournament", desc: "Head-to-head clan reputation race for the #1 leaderboards spot." },
    { title: "Official Squad Scrims", date: "2026-10-08", time: "8:00 PM EST", type: "Practice", desc: "Internal 5v5 scrims for Starters and Elites." }
];

// NEWS DATA
const clanNews = [
    { title: "Albert University Reaches 3,000+ Active Members", date: "Oct 2, 2026", author: "Brad", snippet: "AU continues to dominate Roblox Basketball Legends as the largest competitive ecosystem." },
    { title: "Season 4 Tryouts Officially Opened", date: "Sep 28, 2026", author: "Albert", snippet: "Submit your stats today to earn a spot on the trial competitive rotation." }
];

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    renderRoster();
    renderRanks();
    renderAchievements();
    renderEvents();
    renderNews();
    startCountdown();

    // Mobile Nav Toggle
    document.getElementById("mobile-toggle").addEventListener("click", () => {
        document.getElementById("nav-links").classList.toggle("open");
    });
});

// NAVIGATION TAB SWITCHER
function showTab(tabId) {
    document.querySelectorAll(".page-tab").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));

    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) targetTab.classList.add("active");

    const activeNav = document.querySelector(`.nav-item[href="#${tabId}"]`);
    if (activeNav) activeNav.classList.add("active");

    document.getElementById("nav-links").classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// RENDER ROSTER
function renderRoster() {
    const container = document.getElementById("roster-container");
    container.innerHTML = "";

    const groups = ["HEADMASTER", "FOUNDER", "MANAGEMENT", "SUPERINTENDENT", "CAPTAINS", "PLAYERS"];

    groups.forEach(group => {
        const members = clanRoster.filter(m => m.rank === group);
        if (members.length === 0) return;

        const groupEl = document.createElement("div");
        groupEl.className = "roster-group";
        groupEl.innerHTML = `<div class="rank-group-title"><i class="fa-solid fa-shield-cat"></i> ${group}</div>`;

        const grid = document.createElement("div");
        grid.className = "roster-grid";

        members.forEach(m => {
            const card = document.createElement("div");
            card.className = "player-card";
            card.onclick = () => openPlayerModal(m.id);
            card.innerHTML = `
                <img src="${m.avatar}" alt="${m.name}">
                <div class="player-info">
                    <div class="player-name">${m.name}</div>
                    <div class="player-handle">${m.handle}</div>
                    <span class="player-pos">${m.position}</span>
                </div>
            `;
            grid.appendChild(card);
        });

        groupEl.appendChild(grid);
        container.appendChild(groupEl);
    });
}

// PLAYER PROFILE MODAL
function openPlayerModal(playerId) {
    const player = clanRoster.find(p => p.id === playerId);
    if (!player) return;

    document.getElementById("modal-avatar").src = player.avatar;
    document.getElementById("modal-displayname").innerText = player.name;
    document.getElementById("modal-username").innerText = player.handle;
    document.getElementById("modal-rank").innerText = player.rank;
    document.getElementById("modal-position").innerText = player.position;

    document.getElementById("modal-wins").innerText = player.wins;
    document.getElementById("modal-losses").innerText = player.losses;
    const wr = Math.round((player.wins / (player.wins + player.losses)) * 100);
    document.getElementById("modal-winrate").innerText = `${wr}%`;
    document.getElementById("modal-points").innerText = player.points;

    document.getElementById("prog-current-rank").innerText = `Current: ${player.rank}`;
    document.getElementById("prog-next-rank").innerText = `Next: ${player.nextRank}`;
    document.getElementById("prog-bar-fill").style.width = `${player.progress}%`;

    const achContainer = document.getElementById("modal-achievements");
    achContainer.innerHTML = clanAchievements.map(a => `
        <div style="font-size: 0.8rem; padding: 6px 12px; background: #18181b; border-radius: 20px; border: 1px solid ${a.unlocked ? 'var(--cyan-primary)' : 'var(--border-color)'}; opacity: ${a.unlocked ? 1 : 0.4}; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid ${a.icon}" style="color: ${a.unlocked ? 'var(--cyan-primary)' : 'inherit'}"></i> ${a.name}
        </div>
    `).join("");

    document.getElementById("player-modal").classList.add("open");
}

function closePlayerModal() {
    document.getElementById("player-modal").classList.remove("open");
}

// RENDER RANKS
function renderRanks() {
    const container = document.getElementById("ranks-timeline");
    container.innerHTML = clanRanks.map((r, i) => `
        <div class="rank-card">
            <div class="rank-badge-icon"><i class="fa-solid ${r.icon}"></i></div>
            <div style="flex:1;">
                <div style="font-weight: 800; font-size: 1.1rem; color: var(--purple-primary);">${i + 1}.${r.name}</div>
                <div style="font-size: 0.9rem; color: var(--text-muted);">${r.desc}</div>
                <div style="font-size: 0.8rem; color: var(--cyan-primary); margin-top: 4px;"><strong>Requirement:</strong> ${r.req}</div>
            </div>
        </div>
    `).join("");
}

// RENDER ACHIEVEMENTS
function renderAchievements() {
    const container = document.getElementById("achievements-grid");
    container.innerHTML = clanAchievements.map(a => `
        <div class="achievement-card ${a.unlocked ? 'unlocked' : ''}">
            <i class="fa-solid ${a.icon} achievement-icon"></i>
            <div style="font-weight: 800; margin-bottom: 4px;">${a.name}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${a.desc}</div>
            <div style="font-size: 0.75rem; margin-top: 8px; font-weight: 700; color: ${a.unlocked ? 'var(--cyan-primary)' : 'var(--text-dim)'};">
                ${a.unlocked ? '<i class="fa-solid fa-check"></i> UNLOCKED' : '<i class="fa-solid fa-lock"></i> LOCKED'}
            </div>
        </div>
    `).join("");
}

// RENDER EVENTS
function renderEvents() {
    const container = document.getElementById("events-grid");
    container.innerHTML = clanEvents.map(e => `
        <div class="event-card">
            <span class="badge-pill" style="margin-bottom:8px;">${e.type}</span>
            <h3 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 6px;">${e.title}</h3>
            <div style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 12px;"><i class="fa-solid fa-clock"></i> ${e.date} @${e.time}</div>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${e.desc}</p>
        </div>
    `).join("");
}

// RENDER NEWS
function renderNews() {
    const fullContainer = document.getElementById("full-news-grid");
    const homeContainer = document.getElementById("home-news-grid");

    const html = clanNews.map(n => `
        <div class="news-card">
            <div style="font-size: 0.75rem; color: var(--purple-primary); font-weight: 700;">${n.date} • BY ${n.author}</div>
            <h3 style="font-size: 1.1rem; font-weight: 800; margin: 6px 0;">${n.title}</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${n.snippet}</p>
        </div>
    `).join("");

    if (fullContainer) fullContainer.innerHTML = html;
    if (homeContainer) homeContainer.innerHTML = html;
}

// TRYOUT FORM HANDLER
function handleTryoutSubmit(e) {
    e.preventDefault();
    const appData = {
        roblox: document.getElementById("try-roblox").value,
        discord: document.getElementById("try-discord").value,
        position: document.getElementById("try-position").value,
        stats: document.getElementById("try-stats").value,
        exp: document.getElementById("try-exp").value,
        why: document.getElementById("try-why").value,
        status: "Pending",
        id: Date.now()
    };

    let apps = JSON.parse(localStorage.getItem("au_apps") || "[]");
    apps.push(appData);
    localStorage.setItem("au_apps", JSON.stringify(apps));

    document.getElementById("tryout-form").reset();
    document.getElementById("tryout-success").classList.remove("hidden");
    setTimeout(() => document.getElementById("tryout-success").classList.add("hidden"), 5000);
}

// ADMIN PANEL TOGGLE & REVIEW
function toggleAdminPanel() {
    const panel = document.getElementById("admin-panel");
    panel.classList.toggle("hidden");
    if (!panel.classList.contains("hidden")) {
        renderAdminApps();
    }
}

function renderAdminApps() {
    const container = document.getElementById("applications-list");
    let apps = JSON.parse(localStorage.getItem("au_apps") || "[]");

    if (apps.length === 0) {
        container.innerHTML = `<div style="color: var(--text-dim); text-align: center; padding: 20px;">No pending applications found.</div>`;
        return;
    }

    container.innerHTML = apps.map(a => `
        <div style="background: #18181b; padding: 16px; border-radius: 8px; margin-top: 12px; border: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; font-weight: 800;">
                <span>${a.roblox} (@${a.discord})</span>
                <span class="badge-pill">${a.status}</span>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin: 8px 0;">
                <strong>Pos:</strong> ${a.position} \vert{} <strong>Stats:</strong>${a.stats}<br>
                <strong>Why:</strong> ${a.why}
            </div>
            <div style="display: flex; gap: 8px; margin-top: 8px;">
                <button onclick="updateAppStatus(${a.id}, 'Accepted')" style="background:#22c55e; color:#000; border:none; padding:4px 12px; border-radius:4px; font-weight:bold; cursor:pointer;">Accept</button>
                <button onclick="updateAppStatus(${a.id}, 'Denied')" style="background:#ef4444; color:#fff; border:none; padding:4px 12px; border-radius:4px; font-weight:bold; cursor:pointer;">Deny</button>
            </div>
        </div>
    `).join("");
}

function updateAppStatus(id, status) {
    let apps = JSON.parse(localStorage.getItem("au_apps") || "[]");
    apps = apps.map(a => a.id === id ? { ...a, status } : a);
    localStorage.setItem("au_apps", JSON.stringify(apps));
    renderAdminApps();
}

// COUNTDOWN TIMER
function startCountdown() {
    const target = new Date("2026-10-15T18:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;

        if (diff < 0) return;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("timer-display").innerText = `${d}d :${h}h : ${m}m :${s}s`;
    }, 1000);
}
