const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

app.post("/api/tryout", async (req, res) => {
  try {
    const {
      robloxUsername,
      discordUsername,
      experience,
      stats,
      availability,
      reason,
      additional
    } = req.body;

    if (!robloxUsername || !discordUsername || !reason) {
      return res.status(400).json({
        success: false,
        message: "Please fill out all required fields."
      });
    }

    const webhookURL = process.env.DISCORD_TRYOUT_WEBHOOK_URL;

    if (!webhookURL) {
      console.log("Tryout received:", req.body);

      return res.json({
        success: true,
        message:
          "Your application was received. Discord integration is not configured yet."
      });
    }

    const embed = {
      title: "🏀 New AU Tryout Application",
      color: 0xff7518,
      fields: [
        {
          name: "Roblox Username",
          value: robloxUsername,
          inline: true
        },
        {
          name: "Discord Username",
          value: discordUsername,
          inline: true
        },
        {
          name: "Basketball Experience",
          value: experience || "Not provided"
        },
        {
          name: "Stats",
          value: stats || "Not provided"
        },
        {
          name: "Availability",
          value: availability || "Not provided"
        },
        {
          name: "Why do you want to join AU?",
          value: reason
        },
        {
          name: "Additional Information",
          value: additional || "None"
        }
      ],
      footer: {
        text: "Albert University • Tryout System"
      },
      timestamp: new Date().toISOString()
    };

    const response = await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "AU Tryout System",
        embeds: [embed]
      })
    });

    if (!response.ok) {
      throw new Error(`Discord returned ${response.status}`);
    }

    res.json({
      success: true,
      message: "Your tryout application has been submitted."
    });
  } catch (error) {
    console.error("Tryout error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while submitting your application."
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Albert University website running on port ${PORT}`);
});