import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Doctor } from "../../../../models/Doctor";
import { DoctoresService } from "../../../services/doctores.service";
import { ToastrAlertService } from "../../../services/toastr-alert.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';


@Component({
  selector: "app-mi-perfil",
  templateUrl: "./mi-perfil.component.html",
  styleUrls: ["./mi-perfil.component.css"],
})
export class MiPerfilComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private doctoresService: DoctoresService,
    private toastr: ToastrAlertService,
    private modalService: NgbModal,
    private fs: FileUploadService
  ) {}

  doctor: Doctor;
  experienciaModel= {};
  estudiosModel = {};
  foto;
  public imagenSubir: File;
  model = {}

  ngOnInit() {
    this.doctor = this.auth.obtenerDoctorLogeado();
    this.foto = this.doctoresService.obtenerFoto(this.doctor.Foto);
  }

  cambiarImg(file:File) {
    this.imagenSubir = file;
  }

  subirImagen() {
    this.fs.actualizarFoto(this.imagenSubir,'doctor',this.doctor.IdDoctor)
    .then(img => console.log(img));
  }

  actualizarDoctor(doctor: Doctor) {
    let {Nombre, PrimerApellido, SegundoApellido, Correo, TelefonoOficina, Celular, FechaNacimiento, WebURL, SobreMi, Locacion, Titulo, Genero} = doctor;
    console.log(FechaNacimiento)
    this.doctoresService.editarDoctor({Nombre, PrimerApellido, SegundoApellido, Correo, TelefonoOficina, Celular, FechaNacimiento, WebURL, SobreMi, Locacion, Titulo, Genero}, this.doctor.IdDoctor)
    .subscribe((data:any) => {
        this.toastr.success('','Se ha actualizado el registro correctamente');
        this.auth.sobreescribirDoctorLogeado(this.doctor);
    },err => this.toastr.error(err));
  }

  eliminarAtributo(atributo,idatributo){
    this.doctoresService.eliminarAtributosDoctor(atributo,idatributo,this.doctor.IdDoctor).subscribe((data:any) => {
        this.toastr.success('','Se ha elimido el registro correctamente');
        this.auth.sobreescribirDoctorLogeado(this.doctor);
    }, err => this.toastr.error(err));
  }

  agregarAtributo(atributo,objeto){
    if(objeto.FechaInicial !== undefined){
      objeto.FechaFinal = this.darFormatoFecha(objeto.FechaFinal);
      objeto.FechaInicial = this.darFormatoFecha(objeto.FechaInicial);
    }
    objeto.IdDoctor = this.doctor.IdDoctor;
    this.doctoresService.agregarAtributosDoctor(atributo ,objeto).subscribe((data:any) => {
        this.toastr.success('','Se ha agregado el registro correctamente');
        this.model = {};
        this.auth.sobreescribirDoctorLogeado(this.doctor);
    }, err => this.toastr.error(err))
  }

  actualizarAtributo(atributo,idatributo,objeto){
    this.doctoresService.actualizarAtributosDoctor(atributo ,idatributo ,this.doctor.IdDoctor ,objeto).subscribe((data:any) => {
        this.toastr.success(data.mensaje.result,'Se ha actualizar el registro correctamente');
        this.auth.sobreescribirDoctorLogeado(this.doctor);
    }, err => this.toastr.error(err));
  }

  abrirModal(template){
    this.modalService.open(template, {ariaLabelledBy: "modal-basic-tittle"}).result.then()
  }

  public darFormatoFecha(fecha) {
    return `${fecha.month}/${fecha.day}/${fecha.year}`
  }
}
