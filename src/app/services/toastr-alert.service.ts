import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

/*

Creado por: asalguero
Fecha: 27/04/2020

*/

@Injectable({
  providedIn: "root",
})
export class ToastrAlertService {
  constructor(private toastr: ToastrService) {}

  /**
   * Utilizando Toastr muestra una alerta de éxito al usuario
   * @param mensaje Texto que se desea mostrar en el cuerpo de la alerta.
   * @param titulo Titulo de la alerta. Opcional
   * @returns Elemento UI
   */
  success(mensaje: string, titulo: string = "Operación realizada con éxito") {
    return this.toastr.success(mensaje, titulo);
  }

  /**
   * Utilizando Toastr muestra una alerta de error al usuario
   * @param mensaje Texto que se desea mostrar en el cuerpo de la alerta.
   * @param titulo Titulo de la alerta. Opcional
   * @returns Elemento UI
   */
  error(
    mensaje: string,
    titulo: string = "Problemas en el momento de realizar la acción"
  ) {
    return this.toastr.error(mensaje, titulo);
  }

  /**
   * Utilizando Toastr muestra una alerta de información al usuario
   * @param mensaje Texto que se desea mostrar en el cuerpo de la alerta.
   * @param titulo Titulo de la alerta. Opcional
   * @returns Elemento UI
   */
  info(mensaje: string, titulo: string = "Información del sistema") {
    return this.toastr.info(mensaje, titulo);
  }

  /**
   * Utilizando Toastr muestra una alerta de warning al usuario
   * @param mensaje Texto que se desea mostrar en el cuerpo de la alerta.
   * @param titulo Titulo de la alerta. Opcional
   * @returns Elemento UI
   */
  warning(mensaje: string, titulo: string = "Alerta:") {
    return this.toastr.warning(mensaje, titulo);
  }
}
