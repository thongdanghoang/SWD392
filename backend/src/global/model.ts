export function defaultPagination(offset = 0, limit = 20): SearchPageDto {
  return {offset, limit};
}

export function defaultSort(
  colId: string = 'id',
  sort: SortDirection = SortDirection.ASC
): SortDto {
  return {colId, sort};
}

export function defaultSearchCriteria<C>(
  criteria: C,
  page: SearchPageDto = defaultPagination(),
  sort: SortDto = defaultSort()
): SearchCriteriaDto<C> {
  return {criteria, page, sort};
}

export interface SearchPageDto {
  offset: number;
  limit: number;
}

export interface SortDto {
  colId: string;
  sort: SortDirection;
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export interface SearchCriteriaDto<C> {
  page: SearchPageDto;
  criteria: C;
  sort: SortDto;
}

export interface SearchResultDto<R> {
  results: R[];
  total: number;
}

export interface KeyValue {
  [key: string]: any;
}

export interface DateRange<D = Date | string> {
  from: D;
  to: D;
}

export interface DropdownItem<V> {
  display: string;
  value: V;
}

export interface BusinessErrorParam {
  key: string;
  value: string;
}

export interface BusinessErrorResponse {
  correlationId: string;
  field: string;
  i18nKey: string;
  args: BusinessErrorParam[];
}
