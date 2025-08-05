document.getElementById('chat-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  appendMessage("You", message);
  input.value = "";

  appendMessage("VoidAI", "Thinking...");

  const response = await getAIResponse(message);
  const chatBox = document.getElementById('chat-box');
  chatBox.lastChild.textContent = "VoidAI: " + response;
});

function appendMessage(sender, message) {
  const chatBox = document.getElementById('chat-box');
  const msg = document.createElement('div');
  msg.textContent = `${sender}: ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getAIResponse(message) {
  const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your key
  const endpoint = "https://api.openai.com/v1/chat/completions";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "Hmm... I didn't understand that.";
  } catch (err) {
    return "Error connecting to AI.";
  }
}
