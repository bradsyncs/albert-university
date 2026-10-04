require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory application tracker to prevent duplicate submissions (Rate limiting/Debouncing)
const recentSubmissions = new Map();

// Tryout Submission API Route
app.post('/api/tryouts/submit', async (req, res) => {
  try {
    const {
      robloxUsername,
      discordUsername,
      currentStats,
      previousClans,
      previousExperience,
      availability,
      whyAccept,
      additionalInfo
    } = req.body;

    // Basic Validation
    if (!robloxUsername || !discordUsername || !currentStats || !availability || !whyAccept) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    // Rate limiting check (Prevent duplicate submissions within 5 minutes per Discord/Roblox user)
    const userKey = `${robloxUsername.toLowerCase().trim()}_${discordUsername.toLowerCase().trim()}`;
    const now = Date.now();
    if (recentSubmissions.has(userKey)) {
      const lastSubmitTime = recentSubmissions.get(userKey);
      if (now - lastSubmitTime < 5 * 60 * 1000) {
        return res.status(429).json({
          success: false,
          message: 'An application has already been submitted recently. Please wait before submitting again.'
        });
      }
    }

    // Generate unique Application ID and Timestamp
    const applicationId = `AU-TRYOUT-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestampStr = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST';

    // Discord Embed Construction
    const discordEmbed = {
      title: '🏆 New Albert University Tryout Application',
      color: 0xFF6B00, // AU Orange Accent
      fields: [
        { name: '🆔 Application ID', value: applicationId, inline: true },
        { name: '📌 Starting Status', value: '`TRIAL MEMBER` (Pending Review)', inline: true },
        { name: '👤 Roblox Username', value: robloxUsername, inline: true },
        { name: '💬 Discord Username', value: discordUsername, inline: true },
        { name: '📊 Current Stats', value: currentStats },
        { name: '🛡️ Previous Clans', value: previousClans || 'None' },
        { name: '🏅 Previous Comp Experience', value: previousExperience || 'None' },
        { name: '⏰ Availability', value: availability },
        { name: '❓ Why Should We Accept You?', value: whyAccept },
        { name: '📝 Additional Information', value: additionalInfo || 'N/A' },
        { name: '🕒 Submitted At', value: timestampStr, inline: false }
      ],
      footer: {
        text: 'Albert University Athletic Association • Staff System'
      },
      timestamp: new Date().toISOString()
    };

    // Send to Discord Webhook via Server-Side Variable
    const webhookUrl = process.env.DISCORD_TRYOUT_WEBHOOK_URL;
    if (webhookUrl) {
      const discordResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [discordEmbed]
        })
      });

      if (!discordResponse.ok) {
        console.error('Failed to post to Discord Webhook:', await discordResponse.text());
      }
    } else {
      console.warn('DISCORD_TRYOUT_WEBHOOK_URL is not configured in environment variables.');
    }

    // Store submission timestamp to prevent duplicate submissions
    recentSubmissions.set(userKey, now);

    return res.status(200).json({
      success: true,
      message: 'Application successfully submitted!',
      applicationId: applicationId,
      startingRank: 'TRIAL MEMBER'
    });
  } catch (error) {
    console.error('Error handling tryout application:', error);
    return res.status(500).json({ success: false, message: 'Server error processing application.' });
  }
});

// Fallback to SPA or index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Albert University Website running on port ${PORT}`);
});
