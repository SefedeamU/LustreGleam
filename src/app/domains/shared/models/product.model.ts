import { Category } from "./category.model";

export interface Product {
  id_producto: number;
  nombre: string;
  direccion: string;
  precio: number;
  stock: number;
  imagen_url: string;
  fecha_creacion: string;
  proveedor: string;
  categorias: Category[];
}
