import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Doctor } from "../../../../models/Doctor";
import { DoctoresService } from "../../../services/doctores.service";
import { ToastrAlertService } from "../../../services/toastr-alert.service";

@Component({
  selector: "app-mi-perfil",
  templateUrl: "./mi-perfil.component.html",
  styleUrls: ["./mi-perfil.component.css"],
})
export class MiPerfilComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private doctoresService: DoctoresService,
    private toastr: ToastrAlertService
  ) {}

  doctor: Doctor;

  ngOnInit() {
    this.obtenerDatosDelUsuario();
  }

  obtenerDatosDelUsuario() {
    this.doctoresService
      .obtenerDoctoresID(this.auth.decodedToken.nameid)
      .subscribe(
        (doctor: Doctor) => {
          this.doctor = doctor;
          console.log(this.doctor);
        },
        (error) => {
          this.toastr.error(error);
        }
      );
  }
}
