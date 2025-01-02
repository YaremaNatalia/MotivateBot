import express from "express";
import dotenv from "dotenv";
import webhook from "./webhook.js"; 

dotenv.config();

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json()); 

app.post("/api/webhook", webhook);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});