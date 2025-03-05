import ws from "ws";

export const initializeWebSocket = () => {
  console.log("* Initializing WebSocket server");
  const wss = new ws.Server({ port: 8080 });

  wss.on("connection", (ws) => {
    console.log("New client connected");

    let score = 1;
    setInterval(() => {
      ws.send(
        JSON.stringify({
          title: "Welcome to Kingdom of AI",
          score: score++,
        })
      );
    }, 1000);

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log("* WebSocket Server is running on port 8080");
};

export default initializeWebSocket;
