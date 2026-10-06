const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

const WEBHOOK_URL = process.env.DISCORD_TRYOUT_WEBHOOK_URL;

function clean(value, maxLength = 1000) {
    if (typeof value !== "string") return "";
    return value.trim().slice(0, maxLength);
}

function escapeDiscord(value) {
    return value
        .replace(/\\/g, "\\\\")
        .replace(/\*/g, "\\*")
        .replace(/_/g, "\\_")
        .replace(/~/g, "\\~")
        .replace(/`/g, "\\`");
}

app.post("/api/tryout", async (req, res) => {
    try {
        const {
            robloxUsername,
            discordUsername,
            experience,
            stats,
            availability,
            whyJoin,
            additionalInfo
        } = req.body;

        const data = {
            robloxUsername: clean(robloxUsername, 100),
            discordUsername: clean(discordUsername, 100),
            experience: clean(experience, 1500),
            stats: clean(stats, 1500),
            availability: clean(availability, 1000),
            whyJoin: clean(whyJoin, 1500),
            additionalInfo: clean(additionalInfo, 1500)
        };

        if (
            !data.robloxUsername ||
            !data.discordUsername ||
            !data.experience ||
            !data.stats ||
            !data.availability ||
            !data.whyJoin
        ) {
            return res.status(400).json({
                success: false,
                message: "Please complete all required fields."
            });
        }

        if (!WEBHOOK_URL) {
            console.error("DISCORD_TRYOUT_WEBHOOK_URL is not configured.");

            return res.status(500).json({
                success: false,
                message: "Tryouts are temporarily unavailable."
            });
        }

        const timestamp = new Date().toISOString();

        const discordPayload = {
            username: "Albert University",
            embeds: [
                {
                    title: "🕸️ New AU Tryout Application",
                    description:
                        "A new tryout application has been submitted through the official Albert University website.",
                    color: 0xf47c20,
                    fields: [
                        {
                            name: "Roblox Username",
                            value: escapeDiscord(data.robloxUsername),
                            inline: true
                        },
                        {
                            name: "Discord Username",
                            value: escapeDiscord(data.discordUsername),
                            inline: true
                        },
                        {
                            name: "Experience",
                            value: escapeDiscord(data.experience),
                            inline: false
                        },
                        {
                            name: "Stats",
                            value: escapeDiscord(data.stats),
                            inline: false
                        },
                        {
                            name: "Availability",
                            value: escapeDiscord(data.availability),
                            inline: false
                        },
                        {
                            name: "Why do you want to join AU?",
                            value: escapeDiscord(data.whyJoin),
                            inline: false
                        },
                        {
                            name: "Additional Information",
                            value:
                                escapeDiscord(data.additionalInfo) ||
                                "None provided.",
                            inline: false
                        },
                        {
                            name: "Application Status",
                            value: "🟡 Pending Review",
                            inline: true
                        }
                    ],
                    footer: {
                        text: "Albert University • Tryout System"
                    },
                    timestamp
                }
            ]
        };

        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(discordPayload)
        });

        if (!response.ok) {
            throw new Error(
                `Discord webhook failed with status ${response.status}`
            );
        }

        return res.json({
            success: true,
            message: "Your tryout application has been submitted."
        });
    } catch (error) {
        console.error("Tryout error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while submitting your application."
        });
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Albert University running on port ${PORT}`);
});