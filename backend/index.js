const express = require("express");
const cors = require("cors");
const OpenAI = require("openai").default; // ✅ important

const app = express();
app.use(cors());
app.use(express.json());

// ✅ OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ✅ AI Chat route
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful mental health assistant." },
        { role: "user", content: message }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (error) {
    console.log("ERROR:", error); // 👈 logs dekhenge
    res.json({
      reply: "AI error 😔"
    });
  }
});

// ✅ Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});