import { Gemini } from "./lib/gemini";
import { generateLettaResponse, InitializeLettaAgents } from "./lib/letta";
import { WebSocketServer } from "./lib/websocket";

async function main() {
  console.log("-- Kingdom of AI Started --");

  const agentId = await InitializeLettaAgents();

  const socket = WebSocketServer.getInstance();

  setInterval(async () => {
    const responseMessage = await generateLettaResponse(
      "Tell me a joke",
      agentId
    );
    socket.broadcastMessage(responseMessage);
  }, 5000);
}

main();
