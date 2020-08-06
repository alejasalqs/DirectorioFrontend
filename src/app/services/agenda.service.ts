import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class AgendaService {
  constructor(private http: HttpClient) {}
  baseURL = environment.apiURL + 'agenda/';

  obtenerMetodosAgenda(id) {
    return this.http.get(this.baseURL + id ,{
      headers: {'x-token': localStorage.getItem('token') || 'sdfsdfsdfsf'}
    });
  }

  crearEventoAgenda(evento) {
    return this.http.post(this.baseURL, evento);
  }

  actualizarEvento(evento, id) {
    return this.http.put(this.baseURL + id, evento)
  }
}
