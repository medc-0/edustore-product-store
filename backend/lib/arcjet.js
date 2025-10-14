import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import "dotenv/config";

// Initialize Arcjet

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    // Shield protects the app from common attacks e.g. SQL Injections, XSS, CSRF attacks
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      // Block all bots besides search engine bots
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        // see the full list of categories here: https://docs.arcjet.com/docs/bot-detection#bot-categories
      ],
    }),
    // rate limiting

    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
      // each unique IP address is allowed 100 requests per 15 minutes
    }),
  ],
});
