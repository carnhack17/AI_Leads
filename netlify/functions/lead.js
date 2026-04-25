// Netlify Function: /api/lead
// Analyzes incoming messages and scores them as leads
// Uses direct fetch to Claude API (no SDK needed)

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { message } = JSON.parse(event.body);

    if (!message || message.trim().length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Message is required" }),
      };
    }

    // Call Claude API directly via fetch
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-opus-4-1-20250805",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: `You are a sales AI assistant. Analyze this message and determine if it's a high-quality lead.

Message: "${message}"

Return ONLY valid JSON (no markdown, no extra text):
{
  "intent": "lead" | "question" | "spam" | "support",
  "score": <number 0-100>,
  "sentiment": "positive" | "neutral" | "negative",
  "reply": "<your generated response to this person>",
  "decision": "hot" | "warm" | "cold"
}

RULES:
- intent: Classify the message type
- score: 0-100 where 100 = perfect customer, 0 = spam/waste of time
- sentiment: Overall tone of the message
- reply: A tailored response. If hot lead, suggest a call. If warm, nurture them. If cold, be polite and brief.
- decision: hot (buy soon) | warm (interested but not ready) | cold (low interest)

Return ONLY the JSON object, nothing else.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Claude API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();

    // Extract the text content from Claude's response
    const textContent = data.content.find((block) => block.type === "text");
    if (!textContent) {
      throw new Error("No text content in response");
    }

    // Parse the JSON response
    let result;
    try {
      result = JSON.parse(textContent.text);
    } catch (parseError) {
      console.error("Failed to parse Claude response:", textContent.text);
      throw new Error("Invalid JSON response from Claude");
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to analyze message",
        details: error.message,
      }),
    };
  }
};
