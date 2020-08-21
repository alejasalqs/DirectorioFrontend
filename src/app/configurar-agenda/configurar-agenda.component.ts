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
    {Dia: 'Lunes', Trabaja: false},
    {Dia: 'Martes', Trabaja: false},
    {Dia: 'Miércoles', Trabaja: false},
    {Dia: 'Jueves', Trabaja: false},
    {Dia: 'Viernes', Trabaja: false},
    {Dia: 'Sábado', Trabaja: false},
    {Dia: 'Domingo', Trabaja: false},
  ];

  ngOnInit() {
  }

  checkCheckBoxvalue(dia){
    dia.Trabaja = !dia.Trabaja;
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
  }

  async darFormatoFechaHora(fecha?: any,hora?: any) {
    if (hora) {
      return `${fecha.month}/${fecha.day}/${fecha.year} ${hora}:00.000`
    } else {
      return `${fecha.month}/${fecha.day}/${fecha.year}`
    }
  }
}
