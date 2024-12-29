import express from "express";
import dotenv from "dotenv";
import bot from "./bot.js";

dotenv.config();

const { PORT } = process.env;
const app = express();
const port = PORT || 3000;

app.use(express.json());
app.post("/webhook", (req, res) => {
  try {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error processing webhook", error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
