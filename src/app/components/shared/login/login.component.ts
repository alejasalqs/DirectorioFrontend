import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { ToastrAlertService } from "../../../services/toastr-alert.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  model = {};
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrAlertService
  ) {}

  ngOnInit() {}

  login() {
    console.log(this.model);
    return this.auth.login(this.model).subscribe(
      () => {
        this.toastr.success("Has iniciado sesión");
        this.router.navigate(["/dashboard"]);
      },
      (error) => {
        console.log(error);
        this.toastr.error(error);
      }
    );
  }
}
