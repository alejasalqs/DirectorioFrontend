import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  base_URL = environment.apiURL;
  constructor() { }

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

      return 'nombre de la imagen';
    } catch (error) {
      console.log(error)
      return false;
    }
  }
}
