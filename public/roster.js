
const clans = {
  "albert-university": {
    name: "ALBERT UNIVERSITY",
    description: "OFFICIAL AU CLAN ROSTER",
    color: "#ff7900"
  },

  "synchronized": {
    name: "SYNCHRONIZED",
    description: "SYNCHRONIZED CLAN ROSTER",
    color: "#168bff"
  },

  "nerotopia": {
    name: "NEROTOPIA",
    description: "NEROTOPIA CLAN ROSTER",
    color: "#a94aff"
  }
};

const clanSlug = window.location.pathname
  .split("/")
  .filter(Boolean)
  .pop();

const clan = clans[clanSlug];

if (clan) {
  document.title = `${clan.name} | Roster`;

  document.getElementById("clan-name").textContent =
    clan.name;

  document.getElementById("clan-description").textContent =
    clan.description;

  document.documentElement.style.setProperty(
    "--accent",
    clan.color
  );

  const colorLine = document.querySelector(
    ".color-lines span"
  );

  if (colorLine) {
    colorLine.style.backgroundColor = clan.color;
    colorLine.style.boxShadow = `0 0 12px ${clan.color}`;
  }
}
