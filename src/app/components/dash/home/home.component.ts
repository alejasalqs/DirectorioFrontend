import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(public auth: AuthService, public reportesSevice: ReportesService) {}

  reportes = {};

  ngOnInit() {
    this.obtenerInfo();
  }

  obtenerInfo() {
    this.reportesSevice.obtenerReportesIniciales(this.auth.obtenerDoctorLogeado().IdDoctor).subscribe( (resp: any) => {
      this.reportes = resp.reportes;
    })
  }
}
