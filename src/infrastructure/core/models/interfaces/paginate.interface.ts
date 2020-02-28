export abstract class IPaginatedResponseClass<T> {
  items: T[];
  total: number;
  hasMore: boolean;
}
