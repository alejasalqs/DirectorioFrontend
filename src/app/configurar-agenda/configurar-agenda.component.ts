import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../services/agenda.service';
import { AuthService } from '../services/auth.service';
import { ToastrAlertService } from '../services/toastr-alert.service';

@Component({
  selector: 'app-configurar-agenda',
  templateUrl: './configurar-agenda.component.html',
  styleUrls: ['./configurar-agenda.component.css']
})
export class ConfigurarAgendaComponent implements OnInit {

  constructor(private agendaService: AgendaService, private auth: AuthService, private alert: ToastrAlertService) { }
  config: any = {
    
  };

  dias: any = [
    {Dia: 'Lunes', Trabajo: false, IdDoctor: this.auth.obtenerDoctorLogeado().IdDoctor},
    {Dia: 'Martes', Trabajo: false, IdDoctor: this.auth.obtenerDoctorLogeado().IdDoctor},
    {Dia: 'Miércoles', Trabajo: false, IdDoctor: this.auth.obtenerDoctorLogeado().IdDoctor},
    {Dia: 'Jueves', Trabajo: false, IdDoctor: this.auth.obtenerDoctorLogeado().IdDoctor},
    {Dia: 'Viernes', Trabajo: false, IdDoctor: this.auth.obtenerDoctorLogeado().IdDoctor},
    {Dia: 'Sábado', Trabajo: false, IdDoctor: this.auth.obtenerDoctorLogeado().IdDoctor},
    {Dia: 'Domingo', Trabajo: false, IdDoctor: this.auth.obtenerDoctorLogeado().IdDoctor},
  ];

  ngOnInit() {
  }

  checkCheckBoxvalue(dia){
    dia.Trabajo = !dia.Trabajo;
  }

  async configurar() {
    this.config.FechaInicial = await this.darFormatoFechaHora(this.config.FechaInicial,this.config.Hora)
    this.config.FechaFinal = await this.darFormatoFechaHora(this.config.FechaFinal)
    this.config.IdDoctor = this.auth.obtenerDoctorLogeado().IdDoctor;
    this.agendaService.llenarDatos(this.config).subscribe(data => {
      this.alert.success('Se ha guardado la configuración')
    },err => this.alert.error(err,'Hubo un problema al realizar la operación'));
  }

  configurarDias(){
    console.log(this.dias);  
    this.agendaService.configurarDiasLaborales(this.dias).subscribe(resp => {
      this.alert.success('Operación realizada con éxito');
    }, err => this.alert.error('Hubo un error al realizar la operación'))
  }

  async darFormatoFechaHora(fecha?: any,hora?: any) {
    if (hora) {
      return `${fecha.year}/${fecha.month}/${fecha.day} ${hora}`
    } else {
      return `${fecha.year}/${fecha.month}/${fecha.day}`
    }
  }
}
