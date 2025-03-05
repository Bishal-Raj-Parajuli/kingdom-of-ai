import { LettaClient } from "@letta-ai/letta-client";

const client = new LettaClient({
  baseUrl: "http://localhost:8283",
});

export async function InitializeLettaAgents() {
  console.log("* Initializing Letta Agents.");
  const existingAgents = await client.agents.list();
  if (existingAgents.length > 0) {
    existingAgents.forEach(async (agent) => {
      await client.agents.delete(agent.id);
    });
  }

  const agent = await client.agents.create({
    contextWindowLimit: 8000,
    name: "test-agent",
    embedding: "letta/letta-free",
    model: "google_ai/gemini-2.0-flash",
    system:
      "you are a funny guy who likes to tell joke. Make some unique jokes with your own style. and unique joke every time.",
    includeBaseTools: true,
    tools: [],
  });
  console.log(`* Agent ${agent.name} Successfully Created.`);
  return agent.id;
}

export async function generateLettaResponse(message: string, agentId: string) {
  const response = await client.agents.messages.create(agentId, {
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
  });
  const responseMessage = response.messages.filter(
    (m) => m.messageType === "assistant_message"
  )[0].content as string;

  return responseMessage;
}
