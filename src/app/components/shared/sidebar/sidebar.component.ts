import { Component, OnInit } from "@angular/core";
import { ToastrAlertService } from "../../../services/toastr-alert.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  constructor(private toastr: ToastrAlertService, private router: Router) {}

  ngOnInit() {}

  logout() {
    localStorage.removeItem("token");
    this.toastr.info("Se ha finalizado la sesión", "Mensaje del sistema");
    this.router.navigate(["/index"]);
  }
}
