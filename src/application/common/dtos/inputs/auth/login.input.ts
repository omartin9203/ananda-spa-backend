import { Field, InputType } from 'type-graphql';
import { PROVIDER } from '../../../../../constants';
import { BadRequestException, NotAcceptableException } from '@nestjs/common';

@InputType()
export class LoginInput {
  @Field()
  email: string;
  @Field({nullable: true})
  password?: string;
  @Field({nullable: true})
  tokenId?: string;
  @Field({nullable: true, defaultValue: PROVIDER.LOCAL})
  provider: PROVIDER = PROVIDER.LOCAL;
  static validation(input: LoginInput) {
    if (input.provider === PROVIDER.LOCAL && !input.password) {
      throw new BadRequestException('The field password is required', '400');
    }
    if (input.provider !== PROVIDER.LOCAL && !input.tokenId) {
      throw new BadRequestException('The field tokenId is required', '400');
    }
    return input;
  }
}
