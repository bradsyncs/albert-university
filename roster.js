const rosterInfo = {
  "albert-university": {
    name: "ALBERT UNIVERSITY",
    description: "OFFICIAL AU CLAN ROSTER"
  },
  "synchronized": {
    name: "SYNCHRONIZED",
    description: "SYNCHRONIZED CLAN ROSTER"
  },
  "nerotopia": {
    name: "NEROTOPIA",
    description: "NEROTOPIA CLAN ROSTER"
  }
};

const slug = window.location.pathname.split("/").filter(Boolean).pop();
const info = rosterInfo[slug];
if (info) {
  document.title = `${info.name} | Roster`;
  document.getElementById("clan-name").textContent = info.name;
  document.getElementById("clan-description").textContent = info.description;
}