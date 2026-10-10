const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));

const clans = {
  "albert-university": {
    name: "Albert University",
    webhook: () => process.env.AU_DISCORD_WEBHOOK_URL
  },
  synchronized: {
    name: "Synchronized",
    webhook: () => process.env.SYNCHRONIZED_DISCORD_WEBHOOK_URL
  },
  nerotopia: {
    name: "Nerotopia",
    webhook: () => process.env.NEROTOPIA_DISCORD_WEBHOOK_URL
  }
};

// Basic in-memory rate limit for application submissions.
const submissionTimes = new Map();
const RATE_LIMIT_MS = 30 * 1000;

app.get("/roster/:clan", (req, res) => {
  if (!clans[req.params.clan]) {
    return res.status(404).sendFile(
      path.join(__dirname, "public", "404.html")
    );
  }

  res.sendFile(path.join(__dirname, "public", "roster.html"));
});

app.post("/api/applications/:clan", async (req, res) => {
  const clan = clans[req.params.clan];

  if (!clan) {
    return res.status(404).json({
      error: "That clan was not found."
    });
  }

  const username = String(req.body.username || "").trim();
  const discord = String(req.body.discord || "").trim();
  const previousClans = String(req.body.previousClans || "").trim();

  if (
    username.length < 3 ||
    username.length > 20 ||
    !/^[A-Za-z0-9_]+$/.test(username)
  ) {
    return res.status(400).json({
      error: "Enter a valid Roblox username."
    });
  }

  if (discord.length < 2 || discord.length > 80) {
    return res.status(400).json({
      error: "Enter a valid Discord username."
    });
  }

  if (previousClans.length > 1000) {
    return res.status(400).json({
      error: "Your previous-clan answer is too long."
    });
  }

  const clientKey = req.ip || "unknown";
  const now = Date.now();
  const lastSubmission = submissionTimes.get(clientKey) || 0;

  if (now - lastSubmission < RATE_LIMIT_MS) {
    return res.status(429).json({
      error: "Please wait a little before submitting another application."
    });
  }

  const webhookUrl = clan.webhook();

  if (!webhookUrl) {
    console.error(`Missing Discord webhook for ${clan.name}`);

    return res.status(503).json({
      error: "Applications are temporarily unavailable. Please try again later."
    });
  }

  let parsedWebhook;

  try {
    parsedWebhook = new URL(webhookUrl);
  } catch {
    return res.status(503).json({
      error: "The application system is not configured correctly."
    });
  }

  if (
    parsedWebhook.protocol !== "https:" ||
    !["discord.com", "discordapp.com"].includes(parsedWebhook.hostname) ||
    !parsedWebhook.pathname.startsWith("/api/webhooks/")
  ) {
    console.error(`Invalid webhook configuration for ${clan.name}`);

    return res.status(503).json({
      error: "The application system is not configured correctly."
    });
  }

  const safePreviousClans =
    previousClans || "Not provided";

  const payload = {
    allowed_mentions: {
      parse: []
    },
    embeds: [
      {
        title: `New ${clan.name} Application`,
        color:
          req.params.clan === "albert-university"
            ? 16742400
            : req.params.clan === "synchronized"
              ? 3447003
              : 10181046,
        fields: [
          {
            name: "Roblox Username",
            value: username,
            inline: true
          },
          {
            name: "Discord Username",
            value: discord,
            inline: true
          },
          {
            name: "Previous Clans",
            value: safePreviousClans,
            inline: false
          }
        ],
        footer: {
          text: "Clan Application System"
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error(
        `Discord rejected an application for ${clan.name}: ${response.status}`
      );

      return res.status(502).json({
        error: "Your application could not be delivered. Please try again later."
      });
    }

    submissionTimes.set(clientKey, now);

    return res.json({
      message: "Application submitted successfully."
    });
  } catch (error) {
    console.error("Application delivery failed:", error.message);

    return res.status(502).json({
      error: "Could not reach Discord. Please try again later."
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Clan roster website running on port ${PORT}`);
});