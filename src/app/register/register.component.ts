import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Doctor } from "../../models/Doctor";
import { DoctoresService } from "../services/doctores.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;
  constructor(public doctorService: DoctoresService, public router: Router) {}

  ngOnInit() {
    this.forma = new FormGroup({
      // Config del form
      // new FormControl(Estado inicial, Validaciones),
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, Validators.required),
      contrasena2: new FormControl(null, Validators.required),
      fechaNacimiento: new FormControl(null, [Validators.required]),
      celular: new FormControl(null, Validators.required),
      locacion: new FormControl(null, Validators.required),
    });
  }

  registro() {
    if (this.forma.invalid) {
      return;
    }

    console.log(this.forma.value);

    let doctor = new Doctor(
      null,
      this.forma.value.nombre,
      this.forma.value.apellido,
      "",
      this.forma.value.correo,
      this.forma.value.contrasena,
      this.forma.value.fechaNacimiento,
      this.forma.value.celular,
      this.forma.value.locacion
    );

    this.doctorService.agregarDoctor(doctor).subscribe((data) => {
      console.log(data);
      this.router.navigate(["/login"]);
    });
  }
}
