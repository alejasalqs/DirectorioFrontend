import { RedesSociale } from "./RedesSociales";
import { Especialidad } from "./Especialidad";
import { Estudio } from "./Estudio";
import { Experiencia } from "./Experiencia";
import { Idioma } from "./Idioma";

export class Doctor {
  constructor(
    public IdDoctor?: number,
    public Nombre?: string,
    public PrimerApellido?: string,
    public SegundoApellido?: string,
    public Correo?: string,
    public Contrasena?: string,
    public FechaNacimiento?: Date,
    public Celular?: string,
    public Locacion?: string,
    public WebURL?: string,
    public Estado?: boolean,
    public Foto?: string,
    public Titulo?: string,
    //precio?: number,
    public Genero?: number,

    public RedesSociales?: RedesSociale[],
    public TelefonoOficina?: string,
    public Especialidades?: Especialidad[],
    public Estudios?: Estudio[],
    public Experiencia?: Experiencia[],
    public Idiomas?: Idioma[],
    public FechaCreacion?: Date,
    public FechaUltimaActividad?: Date,
    public SobreMi?: string
  ) {}
}
