/* ==========================================================================
   ALBERT UNIVERSITY - COMPETITIVE SYSTEM LOGIC
   ========================================================================== */

// 1. CLAN ROSTER DATA
const clanRosterData = {
    "OWNER": ["Albert"],
    "MANAGEMENT": ["Shadow", "Brad"],
    "COACHES": ["Jx7"],
    "ASSISTANT COACHES": ["Snack"],
    "D1 ATHLETE": ["Bull", "Lay"],
    "D2 ATHLETE": ["Vortex", "Kip", "Ace"]
};

// 2. RANK HIERARCHY DATA
const rankHierarchyData = [
    { name: "TRIAL MEMBER", desc: "Newly accepted tryouts evaluating squad fit and competitive behavior.", req: "Passed initial tryout review", resp: "Participate in evaluation scrims", perm: "Trial Discord Access" },
    { name: "D2 ATHLETE", desc: "Developing roster member actively competing in secondary queues.", req: "Completed trial period successfully", resp: "Maintain active practice schedule", perm: "Scrim Channel Access" },
    { name: "D1 ATHLETE", desc: "Core competitive athlete representing AU in primary matches.", req: "High win-rate & team recommendations", resp: "Compete in official tournaments", perm: "Main Roster Access" },
    { name: "ELITE", desc: "High-performing competitive star athlete.", req: "Proven tournament excellence", resp: "Lead in-game calls and strategy", perm: "Priority Scrim Slots" },
    { name: "LEGEND", desc: "Hall of fame status players with exceptional longevity.", req: "Sustained high-level performance", resp: "Mentor younger athletes", perm: "Honorary Legacy Role" },
    { name: "CLAN RECRUITERS / COMP RECRUITERS", desc: "Official scouts evaluating prospective athletes.", req: "Appointed by Management", resp: "Review tryout submissions & host trials", perm: "Tryout Panel Permissions" },
    { name: "CAPTAINS", desc: "In-game team leads managing roster lineups.", req: "Demonstrated tactical leadership", resp: "Manage tournament rosters", perm: "Lineup Management" },
    { name: "MANAGEMENT TEAM", desc: "Executive staff directing clan operations and organization.", req: "Appointed Clan Leadership", resp: "Oversee staff, promotions, & roster moves", perm: "Full Operational Authority" }
];

// 3. EVENTS DATA
const clanEventsData = [
    { id: "e1", title: "AU Season 4 Main Scrims", date: "2026-10-12", time: "7:00 PM EST", type: "Scrims", desc: "5v5 internal competitive evaluation matches.", participants: "D1 Athletes & Captains", status: "Upcoming" },
    { id: "e2", title: "Monthly Open Tryout Session", date: "2026-10-18", time: "5:00 PM EST", type: "Tryouts", desc: "Hosted evaluation sessions for pending applicants.", participants: "Recruiters & Trial Applicants", status: "Upcoming" },
    { id: "e3", title: "Roblox Basketball Season Tournament", date: "2026-09-20", time: "6:00 PM EST", type: "Tournaments", desc: "Official competitive bracket tournament.", participants: "First Squad Roster", status: "Past" }
];

// 4. NEWS DATA
const clanNewsData = [
    {
        id: "n1",
        title: "Season 4 Tryouts Officially Open",
        date: "Oct 2, 2026",
        author: "Brad",
        category: "Announcements",
        snippet: "Albert University is officially receiving application submissions for upcoming trial rotations.",
        content: "We are excited to announce that tryout applications for Season 4 are now live. Prospective recruits must complete the full form under the Tryouts portal. Accepted players will begin as Trial Members."
    },
    {
        id: "n2",
        title: "Staff Restructuring & Promotion Updates",
        date: "Sep 28, 2026",
        author: "Shadow",
        category: "Promotions",
        snippet: "Key roster promotions and updated operational guidelines across competitive teams.",
        content: "Congratulations to our promoted athletes advancing into D1 Athlete slots. Recruiters will be reviewing pending tryouts actively this week."
    }
];

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    renderRoster();
    renderRanks();
    renderEvents();
    renderNews();
    renderHomePreviews();

    document.getElementById("mobile-toggle").addEventListener("click", () => {
        document.getElementById("nav-links").classList.toggle("open");
    });
});

// NAVIGATION
function showTab(tabId) {
    document.querySelectorAll(".page-tab").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));

    const target = document.getElementById(`tab-${tabId}`);
    if (target) target.classList.add("active");

    const navItem = document.querySelector(`.nav-item[href="#${tabId}"]`);
    if (navItem) navItem.classList.add("active");

    document.getElementById("nav-links").classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// RENDER ROSTER
function renderRoster() {
    const container = document.getElementById("roster-categories-container");
    container.innerHTML = "";

    const categories = ["OWNER", "MANAGEMENT", "COACHES", "ASSISTANT COACHES", "D1 ATHLETE", "D2 ATHLETE"];

    categories.forEach(cat => {
        const members = clanRosterData[cat] || [];
        const block = document.createElement("div");
        block.className = "roster-block";

        block.innerHTML = `
            <div class="category-title"><i class="fa-solid fa-shield"></i> ${cat}</div>
            <div class="member-simple-list">
                ${members.map(m => `<div class="member-item"><i class="fa-solid fa-user"></i> ${m}</div>`).join("")}
            </div>
        `;
        container.appendChild(block);
    });
}

// RENDER RANKS
function renderRanks() {
    const container = document.getElementById("ranks-hierarchy-container");
    container.innerHTML = rankHierarchyData.map((r, idx) => `
        <div class="rank-card-row">
            <div class="rank-num-badge">${idx + 1}</div>
            <div class="rank-details">
                <div class="rank-name-title">${r.name}</div>
                <div class="rank-desc-text">${r.desc}</div>
                <div class="rank-meta-row">
                    <span class="rank-meta-item">Requirements: ${r.req}</span>
                    <span class="rank-meta-item">Responsibilities: ${r.resp}</span>
                </div>
            </div>
        </div>
    `).join("");
}

// RENDER EVENTS
function renderEvents() {
    const upcomingContainer = document.getElementById("upcoming-events-grid");
    const pastContainer = document.getElementById("past-events-grid");

    const upcoming = clanEventsData.filter(e => e.status === "Upcoming");
    const past = clanEventsData.filter(e => e.status === "Past");

    const createCard = (e) => `
        <div class="event-card">
            <div>
                <span class="event-status-pill ${e.status.toLowerCase()}">${e.status} • ${e.type}</span>
                <div class="event-title">${e.title}</div>
                <div class="event-meta"><i class="fa-solid fa-calendar"></i> ${e.date} @ ${e.time}</div>
                <div class="event-desc">${e.desc}</div>
            </div>
            <div class="event-participants"><i class="fa-solid fa-users"></i> ${e.participants}</div>
        </div>
    `;

    upcomingContainer.innerHTML = upcoming.map(createCard).join("");
    pastContainer.innerHTML = past.map(createCard).join("");
}

// RENDER NEWS
function renderNews() {
    const container = document.getElementById("full-news-grid");
    container.innerHTML = clanNewsData.map(n => `
        <div class="news-card" onclick="openNewsModal('${n.id}')">
            <div style="font-size:0.75rem; color: var(--purple-accent); font-weight:800; margin-bottom:6px;">${n.date} • BY ${n.author.toUpperCase()}</div>
            <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:8px;">${n.title}</h3>
            <p style="font-size:0.85rem; color:var(--text-muted);">${n.snippet}</p>
        </div>
    `).join("");
}

// HOMEPAGE PREVIEWS
function renderHomePreviews() {
    // Next upcoming event
    const upcoming = clanEventsData.find(e => e.status === "Upcoming");
    const eventPreview = document.getElementById("home-event-preview");
    if (upcoming && eventPreview) {
        eventPreview.innerHTML = `
            <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:6px;">${upcoming.title}</h3>
            <div style="font-size:0.85rem; color:var(--cyan-accent); font-weight:700; margin-bottom:8px;"><i class="fa-solid fa-clock"></i> ${upcoming.date} @ ${upcoming.time}</div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">${upcoming.desc}</p>
            <button onclick="showTab('events')" class="btn-secondary" style="padding:6px 16px; font-size:0.8rem;">View Event Calendar</button>
        `;
    }

    // Latest news post
    const latestNews = clanNewsData[0];
    const newsPreview = document.getElementById("home-news-preview");
    if (latestNews && newsPreview) {
        newsPreview.innerHTML = `
            <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:6px;">${latestNews.title}</h3>
            <div style="font-size:0.8rem; color:var(--purple-accent); font-weight:700; margin-bottom:8px;">${latestNews.date} • By ${latestNews.author}</div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">${latestNews.snippet}</p>
            <button onclick="openNewsModal('${latestNews.id}')" class="btn-secondary" style="padding:6px 16px; font-size:0.8rem;">Read Full Announcement</button>
        `;
    }

    // Mini hierarchy flow
    const hierarchyPreview = document.getElementById("home-hierarchy-preview");
    if (hierarchyPreview) {
        hierarchyPreview.innerHTML = rankHierarchyData.map((r, i) => `
            <span class="mini-rank-pill">${r.name}</span>
            ${i < rankHierarchyData.length - 1 ? '<i class="fa-solid fa-chevron-right mini-arrow"></i>' : ''}
        `).join("");
    }
}

// NEWS MODAL
function openNewsModal(newsId) {
    const post = clanNewsData.find(n => n.id === newsId);
    if (!post) return;

    document.getElementById("news-modal-category").innerText = post.category;
    document.getElementById("news-modal-date").innerText = post.date;
    document.getElementById("news-modal-title").innerText = post.title;
    document.getElementById("news-modal-author").innerText = `Posted by ${post.author}`;
    document.getElementById("news-modal-content").innerText = post.content;

    document.getElementById("news-modal").classList.add("open");
}

function closeNewsModal() {
    document.getElementById("news-modal").classList.remove("open");
}

// TRYOUT FORM SUBMISSION
function handleTryoutSubmit(e) {
    e.preventDefault();

    const application = {
        id: Date.now(),
        roblox: document.getElementById("try-roblox").value,
        discord: document.getElementById("try-discord").value,
        stats: document.getElementById("try-stats").value,
        clans: document.getElementById("try-clans").value || "None",
        availability: document.getElementById("try-availability").value,
        exp: document.getElementById("try-exp").value || "None",
        why: document.getElementById("try-why").value,
        info: document.getElementById("try-info").value || "N/A",
        status: "Pending" // Initial status: Pending
    };

    let apps = JSON.parse(localStorage.getItem("au_tryout_apps") || "[]");
    apps.push(application);
    localStorage.setItem("au_tryout_apps", JSON.stringify(apps));

    document.getElementById("tryout-form").reset();
    const alert = document.getElementById("tryout-success");
    alert.classList.remove("hidden");
    setTimeout(() => alert.classList.add("hidden"), 5000);

    if (!document.getElementById("staff-dashboard").classList.contains("hidden")) {
        renderStaffApps();
    }
}

// STAFF AUTHORIZATION & PANEL
function toggleStaffAuthModal() {
    const isAuth = sessionStorage.getItem("au_staff_authenticated");
    if (isAuth === "true") {
        document.getElementById("staff-dashboard").classList.remove("hidden");
        renderStaffApps();
    } else {
        document.getElementById("staff-modal").classList.add("open");
    }
}

function closeStaffModal() {
    document.getElementById("staff-modal").classList.remove("open");
}

function authenticateStaff(e) {
    e.preventDefault();
    const pass = document.getElementById("staff-passcode").value;
    if (pass === "au2026") { // Default staff passcode
        sessionStorage.setItem("au_staff_authenticated", "true");
        closeStaffModal();
        document.getElementById("staff-dashboard").classList.remove("hidden");
        renderStaffApps();
    } else {
        alert("Incorrect Staff Passphrase");
    }
}

function logoutStaff() {
    sessionStorage.removeItem("au_staff_authenticated");
    document.getElementById("staff-dashboard").classList.add("hidden");
}

function renderStaffApps() {
    const container = document.getElementById("staff-applications-list");
    let apps = JSON.parse(localStorage.getItem("au_tryout_apps") || "[]");

    if (apps.length === 0) {
        container.innerHTML = `<p style="color:var(--text-dim); text-align:center;">No tryout applications received yet.</p>`;
        return;
    }

    container.innerHTML = apps.map(a => `
        <div style="background:#16161a; border:1px solid var(--border-color); padding:16px; border-radius:8px; margin-bottom:12px;">
            <div style="display:flex; justify-space-between; align-items:center; margin-bottom:8px;">
                <span style="font-weight:800; color:var(--text-main);">${a.roblox} (@${a.discord})</span>
                <span class="badge-pill ${a.status === 'Accepted' ? 'cyan' : ''}">${a.status}</span>
            </div>
            <div style="font-size:0.82rem; color:var(--text-muted); line-height:1.4;">
                <strong>Stats:</strong> ${a.stats} | <strong>Clans:</strong> ${a.clans}<br>
                <strong>Availability:</strong> ${a.availability}<br>
                <strong>Why Accept:</strong> ${a.why}
            </div>
            <div style="margin-top:10px; display:flex; gap:8px;">
                <button onclick="setAppStatus(${a.id}, 'Reviewing')" style="background:#eab308; color:#000; border:none; padding:4px 10px; border-radius:4px; font-weight:700; font-size:0.75rem; cursor:pointer;">Set Reviewing</button>
                <button onclick="setAppStatus(${a.id}, 'Accepted')" style="background:#22c55e; color:#000; border:none; padding:4px 10px; border-radius:4px; font-weight:700; font-size:0.75rem; cursor:pointer;">Accept (TRIAL MEMBER)</button>
                <button onclick="setAppStatus(${a.id}, 'Denied')" style="background:#ef4444; color:#fff; border:none; padding:4px 10px; border-radius:4px; font-weight:700; font-size:0.75rem; cursor:pointer;">Deny</button>
            </div>
        </div>
    `).join("");
}

function setAppStatus(appId, status) {
    let apps = JSON.parse(localStorage.getItem("au_tryout_apps") || "[]");
    apps = apps.map(a => a.id === appId ? { ...a, status } : a);
    localStorage.setItem("au_tryout_apps", JSON.stringify(apps));
    renderStaffApps();
}
