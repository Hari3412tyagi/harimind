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

    const userMessage = req.body.message;

    if (!userMessage) {
      return res.json({
        reply: "Message missing",
      });
    }

    const response = await groq.chat.completions.create({
      model: "llama3-8b-8192",

      messages: [
        {
          role: "system",
          content: "You are a helpful mental health assistant.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const aiReply =
      response.choices[0].message.content;

    res.json({
      reply: aiReply,
    });

  } catch (error) {

    console.log("REAL ERROR:", error);

    res.json({
      reply: error.message || "Backend error",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});