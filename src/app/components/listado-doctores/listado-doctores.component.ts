import { Component, OnInit } from "@angular/core";
import { Doctor } from "../../../models/Doctor";
import { DoctoresService } from "../../services/doctores.service";
import { ToastrAlertService } from "../../services/toastr-alert.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-listado-doctores",
  templateUrl: "./listado-doctores.component.html",
  styleUrls: ["./listado-doctores.component.css"],
})
export class ListadoDoctoresComponent implements OnInit {
  doctores: Doctor[] = [];
  filtros: any = {};
  nombresSelect: any[] = [];

  constructor(
    private doctoresService: DoctoresService,
    private toastr: ToastrAlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarSelect();
    this.cargarUsuarios();
    /*this.route.data.subscribe((data: any) => {
      this.doctores = data["doctores"].result;
      this.pagination = data["doctores"].pagination;
      console.log(this.doctores);
      console.log(this.pagination);
    });*/
  }

  cargarUsuarios() {
    this.doctoresService.obtenerDoctores(this.filtros).subscribe(
      (res: any) => {
        this.doctores = res.doctores;
        console.log(this.doctores)
      },
      (error) => {
        console.log(error)
        this.toastr.error("Error", "Error");
      }
    );
  }

  cargarSelect() {
    this.doctoresService.obtenerNombreDoctores().subscribe((resp:any) => {
      this.nombresSelect = resp.doctores;
    }, error => console.error(error))
  }
}
