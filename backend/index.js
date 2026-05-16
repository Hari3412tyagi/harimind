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

  const { message } = req.body;

  try {

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful mental health assistant.",
        },
        {
          role: "user",
          content: message,
        },
      ],

      model: "llama3-8b-8192",
    });

    res.json({
      reply: chatCompletion.choices[0]?.message?.content || "No response",
    });

  } catch (error) {

  console.log(error);

  res.json({
    reply: error.message,
  });
}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});