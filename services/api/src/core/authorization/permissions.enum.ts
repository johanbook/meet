export class Permissions {
  private static permissions = new Set<string>();

  private static getPermission(...names: string[]) {
    const permission = names.join(":");
    this.permissions.add(permission);
    return permission;
  }

  static Create = (entity: any) => this.getPermission(entity.name, "create");
  static Delete = (entity: any) => this.getPermission(entity.name, "delete");
  static Read = (entity: any) => this.getPermission(entity.name, "read");
  static Update = (entity: any) => this.getPermission(entity.name, "update");
}
