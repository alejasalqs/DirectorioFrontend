import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AgendaService {
  constructor(private http: HttpClient) {}
  baseURL = "http://localhost:5000/";
}
