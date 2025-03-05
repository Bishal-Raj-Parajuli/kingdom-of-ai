import { Gemini } from "./lib/gemini";
import { WebSocketServer } from "./lib/websocket";

async function main() {
  console.log("Hello, World!");

  const socket = WebSocketServer.getInstance();

  const gemini = new Gemini();

  setInterval(async () => {
    const response = await gemini.generateResponse(
      "You are a funny person who likes to tell jokes. Give me a joke and make sure it will make me laugh also try to have a unique joke enverytime."
    );
    socket.broadcastMessage(response);
  }, 5000);
}

main();
