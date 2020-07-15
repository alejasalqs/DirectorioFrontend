export interface Estudio {
  id: number;
  grado: string;
  centro_estudios: string;
  fecha_inicial: Date;
  fecha_final: Date;
  descripcion: string;
  estado: boolean;
  doctorID: number;
}
