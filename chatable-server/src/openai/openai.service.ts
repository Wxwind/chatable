import { ErrorCode } from '@/common/api/errorCode';
import { ApiException } from '@/common/apiException';
import { EnvironmentVariables } from '@/config/type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { Observable } from 'rxjs';
import { HttpsProxyAgent } from 'https-proxy-agent';

@Injectable()
export class OpenAIService {
  private client: OpenAI;

  constructor(private configService: ConfigService<EnvironmentVariables, true>) {
    const proxy = configService.get('OPENAI_PROXY_URL', { infer: true });
    const httpAgent = proxy ? new HttpsProxyAgent(proxy) : undefined;
    this.client = new OpenAI({
      apiKey: configService.get('OPEN_API_KEY', { infer: true }),
      baseURL: configService.get('OPENAI_BASE_URL', { infer: true }),
      httpAgent: httpAgent,
    });
  }

  async chat(model: string, messages: ChatCompletionMessageParam[]): Promise<string> {
    const chatCompletion = await this.client.chat.completions.create({
      messages,
      model,
    });

    const response = chatCompletion.choices[0].message.content;
    if (response === null) {
      throw new ApiException(ErrorCode.OPENAI_NULL_RESPONSE);
    }
    return response;
  }

  async chatStream(model: string, messages: ChatCompletionMessageParam[]): Promise<Observable<unknown>> {
    const stream = await this.client.chat.completions.create({
      model: model,
      messages,
      stream: true,
    });

    return new Observable((subscriber) => {
      void (async () => {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          subscriber.next({ data: content });
        }
        subscriber.complete();
      })();
    });
  }

  async generateTitle(message: string): Promise<string> {
    const prompt = `用不超过20个字概括这句话的主旨,要求使用和这句话相同的语言："${message}"`;

    const chatCompletion = await this.client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_completion_tokens: 20,
    });

    const response = chatCompletion.choices[0].message.content;
    if (response === null) {
      throw new ApiException(ErrorCode.OPENAI_NULL_RESPONSE);
    }

    return response;
  }
}
