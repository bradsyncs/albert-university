document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const nav = `
    <header class="site-nav">
      <div class="nav-inner">

        <a href="index.html" class="brand">
          <span class="brand-mark">AU</span>
          <span class="brand-text">
            <strong>ALBERT UNIVERSITY</strong>
            <small>ATHLETIC ASSOCIATION</small>
          </span>
        </a>

        <button class="menu-toggle" id="menuToggle" aria-label="Open navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav class="nav-links" id="navLinks">
          <a href="index.html" class="${currentPage === "index.html" ? "active" : ""}">
            Home
          </a>

          <a href="athletics.html" class="${currentPage === "athletics.html" ? "active" : ""}">
            Athletics
          </a>

          <a href="roster.html" class="${currentPage === "roster.html" ? "active" : ""}">
            Roster
          </a>

          <a href="rules.html" class="${currentPage === "rules.html" ? "active" : ""}">
            Rules
          </a>

          <a href="events.html" class="${currentPage === "events.html" ? "active" : ""}">
            Events
          </a>

          <a href="news.html" class="${currentPage === "news.html" ? "active" : ""}">
            News
          </a>

          <a href="tryouts.html" class="nav-tryout ${currentPage === "tryouts.html" ? "active" : ""}">
            Tryouts
          </a>
        </nav>

      </div>
    </header>
  `;

  document.body.insertAdjacentHTML("afterbegin", nav);

  const footer = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div>
          <div class="footer-logo">AU</div>
          <h3>Albert University</h3>
          <p>Built for competition. Built for community.</p>
        </div>

        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="athletics.html">Athletics</a>
          <a href="roster.html">Roster</a>
          <a href="rules.html">Rules</a>
          <a href="tryouts.html">Tryouts</a>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Albert University</span>
        <span>Roblox Community</span>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML("beforeend", footer);

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuToggle.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("open");
    });
  });
});