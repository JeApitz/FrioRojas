export type User = {
  name: string;
  apellido: string;
  email: string;
  password: string;
};

export type registerFrom = Pick<User, "name" | "apellido" | "email"> & {
    password: string;
    password_confirmation: string;
    email_confirmation: string;
};

export type loginForm = Pick<User, "email" | "password">;
