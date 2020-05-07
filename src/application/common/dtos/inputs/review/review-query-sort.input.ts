import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class ReviewQuerySortInput {
  @Field(type => Int, { nullable: true })
  date?: number;
  @Field(type => Int, { nullable: true })
  stars?: number;
  static getStringSort(sort?: ReviewQuerySortInput) {
    return Object.keys(sort || {}).filter(x => Number.isInteger(sort[x])).map(x => sort[x] < 0 ? `-${x}` : x).join(' ') || null;
  }
}
