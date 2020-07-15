import { Component, OnInit } from "@angular/core";
import { DoctoresService } from "../../services/doctores.service";
import { Doctor } from "../../../models/Doctor";
import { ActivatedRoute } from "@angular/router";
import { ToastrAlertService } from "../../services/toastr-alert.service";
import { Idioma } from "../../../models/Idioma";

@Component({
  selector: "app-perfil-doctor",
  templateUrl: "./perfil-doctor.component.html",
  styleUrls: ["./perfil-doctor.component.css"],
})
export class PerfilDoctorComponent implements OnInit {
  doctor: Doctor;

  constructor(
    private doctoresService: DoctoresService,
    private router: ActivatedRoute,
    private toastr: ToastrAlertService
  ) {}

  ngOnInit() {
    this.router.data.subscribe((data) => {
      this.doctor = data.doctor.doctor[0];
      this.doctor.Experiencia = JSON.parse(data.doctor.doctor[0].Experiencia);
      this.doctor.Estudios = JSON.parse(data.doctor.doctor[0].Estudios);
      this.doctor.Especialidades = JSON.parse(
        data.doctor.doctor[0].Especialidades
      );
      this.doctor.Idiomas = JSON.parse(data.doctor.doctor[0].Idioma);
      this.doctor.RedesSociales = JSON.parse(
        data.doctor.doctor[0].RedesSociales
      );
      console.log(this.doctor);
    });
  }
}
