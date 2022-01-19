import { TypeStatus } from 'src/entitries/entity.interface'

export interface IQueryPages {
  current?: number
  pageSize?: number
  status?: TypeStatus
}

export interface IArtCate {
  current?: number
  pageSize?: number
  category: number
}
