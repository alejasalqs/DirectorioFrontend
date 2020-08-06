import { Component, OnInit, Input } from "@angular/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput } from "@fullcalendar/core";
import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // for dateClick
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrAlertService } from 'src/app/services/toastr-alert.service';

@Component({
  selector: "app-calendario",
  templateUrl: "./calendario.component.html",
  styles: [],
})
export class CalendarioComponent implements OnInit {
  @Input() defaultView;
  @Input() plugins;
  @Input() weekends;
  @Input() events;
  @Input() header;
  @Input() calendarEvents;
  @Input() deepChangeDetection = true;
  constructor() {
    console.log(this.defaultView);
  }

  ngOnInit() {
    console.log('Estoy aqui ')
  }
}
