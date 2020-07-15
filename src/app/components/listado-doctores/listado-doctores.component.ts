import { Component, OnInit } from "@angular/core";
import { Doctor } from "../../../models/Doctor";
import { DoctoresService } from "../../services/doctores.service";
import { ToastrAlertService } from "../../services/toastr-alert.service";
import { ActivatedRoute } from "@angular/router";
import { Pagination, PaginatedResult } from "../../../models/pagination";

@Component({
  selector: "app-listado-doctores",
  templateUrl: "./listado-doctores.component.html",
  styleUrls: ["./listado-doctores.component.css"],
})
export class ListadoDoctoresComponent implements OnInit {
  doctores: Doctor[] = [];
  pagination: Pagination;
  termino: string;

  constructor(
    private doctoresService: DoctoresService,
    private toastr: ToastrAlertService,
    private route: ActivatedRoute
  ) {}

  numeroPagina = 1;
  tamanoPagina = 5;

  ngOnInit() {
    this.route.params.subscribe((params) => (this.termino = params["termino"]));
    console.log(this.termino);
    this.cargarUsuarios();
    /*this.route.data.subscribe((data: any) => {
      this.doctores = data["doctores"].result;
      this.pagination = data["doctores"].pagination;
      console.log(this.doctores);
      console.log(this.pagination);
    });*/
  }

  pageChanged(event: any) {
    this.pagination.paginaActual = event.page;
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    console.log(this.termino);
    this.doctoresService.obtenerDoctores(this.termino).subscribe(
      (res: any) => {
        this.doctores = res.doctores;
        console.log(this.doctores);
      },
      (error) => {
        this.toastr.error("Error", "Error");
      }
    );
  }
}
