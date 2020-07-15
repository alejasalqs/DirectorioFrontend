import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { ToastrAlertService } from 'src/app/services/toastr-alert.service';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AuthService,private toastr: ToastrAlertService, private router: Router) {}

  ngOnInit() {
    init_plugins();
  }

  logout() {
    localStorage.removeItem("token");
    this.toastr.info("Se ha finalizado la sesión", "Mensaje del sistema");
    this.router.navigate(["/index"]);
  }
}
