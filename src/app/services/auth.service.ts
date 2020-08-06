import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../../environments/environment";
import { ToastrAlertService } from './toastr-alert.service';
import { Router } from '@angular/router';
import { Doctor } from 'src/models/Doctor';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  toastr: ToastrAlertService;
  router: Router;
  constructor(private http: HttpClient) {}
  baseUrl = environment.apiURL + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  doctor : Doctor;

  login(model: any) {
    return this.http.post(this.baseUrl + "login", model).pipe(
      // descompone el cuerpo y guarda el token en el localstorage
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("doctor", JSON.stringify(user.doctor));
          this.doctor = user.doctor;
        }
      })
    );
  }

  loggedIn() {
    // busca el token en el localStorage
    const token = localStorage.getItem("token");
    // Verificar el estado del tokem, responde bool
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    this.actualizarIngreso();
    localStorage.removeItem("token");
    localStorage.removeItem("doctor");
    this.toastr.info("Se ha finalizado la sesión", "Mensaje del sistema");
    this.router.navigate(["/index"]);
  }

  obtenerDoctorLogeado(){
    const doctor = JSON.parse(localStorage.getItem('doctor'));
    if (doctor){
      return doctor;
    } else {
      return null;
    }
  }

  sobreescribirDoctorLogeado(doctor){
    if (localStorage.getItem('doctor')){
      localStorage.removeItem('doctor');
      localStorage.setItem('doctor',JSON.stringify(doctor));
      return JSON.parse(localStorage.getItem('doctor'));
    } else {
      localStorage.setItem('doctor',JSON.stringify(doctor));
      return JSON.parse(localStorage.getItem('doctor'));
    }
  }

  cambiarContrasena(contrasenas: any) {
    return this.http.post(this.baseUrl + 'cambiarcontrasena', contrasenas)
  }

  recuperarContrasena(correo: string) {
    return this.http.post(this.baseUrl + 'recuperarcontrasena', {Correo: correo})
  }

  actualizarIngreso() {
    return this.http.post(this.baseUrl + 'ultimoingreso', {Correo: this.obtenerDoctorLogeado().Correo})
  }
}
