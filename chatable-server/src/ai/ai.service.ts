import { EnvironmentVariables } from '@/config/type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class AIService {
  client: OpenAI;

  constructor(private configService: ConfigService<EnvironmentVariables, true>) {
    this.client = new OpenAI({
      apiKey: configService.get('OPEN_API_KEY', { infer: true }),
      baseURL: configService.get('OPENAI_BASE_URL', { infer: true }),
    });
  }

  async chat(userId: number, sessionId: string, message: string) {
    const messages: ChatCompletionMessageParam[] = [];
    const chatCompletion = await this.client.chat.completions.create({
      messages,
      model: 'gpt-4o',
    });

    return chatCompletion.choices[0].message.content;
  }
}
