import { applyDecorators, Delete } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { EndpointOptions } from '@common/decorators/decorator.interfaces';

export function ApiDelete(path: string, options: EndpointOptions = {}) {
  return applyDecorators(
    Delete(path),
    ApiOkResponse({
      description: 'Successful request',
      type: options?.responseType,
    }),
    ApiNotFoundResponse({ description: 'Not Found' }),
    ApiForbiddenResponse({ description: 'Forbidden' }),
  );
}
