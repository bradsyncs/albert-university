const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "public");

app.use(express.static(publicDirectory));

app.get("/", (_req, res) => {
  res.sendFile(path.join(publicDirectory, "index.html"));
});

app.get("/roster/:clan", (req, res) => {
  const allowed = ["albert-university", "synchronized", "nerotopia"];
  if (!allowed.includes(req.params.clan)) {
    return res.status(404).sendFile(path.join(publicDirectory, "404.html"));
  }
  res.sendFile(path.join(publicDirectory, "roster.html"));
});

app.get("*", (_req, res) => {
  res.status(404).sendFile(path.join(publicDirectory, "404.html"));
});

app.listen(PORT, () => {
  console.log(`AU roster site running on port ${PORT}`);
});