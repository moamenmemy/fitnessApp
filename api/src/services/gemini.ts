import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
@Injectable({
  providedIn: 'root',
})
export class Gemini {
    private genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY!
  );

  private model = this.genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
  });

  async generateResponse(prompt: string) {
    const result = await this.model.generateContent(prompt);

    return result.response.text();
  }
}
