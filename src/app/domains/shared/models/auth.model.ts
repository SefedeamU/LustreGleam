export interface RegisterDto {
  name: string;
  mail: string;
  telefono: string;
  password: string;
}

export interface LoginDto {
  mail: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  mail: string;
  telefono: string;
  usrdir: string;
  rol: string;
  fecha_creacion: string;
}
