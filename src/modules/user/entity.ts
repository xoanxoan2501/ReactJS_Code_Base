import dayjs from 'dayjs'

class UserEntity {
  _id?: string

  fullname?: string

  gender?: string

  customerId?: string

  email?: string

  displayName?: string

  province?: string

  district?: string

  address?: string

  addresses?: Array<{
    fullname: string
    phoneNumber: string
    address: string
    province: string
    district: string
  }>

  phoneNumber?: string

  avatar?: string

  require_2fa?: boolean

  role?: string

  isActive?: boolean

  updatedAt?: dayjs.Dayjs

  createdAt?: dayjs.Dayjs

  identifierNumber?: string

  accessToken?: string

  refreshToken?: string

  constructor(user?: Partial<UserEntity>) {
    if (!user) {
      return
    }
    Object.assign(this, user)
    this.updatedAt = dayjs(user.updatedAt)
    this.createdAt = dayjs(user.createdAt)
  }

  static createArrayUser(arrUser: Array<Partial<UserEntity>>): Array<UserEntity> {
    if (!arrUser) {
      return []
    }
    return arrUser.map((x) => new UserEntity(x))
  }
}

export default UserEntity
