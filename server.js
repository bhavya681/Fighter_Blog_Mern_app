// import express from "express";
// import cors from "cors";
// import connectToDB from "./database/db.js";
// import "dotenv/config.js";
// import auth from "./routes/auth.js";
// import notes from "./routes/notes.js";
// import chats from "./routes/chats.js";

// connectToDB();

// const app = express();
// const port = process.env.PORT || 3001;

// app.use(express.json());
// app.use(cors());

// app.use("/api/v1/auth", auth);
// app.use("/api/v1/notes", notes);
// app.use("/api/v1/chats", chats);

// app.listen(port, () => {
//   console.log(`Server is working on http://localhost:${port}`);
// });

import express from "express";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";
import cors from "cors";
import auth from "./routes/auth.js";
import notes from "./routes/notes.js";
import chats from "./routes/chats.js";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectToDB();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/v1/auth", auth);
app.use("/api/v1/notes", notes);
app.use("/api/v1/chats", chats);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});
