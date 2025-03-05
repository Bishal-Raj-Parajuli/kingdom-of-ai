import "dotenv/config";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

export class Gemini {
  private genAi: GoogleGenerativeAI;
  private model: GenerativeModel;
  constructor() {
    this.genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    this.model = this.genAi.getGenerativeModel({ model: "gemini-2.0-flash" });
  }

  async generateResponse(prompt: string) {
    return (await this.model.generateContent(prompt)).response.text();
  }
}
