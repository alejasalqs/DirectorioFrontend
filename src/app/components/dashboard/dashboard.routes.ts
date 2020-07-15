import { Routes } from "@angular/router";
import { MiPerfilComponent } from "../dash/mi-perfil/mi-perfil.component";
import { HomeComponent } from "../dash/home/home.component";
import { AgendaComponent } from "../agenda/agenda.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: "",
    pathMatch: "prefix",
    redirectTo: "home",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "miperfil",
    component: MiPerfilComponent,
  },
  {
    path: "agenda",
    component: AgendaComponent,
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full",
  },
];
