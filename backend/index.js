const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

app.post("/chat", async (req, res) => {

  try {

    const message = req.body.message;

    console.log("USER:", message);

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",

      messages: [
        {
          role: "system",
          content: "You are a friendly AI assistant.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    console.log(completion);

    res.json({
      reply: completion.choices[0].message.content,
    });

  } catch (err) {

    console.log("ERROR:", err);

    res.json({
      reply: err.toString(),
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});