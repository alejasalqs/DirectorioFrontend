import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastrAlertService } from './toastr-alert.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  base_URL = environment.apiURL;
  constructor(private alert: ToastrAlertService) { }

  async actualizarFoto(archivo: File, tipo: 'doctor', id: any) {
    try {
      const url = `${this.base_URL}uploads/${tipo}/${id}`
      const formData = new FormData();

      formData.append('imagen',archivo);
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
         },
         body: formData
      });

      const data = await resp.json();

      console.log(data);
      if(data.ok){
        this.alert.success('Se ha subido la imagen','Operación realizada con éxito');
      } else {
        this.alert.error(data.mensaje, 'Error al subir imagen');
      }

      return 'nombre de la imagen';
    } catch (error) {
      console.log(error)
      return false;
    }
  }
}
