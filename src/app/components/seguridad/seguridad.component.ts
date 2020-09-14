import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrAlertService } from 'src/app/services/toastr-alert.service';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css']
})
export class SeguridadComponent implements OnInit {
  contrasena: string = '';
  nuevaContrasena: string = '';
  repetirNuevaContrasena: string= '';

  constructor(public auth: AuthService, public toastr: ToastrAlertService) { }

  ngOnInit() {
  }

  cambiar() {
    if(this.nuevaContrasena === '' || this.contrasena === '' || this.repetirNuevaContrasena === '') { this.toastr.error('Por favor llenar todos los campos'); return;};

    if (this.nuevaContrasena !== this.repetirNuevaContrasena){ this.toastr.error('Las contraseñas son diferentes'); return;}

    if(this.nuevaContrasena !== this.contrasena){
      this.auth.cambiarContrasena({ 
        Contrasena: this.contrasena,
        NuevaContrasena: this.nuevaContrasena,
        Correo: this.auth.obtenerDoctorLogeado().Correo 
      })
    .subscribe((data: any) => this.toastr.success(data.mensaje,'Operación realizada con éxito')
    ,error => this.toastr.error(error.mensaje,'Error al realizar la operación'))
    } else {
      this.toastr.error('La nueva contraseña debe ser diferente a la contraseña anterior','Error al realizar la operación');
    }
  }
}
