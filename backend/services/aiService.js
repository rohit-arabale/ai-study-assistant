const axios = require("axios");

const DEFAULT_OPENROUTER_MODEL =
  process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

function getOpenRouterConfig() {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
  const baseURL = (process.env.OPENROUTER_BASE_URL || "").replace(/\/+$/, "");

  return {
    apiKey,
    baseURL,
    model: process.env.OPENROUTER_MODEL || DEFAULT_OPENROUTER_MODEL,
  };
}

function extractTextFromOpenRouterResponse(data) {
  const text = data?.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error("OpenRouter returned an empty response");
  }

  return text;
}

async function askAI(systemPrompt, userContent) {
  const { apiKey, baseURL, model } = getOpenRouterConfig();

  if (!apiKey || !baseURL) {
    throw new Error(
      "OpenRouter is not configured. Set OPENROUTER_API_KEY and OPENROUTER_BASE_URL in backend/.env"
    );
  }

  try {
    const response = await axios.post(
      `${baseURL}/chat/completions`,
      {
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "AI Study Assistant",
        },
      }
    );

    return extractTextFromOpenRouterResponse(response.data);
  } catch (error) {
    console.error("OPENROUTER ERROR:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      throw new Error(
        "OpenRouter authentication failed. Create a new OpenRouter API key and set it as OPENROUTER_API_KEY in backend/.env"
      );
    }

    throw new Error(
      error.response?.data?.error?.message || "OpenRouter request failed"
    );
  }
}

module.exports = {
  askAI,
};
