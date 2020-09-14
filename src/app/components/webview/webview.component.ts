import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: "app-webview",
  templateUrl: "./webview.component.html",
  styleUrls: ["./webview.component.css"],
})
export class WebviewComponent implements OnInit {
  constructor(private router: Router, private reportesSevice: ReportesService) {}

  doctores: any[] = [];

  ngOnInit() {
    this.cargarDoctores();
  }

  cargarDoctores() {
    this.reportesSevice.obtenerTopDoctores().subscribe( (resp:any) => {
      this.doctores = resp.doctores;
      console.log(this.doctores)
    },
    (error) => {
      console.log(error)
    });
  }
}
