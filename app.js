document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Hamburger Navigation
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Tryout Form Submission Handler
  const tryoutForm = document.getElementById('tryoutForm');
  const formAlert = document.getElementById('formAlert');
  const submitBtn = document.getElementById('submitBtn');

  if (tryoutForm) {
    tryoutForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.innerText = 'Submitting Application...';
      formAlert.style.display = 'none';

      const payload = {
        robloxUsername: document.getElementById('robloxUsername').value.trim(),
        discordUsername: document.getElementById('discordUsername').value.trim(),
        currentStats: document.getElementById('currentStats').value.trim(),
        previousClans: document.getElementById('previousClans').value.trim(),
        previousExperience: document.getElementById('previousExperience').value.trim(),
        availability: document.getElementById('availability').value.trim(),
        whyAccept: document.getElementById('whyAccept').value.trim(),
        additionalInfo: document.getElementById('additionalInfo').value.trim()
      };

      try {
        const response = await fetch('/api/tryouts/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (data.success) {
          formAlert.style.display = 'block';
          formAlert.style.background = 'rgba(255, 107, 0, 0.15)';
          formAlert.style.border = '1px solid var(--au-orange)';
          formAlert.style.color = 'var(--text-white)';
          formAlert.innerHTML = `
            ✅ <strong>Application Submitted Successfully!</strong><br>
            Application ID: <code>${data.applicationId}</code><br>
            Starting Status: <strong>${data.startingRank}</strong><br>
            Our staff team will review your application on Discord.
          `;
          tryoutForm.reset();
        } else {
          formAlert.style.display = 'block';
          formAlert.style.background = 'rgba(255, 0, 0, 0.15)';
          formAlert.style.border = '1px solid #FF0000';
          formAlert.style.color = '#FF8080';
          formAlert.innerHTML = `⚠️ ${data.message || 'Error submitting application.'}`;
        }
      } catch (err) {
        formAlert.style.display = 'block';
        formAlert.style.background = 'rgba(255, 0, 0, 0.15)';
        formAlert.style.border = '1px solid #FF0000';
        formAlert.style.color = '#FF8080';
        formAlert.innerText = '⚠️ Network error submitting application. Please try again later.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Submit Tryout Application';
      }
    });
  }

  // 3. Roster Data Structure (Easy to edit later)
  const rosterCategories = [
    'OWNER',
    'MANAGEMENT',
    'COACHES',
    'ASSISTANT COACHES',
    'D1 ATHLETE',
    'D2 ATHLETE'
  ];

  // Members array format: { username: "RobloxName", category: "OWNER", avatar: "https://..." }
  const rosterMembers = [
    // Add roster members here as needed
  ];

  const rosterContainer = document.getElementById('rosterContainer');
  if (rosterContainer) {
    rosterContainer.innerHTML = '';

    rosterCategories.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'roster-category';

      const catTitle = document.createElement('h3');
      catTitle.innerText = category;
      categoryDiv.appendChild(catTitle);

      const categoryMembers = rosterMembers.filter(m => m.category === category);

      if (categoryMembers.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.className = 'empty-category';
        emptyMsg.innerText = 'No members yet.';
        categoryDiv.appendChild(emptyMsg);
      } else {
        const grid = document.createElement('div');
        grid.className = 'roster-grid';

        categoryMembers.forEach(member => {
          const card = document.createElement('div');
          card.className = 'roster-card';
          
          const defaultAvatar = `https://www.roblox.com/headshot-thumbnail/image?username=${encodeURIComponent(member.username)}&width=150&height=150&format=png`;

          card.innerHTML = `
            <img src="${member.avatar || defaultAvatar}" alt="${member.username}" onerror="this.src='https://via.placeholder.com/80/141416/FFFFFF?text=AU'">
            <div class="name">${member.username}</div>
          `;
          grid.appendChild(card);
        });

        categoryDiv.appendChild(grid);
      }

      rosterContainer.appendChild(categoryDiv);
    });
  }

  // 4. Events & Schedule Data Structure (Easy to edit)
  const eventsData = [
    {
      title: 'Weekly Clan REP Race',
      date: 'Every Monday - Sunday',
      description: 'Minimum 2,500 REP requirement per athlete.'
    },
    {
      title: 'D1 vs D2 Internal Scrimmage',
      date: 'Saturdays @ 7:00 PM EST',
      description: 'Practice match to evaluate developmental progress and tech execution.'
    }
  ];

  const eventsContainer = document.getElementById('eventsContainer');
  if (eventsContainer) {
    eventsContainer.innerHTML = eventsData.map(event => `
      <div class="card">
        <span class="card-tag">Scheduled Event</span>
        <h3>${event.title}</h3>
        <p style="color: var(--au-orange); font-weight: 700; margin-bottom: 8px;">${event.date}</p>
        <p>${event.description}</p>
      </div>
    `).join('');
  }

  // 5. Clan News Data Structure (Easy to edit)
  const newsData = [
    {
      title: '3x Infinitysports Clan Race Champions',
      date: 'October 2026',
      content: 'Albert University officially secures its third Clan-Race championship victory in Infinitysports. Great work to all participating athletes!'
    },
    {
      title: 'Tryout System Upgrade & D2 Integration',
      date: 'October 2026',
      content: 'Our new Athletic Association pipeline is live. All accepted applicants will start at Trial Member and work through D2 into D1.'
    }
  ];

  const newsContainer = document.getElementById('newsContainer');
  if (newsContainer) {
    newsContainer.innerHTML = newsData.map(news => `
      <div class="card">
        <span class="card-tag">Announcement</span>
        <h3>${news.title}</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 10px;">${news.date}</p>
        <p>${news.content}</p>
      </div>
    `).join('');
  }

});
