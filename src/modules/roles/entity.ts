class RoleEntity {
  id?: string
  name?: string
  permissions: string[] = []

  constructor(role: Partial<RoleEntity>) {
    if (!role) {
      return
    }
    Object.assign(this, role)
  }

  static createListRole(listRole: Array<Partial<RoleEntity>>) {
    if (!Array.isArray(listRole)) {
      return []
    }
    return listRole.map((role: Partial<RoleEntity>) => {
      return new RoleEntity(role)
    })
  }
}

export default RoleEntity
