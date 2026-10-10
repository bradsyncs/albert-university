const clanData = {
  "albert-university": {
    name: "Albert University",
    theme: "au",
    description:
      "A competitive community built around development, teamwork, and performance.",
    ranks: [
      "Owner",
      "Management",
      "Coaches",
      "Assistant Coaches",
      "D1 Athlete",
      "D2 Athlete"
    ],
    members: [
      { username: "rexxstuffs", rank: "Management" }
    ]
  },

  synchronized: {
    name: "Synchronized",
    theme: "sync",
    description:
      "A competitive clan focused on coordination, consistency, and growth.",
    ranks: [
      "Owner",
      "Management",
      "Recruiters",
      "Elite",
      "Tier 1",
      "Tier 2",
      "Tier 3",
      "Community"
    ],
    members: [
      { username: "rexxstuffs", rank: "Owner" }
    ]
  },

  nerotopia: {
    name: "Nerotopia",
    theme: "nero",
    description:
      "A competitive clan where members can develop, improve, and compete together.",
    ranks: [
      "Owner",
      "Management",
      "Recruiter",
      "Tier 1",
      "Tier 2",
      "Tier 3"
    ],
    members: [
      { username: "rexxstuffs", rank: "Management" }
    ]
  }
};

const clanSlug = window.location.pathname
  .split("/")
  .filter(Boolean)
  .pop();

const clan = clanData[clanSlug];

const elements = {
  name: document.getElementById("clan-name"),
  kicker: document.getElementById("clan-kicker"),
  description: document.getElementById("clan-description"),
  memberCount: document.getElementById("member-count"),
  rankCount: document.getElementById("rank-count"),
  search: document.getElementById("member-search"),
  filter: document.getElementById("rank-filter"),
  roster: document.getElementById("roster-list"),
  applyName: document.getElementById("apply-clan-name"),
  form: document.getElementById("application-form"),
  message: document.getElementById("form-message"),
  submitButton: document.querySelector(".submit-button"),
  submitLabel: document.getElementById("submit-label")
};

function showNotFound() {
  document.title = "Clan Not Found | Clan Network";
  elements.name.textContent = "Clan not found.";
  elements.description.textContent =
    "This roster does not exist. Return to the homepage to select a clan.";
  elements.roster.innerHTML = "";

  const message = document.createElement("p");
  message.className = "empty-state";
  message.textContent = "No clan is available at this address.";
  elements.roster.appendChild(message);

  elements.form.hidden = true;
  document.getElementById("application").hidden = true;
}

if (!clan) {
  showNotFound();
} else {
  document.body.classList.add(`theme-${clan.theme}`);
  document.title = `${clan.name} Roster | Clan Network`;

  elements.name.textContent = clan.name;
  elements.kicker.textContent = `CLAN DIRECTORY / ${clan.name.toUpperCase()}`;
  elements.description.textContent = clan.description;
  elements.applyName.textContent = clan.name;
  elements.memberCount.textContent = clan.members.length;
  elements.rankCount.textContent = clan.ranks.length;

  for (const rank of clan.ranks) {
    const option = document.createElement("option");
    option.value = rank;
    option.textContent = rank;
    elements.filter.appendChild(option);
  }

  function renderRoster() {
    const searchTerm = elements.search.value.trim().toLowerCase();
    const selectedRank = elements.filter.value;

    const filteredMembers = clan.members.filter((member) => {
      const matchesSearch =
        member.username.toLowerCase().includes(searchTerm) ||
        member.rank.toLowerCase().includes(searchTerm);

      const matchesRank =
        selectedRank === "all" || member.rank === selectedRank;

      return matchesSearch && matchesRank;
    });

    elements.roster.replaceChildren();

    if (filteredMembers.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = searchTerm || selectedRank !== "all"
        ? "No members match your search or selected rank."
        : "No members have been added to this roster yet.";

      elements.roster.appendChild(empty);
      return;
    }

    for (const member of filteredMembers) {
      const card = document.createElement("article");
      card.className = "member-card";

      const avatar = document.createElement("div");
      avatar.className = "member-avatar";
      avatar.textContent = member.username.slice(0, 1).toUpperCase();
      avatar.setAttribute("aria-hidden", "true");

      const identity = document.createElement("div");
      identity.className = "member-identity";

      const username = document.createElement("h3");
      username.textContent = member.username;

      const label = document.createElement("p");
      label.textContent = "ROBLOX MEMBER";

      identity.append(username, label);

      const rank = document.createElement("span");
      rank.className = "rank-badge";
      rank.textContent = member.rank;

      card.append(avatar, identity, rank);
      elements.roster.appendChild(card);
    }
  }

  elements.search.addEventListener("input", renderRoster);
  elements.filter.addEventListener("change", renderRoster);

  renderRoster();

  elements.form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!elements.form.reportValidity()) {
      return;
    }

    const formData = new FormData(elements.form);

    const application = {
      username: formData.get("username"),
      discord: formData.get("discord"),
      previousClans: formData.get("previousClans")
    };

    elements.message.textContent = "";
    elements.message.className = "form-message";
    elements.submitButton.disabled = true;
    elements.submitLabel.textContent = "SENDING APPLICATION...";

    try {
      const response = await fetch(`/api/applications/${clanSlug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(application)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error || "Your application could not be submitted."
        );
      }

      elements.message.textContent =
        "Application submitted successfully. Clan staff can now review it.";
      elements.message.classList.add("success");
      elements.form.reset();
    } catch (error) {
      elements.message.textContent =
        error.message || "Something went wrong. Please try again.";
      elements.message.classList.add("error");
    } finally {
      elements.submitButton.disabled = false;
      elements.submitLabel.textContent = "SUBMIT APPLICATION";
    }
  });
}