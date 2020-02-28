import { ArgsType, Field, Int } from 'type-graphql';
import { IsInt, IsNotEmpty, IsString, Length, Min, MinLength, Max, IsAlphanumeric } from 'class-validator';

@ArgsType()
export class FilterClientsArgsInput {
  @Field()
  // @IsNotEmpty()
  // @MinLength(1)
  // @IsAlphanumeric()
  query: string = '';
  @Field(() => Int)
  skip: number = 0;
  @Field(() => Int)
  limit?: number = 10;
}
