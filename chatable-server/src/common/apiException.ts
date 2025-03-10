import { IntrinsicException } from '@nestjs/common';

export class ApiException extends IntrinsicException {
  constructor(
    public code: number,
    public message: string
  ) {
    super();
  }
}
