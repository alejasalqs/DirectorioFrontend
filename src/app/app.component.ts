import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import {Title} from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private auth: AuthService, private titleService:Title) {
    this.titleService.setTitle("Directorio Médico | Grupo Argus");
  }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (token) {
      this.auth.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
