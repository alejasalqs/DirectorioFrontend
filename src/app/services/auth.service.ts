import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.apiURL;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  login(model: any) {
    console.log(model);
    return this.http.post(this.baseUrl + "login", model).pipe(
      // descompone el cuerpo y guarda el token en el localstorage
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("doctor", JSON.stringify(user.doctor));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
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
}
