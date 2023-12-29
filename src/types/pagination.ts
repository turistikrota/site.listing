export type PaginationRequest<T> = {
  page?: number
  limit?: number
  filter: T
}
