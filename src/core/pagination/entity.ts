import lodash from 'lodash'

export class PaginationEntity {
  pageSize?: number

  current?: number = 1

  total?: number = undefined

  search?: string

  sortQuery?: string

  hasNext?: boolean

  hasPrevious?: boolean

  private static initPaginationEntity = null

  constructor(pagination?: Partial<PaginationEntity>) {
    if (!pagination) {
      return
    }
    this.pageSize = lodash.get(pagination, 'pageSize', 999999)
    this.current = lodash.get(pagination, 'current', 1)
    this.total = lodash.get(pagination, 'totalCount', undefined)
    this.search = lodash.get(pagination, 'search', undefined)
    this.hasNext = lodash.get(pagination, 'nextPage', undefined)
    this.hasPrevious = lodash.get(pagination, 'PreviousPage', undefined)
  }

  static init() {
    if (PaginationEntity.initPaginationEntity != null) {
      return PaginationEntity.initPaginationEntity
    }
    PaginationEntity.initPaginationEntity = null
    return PaginationEntity.initPaginationEntity
  }
}
