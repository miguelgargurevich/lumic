export interface AdminUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin";
}

export const adminUsers: AdminUser[] = [
  {
    id: 1,
    name: "Super Admin",
    email: "admin@lumic.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "María González",
    email: "maria@lumic.com",
    password: "maria2025",
    role: "admin",
  },
  {
    id: 3,
    name: "Juan Pérez",
    email: "juan@lumic.com",
    password: "juansecure",
    role: "admin",
  },
];
