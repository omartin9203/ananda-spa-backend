import {Field, InputType} from 'type-graphql';

@InputType()
export class SearcheableFilterInput {
  @Field({nullable: true})
  search?: string;
  static getSearchQuery(filter: SearcheableFilterInput) {
    if (!filter.search) { return null; }
    return {
      $text: {
        $search: filter.search,
      },
    };
  }
}
