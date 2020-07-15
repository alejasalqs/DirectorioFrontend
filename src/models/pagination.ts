export interface Pagination {
  paginaActual: number;
  itemsPorPagina: number;
  itemsTotal: number;
  paginasTotal: number;
}

export class PaginatedResult<T> {
  result: T;
  pagination: Pagination;
}
