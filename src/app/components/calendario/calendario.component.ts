import { Component, OnInit, Input } from "@angular/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput } from "@fullcalendar/core";
import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // for dateClick

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
  constructor() {}

  ngOnInit() {}
}
