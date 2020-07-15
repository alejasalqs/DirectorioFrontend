import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Doctor } from "src/models/Doctor";
import { DoctoresService } from "../services/doctores.service";
import { ToastrAlertService } from "../services/toastr-alert.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class DoctoresDetalleResolver implements Resolve<Doctor> {
  constructor(
    private doctoresService: DoctoresService,
    private router: Router,
    private toastr: ToastrAlertService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Doctor> {
    return this.doctoresService.obtenerDoctoresID(route.params["id"]).pipe(
      catchError((error) => {
        this.toastr.error(error, "Problemas obteniendo la información");
        this.router.navigate(["/doctores"]);
        return of(null);
      })
    );
  }
}
