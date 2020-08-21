import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Doctor } from "src/models/Doctor";
import { DoctoresService } from "../services/doctores.service";
import { ToastrAlertService } from "../services/toastr-alert.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class DoctorListaResolver implements Resolve<Doctor[]> {
  constructor(
    private doctoresService: DoctoresService,
    private router: Router,
    private toastr: ToastrAlertService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Doctor[]> {
    return this.doctoresService
      .obtenerDoctores()
      .pipe(
        catchError((error) => {
          console.log(error)
          this.toastr.error(error, "Problemas obteniendo la información");
          this.router.navigate(["/index"]);
          return of(null);
        })
      );
  }
}
