import { Component, OnInit, TemplateRef } from "@angular/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput } from "@fullcalendar/core";
import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // for dateClick
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from 'src/app/services/agenda.service';
import { Doctor } from 'src/models/Doctor';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrAlertService } from 'src/app/services/toastr-alert.service';

@Component({
  selector: "app-agenda",
  templateUrl: "./agenda.component.html",
  styleUrls: ["./agenda.component.css"],
})
export class AgendaComponent implements OnInit {
  constructor(private modalService: NgbModal,private agendaService: AgendaService, private authService: AuthService, private toastr: ToastrAlertService) {}

  modelEvento = {};
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];
  doctor: Doctor;
  selecteIDAgenda = 0;

  ngOnInit() {
    this.doctor = this.authService.obtenerDoctorLogeado();
    this.cargarEventos();
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

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
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

