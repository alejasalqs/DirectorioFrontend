import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { FullCalendarModule } from "@fullcalendar/angular"; // for FullCalendar!
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { SidebarComponent } from "./components/shared/sidebar/sidebar.component";
import { ListadoDoctoresComponent } from "./components/listado-doctores/listado-doctores.component";
import { PerfilDoctorComponent } from "./components/perfil-doctor/perfil-doctor.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { WebviewComponent } from "./components/webview/webview.component";
import { AgendaComponent } from "./components/agenda/agenda.component";
import { LoginComponent } from "./components/shared/login/login.component";
import { DashboardfooterComponent } from "./components/shared/dashboardfooter/dashboardfooter.component";
import { JwtModule } from "@auth0/angular-jwt";
import { MiPerfilComponent } from "./components/dash/mi-perfil/mi-perfil.component";
import { HomeComponent } from "./components/dash/home/home.component";
import { ErrorInterceptorProvider } from "./services/error.interceptor";
import { DoctoresDetalleResolver } from "./Resolvers/doctor-detalle.resolver";
import { DoctorListaResolver } from "./Resolvers/doctor-lista.resolver";
import { CalendarioComponent } from "./components/calendario/calendario.component";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SeguridadComponent } from './components/seguridad/seguridad.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { ConfigurarAgendaComponent } from './configurar-agenda/configurar-agenda.component';
import { AgendaClienteComponent } from './agenda-cliente/agenda-cliente.component';
import { ImagenPipe } from './Pipes/imagen.pipe';


export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    ListadoDoctoresComponent,
    PerfilDoctorComponent,
    DashboardComponent,
    WebviewComponent,
    AgendaComponent,
    LoginComponent,
    DashboardfooterComponent,
    MiPerfilComponent,
    HomeComponent,
    CalendarioComponent,
    RegisterComponent,
    SeguridadComponent,
    RecuperarContrasenaComponent,
    ConfigurarAgendaComponent,
    AgendaClienteComponent,
    ImagenPipe,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:3000"],
        blacklistedRoutes: ["localhost:3000/auth"],
      },
    }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }), // ToastrModule added
    FullCalendarModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(), // for FullCalendar!
  ],
  providers: [
    ErrorInterceptorProvider,
    DoctoresDetalleResolver,
    DoctorListaResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
