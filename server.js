
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const publicFolder = path.join(__dirname, "public");

app.use(express.static(publicFolder));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicFolder, "index.html"));
});

app.get("/roster/:clan", (req, res) => {
  const allowedClans = [
    "albert-university",
    "synchronized",
    "nerotopia"
  ];

  if (!allowedClans.includes(req.params.clan)) {
    return res.status(404).sendFile(
      path.join(publicFolder, "404.html")
    );
  }

  res.sendFile(path.join(publicFolder, "roster.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(
    path.join(publicFolder, "404.html")
  );
});

app.listen(PORT, () => {
  console.log(`Website running on port ${PORT}`);
});
