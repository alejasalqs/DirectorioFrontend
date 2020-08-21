import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { ToastrAlertService } from 'src/app/services/toastr-alert.service';
import { Router } from '@angular/router';
import { DoctoresService } from 'src/app/services/doctores.service';

declare function init_plugins();

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AuthService,private toastr: ToastrAlertService, private router: Router, private doctoresService: DoctoresService) {}

  foto;
  ngOnInit() {
    init_plugins();
    this.foto = this.doctoresService.obtenerFoto(this.auth.obtenerDoctorLogeado().Foto || "");
  }

  logout() {
    this.auth.actualizarIngreso().subscribe(response => {
      localStorage.removeItem("token");
      localStorage.removeItem("doctor");
      this.toastr.info("Se ha finalizado la sesión", "Mensaje del sistema");
      this.router.navigate(["/index"]);
    });
  }
}
