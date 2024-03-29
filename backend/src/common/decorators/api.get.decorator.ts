import { applyDecorators, Get } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { EndpointOptions } from '@common/decorators/decorator.interfaces';

export function ApiGet(path: string, options: EndpointOptions = {}) {
  return applyDecorators(
    Get(path),
    ApiOkResponse({
      description: 'Successful request',
      type: options?.responseType,
    }),
    ApiNotFoundResponse({ description: 'Not Found' }),
    ApiForbiddenResponse({ description: 'Forbidden' }),
  );
}
