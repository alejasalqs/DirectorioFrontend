import { Component, OnInit } from "@angular/core";
import { ToastrAlertService } from "../../../services/toastr-alert.service";
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  constructor(private toastr: ToastrAlertService, private router: Router,public auth: AuthService) {}

  ngOnInit() {}

  logout() {
    this.auth.actualizarIngreso().subscribe(response => {
      localStorage.removeItem("token");
      localStorage.removeItem("doctor");
      this.toastr.info("Se ha finalizado la sesión", "Mensaje del sistema");
      this.router.navigate(["/index"]);
    });
  }
}
