import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { EventInput, Calendar } from "@fullcalendar/core";
import { FullCalendarComponent } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; // for dateClick
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from 'src/app/services/agenda.service';
import { Doctor } from 'src/models/Doctor';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrAlertService } from 'src/app/services/toastr-alert.service';
import { esLocale, frLocale } from 'ngx-bootstrap/chronos';
import { EventEmitter } from 'protractor';
//import bootstrapPlugin from '@fullcalendar/bootstrap';

@Component({
  selector: "app-agenda",
  templateUrl: "./agenda.component.html",
  styleUrls: ["./agenda.component.css"],
})
export class AgendaComponent implements OnInit {
  constructor(private modalService: NgbModal,private agendaService: AgendaService, private authService: AuthService, private toastr: ToastrAlertService) {
  }

  @ViewChild('fullcalendar',{ static: false }) fullcalendar: FullCalendarComponent;
  calendarComponent: FullCalendarComponent;
  modelEvento = {};
  options: any;
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];
  doctor: Doctor;
  selecteIDAgenda = 0;
  calendarApi: Calendar;
  public innerWidth: any

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.options = {
      editable: true,
      handleWindowResize: false,
      expandRows: true,
      customButtons: {
        miniCalendario: {
          text: 'Ir a fecha',
          click: () => {
            this.fullcalendar.getApi().gotoDate('2020-01-18');
          }
        }
      },
      themeSystem: 'bootstrap', // default view, may be bootstrap
      header: {
        left: 'prev,next today miniCalendario',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      buttonText: {
        today:    'Hoy',
        month:    'Mes',
        week:     'Semana',
        day:      'Día',
        list:     'Lista'
      },
      locales: [ esLocale, frLocale ],
      locale: 'es',
      timeZone: 'America/Costa_Rica',
      height: '100%',
      contentHeight: 800,
      windowResize: (arg) => {
        console.log('The calendar has adjusted to a window resize. Current view: ' + arg);
      },
      // add other plugins
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin]
    };

    this.doctor = this.authService.obtenerDoctorLogeado();
    this.cargarEventos();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
    console.log(this.fullcalendar.contentHeight);
    this.fullcalendar.getApi().updateSize();
    this.fullcalendar.getApi().render();
  }

  cargarEventos() {
    this.agendaService.obtenerMetodosAgenda(this.doctor.IdDoctor).subscribe(
      (data: any) => {
        this.darFormatoFechaDDMMYYYY(data.eventos);
        for (let evento of data.eventos) {
          evento.start = evento.start = new Date(evento.start);
          evento.end = evento.end = new Date(evento.end);
          evento.timezone = "UTC";
          this.calendarEvents.push(evento);
        }
        console.log(this.calendarEvents);
      }
    );
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  handleDateClick(arg,template) {
    this.modalService.open(template);
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
    error => this.toastr.error('','Error al momento de realizar la operación'))
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

