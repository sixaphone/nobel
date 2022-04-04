import { applyDecorators, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { EndpointOptions } from '@common/decorators/decorator.interfaces';

export function ApiPost(path: string, options: EndpointOptions = {}) {
  return applyDecorators(
    Post(path),
    ApiOkResponse({
      description: 'Successful request',
      type: options?.responseType,
    }),
    ApiCreatedResponse({
      description: 'Record created',
      type: options?.responseType,
    }),
    ApiForbiddenResponse({ description: 'Forbidden' }),
  );
}
