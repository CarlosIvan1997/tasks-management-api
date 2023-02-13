import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateBodyExistsPipe implements PipeTransform {
  transform(body: any): any {
    if (!Object.keys(body).length) {
      throw new BadRequestException('Body should not be empty');
    }

    return body;
  }
}
