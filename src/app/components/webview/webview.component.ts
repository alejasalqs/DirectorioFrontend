import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-webview",
  templateUrl: "./webview.component.html",
  styleUrls: ["./webview.component.css"],
})
export class WebviewComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  buscar(termino: string) {
    console.log(termino);
    this.router.navigate(["/doctores", termino]);
  }
}
