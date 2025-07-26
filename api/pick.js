const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();

router.post("/", async (req, res) => {
  const team = req.body.team || "";
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Bạn là chuyên gia Liên Quân Mobile. Dựa vào đội hình hoặc yêu cầu người dùng nhập vào, gợi ý 2 tướng phù hợp nhất.",
        },
        { role: "user", content: team },
      ],
    });

    const suggestion = completion.data.choices[0].message.content;
    res.json({ suggestion });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi gọi OpenAI API" });
  }
});

module.exports = router;
