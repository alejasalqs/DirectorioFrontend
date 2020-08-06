import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {

  constructor(public auth: AuthService) { }

  correo: string = '';

  ngOnInit() {
  }

  recuperar() {
    this.auth.recuperarContrasena(this.correo).subscribe(data => console.log(data));
  }

}
