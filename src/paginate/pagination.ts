import { PaginationResultInterface } from './pagination.results.interface';

export class Pagination<PaginationEntity> {
  public results: PaginationEntity[];
  public returned_total: number;
  public total_pages: number;
  public total: number;
  public take: number;
  public skip: number;
  public current: number;

  constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
    this.results = paginationResults.results;
    this.returned_total = paginationResults.results.length;
    this.total_pages = Math.ceil(paginationResults.total/paginationResults.take);
    this.total = paginationResults.total;
    this.skip = paginationResults.skip;
    this.current = Math.floor((paginationResults.skip/paginationResults.take)+1);
  }
}
