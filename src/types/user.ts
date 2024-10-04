export enum Role {
  MANAGER = "MANAGER",
  ADMIN = "ADMIN",
  LOGISTIAN = "LOGISTIAN"
}

export type User = {
  id: number;
  fullName: string | null;
  email: string;
  phone: string | null;
  avatar: string | null;
  role: Role;
};
