export interface PaginationResultInterface<PaginationEntity> {
  results: PaginationEntity[];
  total: number;
  take: number;
  skip: number;
}
