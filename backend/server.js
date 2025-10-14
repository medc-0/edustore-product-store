import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // parse json body
app.use(cors()); // cors
app.use(helmet()); // security
app.use(morgan("dev")); // logging

// apply use Arcjet middleware
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // specifies that this request counts as 1 request against the rate limit
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimited()) {
        return res
          .status(429)
          .json({ error: "Too many requests - try again later" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ error: "Access denied for bots" });
      } else {
        return res.status(403).json({ error: "Forbidden" });
      }
      return;
    }
    // check for spoofed bots
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: "Spoofed bots bots detected" });
      return;
    }

    next();
  } catch (error) {
    console.error("Error in Arcjet middleware:", error);
    next(error);
  }
});

app.use("/api/products", productRoutes);

async function initDB() {
  try {
    await sql`
            CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
    console.log("Database initialized");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

initDB().then(() => {
  app.listen(PORT, async () => {
    console.log("Server is running on port " + PORT);
  });
});
