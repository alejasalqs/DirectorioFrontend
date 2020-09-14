import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrAlertService } from '../services/toastr-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {

  constructor(public auth: AuthService, private toastr: ToastrAlertService, private router: Router) { }

  correo: string = '';

  ngOnInit() {
  }

  recuperar() {
    this.auth.recuperarContrasena(this.correo).subscribe((data:any) => {
      this.router.navigate(['/index']);
      this.toastr.success(data.mensaje)
    }, err =>{ 
      //console.log(err);
      this.toastr.error(err)
    });
  }

}
