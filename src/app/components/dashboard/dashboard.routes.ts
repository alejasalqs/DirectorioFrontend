import { Routes } from "@angular/router";
import { MiPerfilComponent } from "../dash/mi-perfil/mi-perfil.component";
import { HomeComponent } from "../dash/home/home.component";
import { AgendaComponent } from "../agenda/agenda.component";
import { SeguridadComponent } from '../seguridad/seguridad.component';
import { ConfigurarAgendaComponent } from 'src/app/configurar-agenda/configurar-agenda.component';

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
    path: "seguridad",
    component: SeguridadComponent,
  },
  {
    path: "agenda",
    component: AgendaComponent,
  },
  {
    path: "configurar-agenda",
    component: ConfigurarAgendaComponent,
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full",
  },
];
