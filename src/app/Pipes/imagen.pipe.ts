import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(foto: string): string {
    if(foto) {
      return environment.apiURL + "uploads/doctor/" + foto;
    }else {
      return environment.apiURL + "uploads/doctor/no-img.png";
    }
  }

}
