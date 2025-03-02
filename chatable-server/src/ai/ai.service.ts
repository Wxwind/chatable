import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

@Injectable()
export class AIService {
  async chat(userId: string, sessionId: string, message: string) {
    const messages: any[] = [];
    const chatCompletion = await client.chat.completions.create({
      messages,
      model: 'gpt-4o',
    });

    return chatCompletion.choices[0].message.content;
  }
}
