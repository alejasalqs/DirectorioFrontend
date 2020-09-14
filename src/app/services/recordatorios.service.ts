import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecordatoriosService {

  constructor(private http: HttpClient) { }
  baseURL = environment.apiURL + 'recordatorios/';

  enviarRecordatorio(cita: any) {
    return this.http.post(this.baseURL,cita);
  }
}
