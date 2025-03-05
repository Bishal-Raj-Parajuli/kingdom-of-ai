import WebSocket from "ws";

export class WebSocketServer {
  private static instance: WebSocketServer;
  private readonly socketServer: WebSocket.Server;
  private clients: Set<WebSocket> = new Set();

  private constructor() {
    this.socketServer = new WebSocket.Server({ port: 8080 });
    this.initializeWebSocket();
  }

  public static getInstance(): WebSocketServer {
    if (!WebSocketServer.instance) {
      WebSocketServer.instance = new WebSocketServer();
    }
    return WebSocketServer.instance;
  }

  private initializeWebSocket() {
    console.log("* Initializing WebSocket server on port 8080");

    this.socketServer.on("connection", (client) => {
      console.log("* New client connected");
      this.clients.add(client);

      client.on("close", () => {
        console.log("* Client disconnected");
        this.clients.delete(client);
      });

      client.on("error", (error) => {
        console.error("* WebSocket error:", error);
      });
    });

    this.socketServer.on("error", (error) => {
      console.error("* WebSocket server error:", error);
    });
  }

  public broadcastMessage(message: string) {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  public close() {
    console.log("* Closing WebSocket server");
    this.clients.forEach((client) => client.close());
    this.clients.clear();
    this.socketServer.close();
  }
}
