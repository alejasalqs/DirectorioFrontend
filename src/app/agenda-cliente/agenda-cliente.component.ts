import { Component, OnInit } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { Doctor } from 'src/models/Doctor';
import dayGridPlugin from "@fullcalendar/daygrid";
import { FullCalendarComponent } from "@fullcalendar/angular";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; // for dateClick
import { AgendaService } from '../services/agenda.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrAlertService } from '../services/toastr-alert.service';
import { AuthService } from '../services/auth.service';
import { DoctoresService } from '../services/doctores.service';
import { esLocale, frLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-agenda-cliente',
  templateUrl: './agenda-cliente.component.html',
  styleUrls: ['./agenda-cliente.component.css']
})
export class AgendaClienteComponent implements OnInit {

  constructor(private authService: AuthService,
              private modalService: NgbModal,
              private agendaService: AgendaService,
              private route: ActivatedRoute,
              private toastr: ToastrAlertService,
              private doctoresService: DoctoresService
              ) { }

  modelEvento = {};
  options: any;
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];
  doctor: Doctor;
  selecteIDAgenda = 0;

  ngOnInit() {
    this.options = {
      editable: true,
      customButtons: {
        miniCalendario: {
          text: 'Ir a fecha',
          click: function () {
            alert('Aquí se muestra el calendario');
          }
        }
      },
      theme: 'standart', // default view, may be bootstrap
      header: {
        left: 'prev,next today miniCalendario',
        center: 'title',
        right: ''
      },
      buttonText: {
        today:    'Hoy',
        month:    'Mes',
        week:     'Semana',
        day:      'Día',
        list:     'Lista'
      },
      timeZone: 'America/Costa_Rica',
      locales: [ esLocale, frLocale ],
      locale: 'es',
      // add other plugins
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin]
    };
    
    this.route.params.subscribe( params => {
      this.cargarEventos(params['id']);
      this.doctoresService.obtenerDoctoresID(params['id']).subscribe( (response: any) => {
        this.doctor = response.doctor;
        console.log(this.doctor);
      })
    })
  }

  cargarEventos(id) {
    this.agendaService.obtenerMetodosAgenda(id).subscribe(
      (data: any) => {
        this.darFormatoFechaDDMMYYYY(data.eventos);
        for (let evento of data.eventos) {
          evento.start = evento.start = new Date(evento.start);
          evento.end = evento.end = new Date(evento.end);
          evento.timezone = "UTC";
          this.calendarEvents.push(evento);
        }
      }
    );
  }

  eventClick(arg,template) {
    this. selecteIDAgenda = arg.id;
    const modalRef = this.modalService.open(template);
  }

  agendar(evento, modal){
    evento.IdDoctor = this.doctor.IdDoctor;
    this.agendaService.actualizarEvento(evento,this.selecteIDAgenda).subscribe( (data: any) => {
      this.selecteIDAgenda = 0;
      modal.dismiss();
      this.toastr.success('Esté atento a su correo electrónico o número telefónico para saber más detalles','Se ha agendado su cita correctamente')
    },
    error => this.toastr.error(error,'Error al momento de realizar la operación'))
  }

  darFormatoFechaDDMMYYYY(obj) {
    try {
        for(var key of Object.keys(obj)){
            if(key.toLowerCase().includes('fecha')){
                obj[key] = new Date(obj[key]).toLocaleString();
                console.log(obj[key]);
                obj[key] = new Date(obj[key]);
            }
        }  
        return obj;
    } catch (err) {
        console.log(err);
    }
  }
}
