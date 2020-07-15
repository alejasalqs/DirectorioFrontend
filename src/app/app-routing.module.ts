import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WebviewComponent } from "./components/webview/webview.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ListadoDoctoresComponent } from "./components/listado-doctores/listado-doctores.component";
import { PerfilDoctorComponent } from "./components/perfil-doctor/perfil-doctor.component";
import { LoginComponent } from "./components/shared/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { DASHBOARD_ROUTES } from "./components/dashboard/dashboard.routes";
import { DoctoresDetalleResolver } from "./Resolvers/doctor-detalle.resolver";
import { DoctorListaResolver } from "./Resolvers/doctor-lista.resolver";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  {
    path: "index",
    component: WebviewComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: DASHBOARD_ROUTES,
  },
  {
    path: "doctores/:termino",
    component: ListadoDoctoresComponent,
    resolve: { doctores: DoctorListaResolver },
  },
  {
    path: "doctor/:id",
    component: PerfilDoctorComponent,
    resolve: { doctor: DoctoresDetalleResolver },
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "registro",
    component: RegisterComponent,
  },
  {
    path: "**",
    redirectTo: "index",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
